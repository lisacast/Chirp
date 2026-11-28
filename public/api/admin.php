<?php
// Chirp admin dashboard: private, aggregate-only usage metrics.
// First visit: choose an admin password (stored only as a hash in chirp-data/admin.json,
// above public_html). To reset it, delete chirp-data/admin.json in SiteGround File Manager.
declare(strict_types=1);
require __DIR__ . '/metrics-lib.php';

header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');
header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; img-src data:; form-action 'self'; base-uri 'none'");

session_name('chirp_admin');
session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => !empty($_SERVER['HTTPS']) || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https', 'httponly' => true, 'samesite' => 'Strict']);
session_start();

$authFile = chirpDataDir() . '/admin.json';
$auth = is_file($authFile) ? (json_decode((string) file_get_contents($authFile), true) ?: []) : [];
$error = '';
if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(16));
$csrfOk = fn() => hash_equals($_SESSION['csrf'], (string) ($_POST['csrf'] ?? ''));

if (($_GET['logout'] ?? '') === '1') { $_SESSION = []; session_destroy(); header('Location: /admin'); exit; }

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (chirpThrottle('adm', 8)) { $error = 'Too many tries. Wait a minute and try again.'; }
    elseif (!$csrfOk()) { $error = 'Your session expired. Please try again.'; }
    elseif (empty($auth['hash'])) {
        $pw = (string) ($_POST['password'] ?? '');
        if (strlen($pw) < 10) $error = 'Use at least 10 characters.';
        elseif ($pw !== (string) ($_POST['confirm'] ?? '')) $error = 'The two passwords do not match.';
        else {
            $auth = ['hash' => password_hash($pw, PASSWORD_DEFAULT), 'created' => date('c')];
            file_put_contents($authFile, json_encode($auth), LOCK_EX);
            @chmod($authFile, 0600);
            session_regenerate_id(true);
            $_SESSION['admin'] = true;
            header('Location: ' . strtok($_SERVER['REQUEST_URI'] ?? '/admin', '?'), true, 303);
            exit;
        }
    } else {
        if (password_verify((string) ($_POST['password'] ?? ''), $auth['hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin'] = true;
            header('Location: ' . strtok($_SERVER['REQUEST_URI'] ?? '/admin', '?'), true, 303);
            exit;
        }
        else $error = 'That password is not right.';
    }
}

$h = fn($s) => htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');

function page(string $title, string $body): never {
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>' . $title . '</title><style>
:root{--ox:#001c38;--red:#c8321e;--sun:#fed35d;--blue:#1a56c4;--paper:#f3f5f8;--line:#d5dce5;--muted:#3d4a5c}
*{box-sizing:border-box}body{margin:0;font:15px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;background:var(--paper);color:#0b1726}
header{background:var(--ox);color:#fff;padding:14px 20px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
header b{font:800 20px Georgia,serif}header a{color:#fff}header nav{margin-left:auto;display:flex;gap:8px;flex-wrap:wrap}
header nav a{padding:6px 10px;border:1px solid #ffffff55;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px}header nav a.on{background:var(--sun);color:var(--ox);border-color:var(--sun)}
main{max-width:1200px;margin:0 auto;padding:20px}
h1{font:800 30px/1.1 Georgia,serif;color:var(--ox);margin:8px 0 4px}h2{font:800 18px Georgia,serif;color:var(--ox);margin:0 0 10px;padding-top:8px;border-top:4px solid var(--ox)}
.k{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--red)}
.grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(170px,1fr))}.cols{display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));margin-top:20px}
.card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px}
.big{font:800 30px Georgia,serif;color:var(--ox)}.sub{color:var(--muted);font-size:13px}
table{width:100%;border-collapse:collapse;font-size:14px}td{padding:5px 0;border-bottom:1px solid var(--line)}td:last-child{text-align:right;font-weight:700}
.bar{height:8px;background:var(--blue);border-radius:4px}
form.login{max-width:380px;margin:60px auto}input{width:100%;padding:12px;border:2px solid var(--ox);border-radius:10px;font-size:16px;margin:6px 0 12px}
button{background:var(--red);color:#fff;border:0;border-radius:10px;padding:12px 18px;font-weight:800;font-size:16px;width:100%;cursor:pointer}
.err{background:#fde8e4;border:2px solid var(--red);padding:10px;border-radius:10px;margin-bottom:12px}
.note{font-size:13px;color:var(--muted);margin-top:24px}
svg text{font:11px system-ui;fill:var(--muted)}
</style></head><body>' . $body . '</body></html>';
    exit;
}

if (empty($_SESSION['admin'])) {
    $setup = empty($auth['hash']);
    $f = '<form class="login card" method="post"><div class="k">Chirp admin</div><h1>' . ($setup ? 'Create your admin password' : 'Sign in') . '</h1>';
    if ($setup) $f .= '<p class="sub">This is the first visit. Choose a password only you know (10+ characters). It is saved as a secure hash on your server.</p>';
    if ($error) $f .= '<div class="err">' . $h($error) . '</div>';
    $f .= '<input type="hidden" name="csrf" value="' . $h($_SESSION['csrf']) . '"><label>Password<input type="password" name="password" autocomplete="' . ($setup ? 'new-password' : 'current-password') . '" required autofocus></label>';
    if ($setup) $f .= '<label>Type it again<input type="password" name="confirm" autocomplete="new-password" required></label>';
    $f .= '<button>' . ($setup ? 'Save and open dashboard' : 'Sign in') . '</button></form>';
    page('Chirp admin', $f);
}

// ---------- Dashboard ----------
$range = (int) ($_GET['days'] ?? 30);
if (!in_array($range, [7, 30, 90, 365], true)) $range = 30;
$tz = new DateTimeZone('America/Los_Angeles');
$to = (new DateTime('now', $tz))->format('Y-m-d');
$from = (new DateTime('now', $tz))->modify('-' . ($range - 1) . ' days')->format('Y-m-d');
$days = chirpReadMetrics($from, $to);

$tot = [];
foreach ($days as $c) foreach ($c as $k => $n) $tot[$k] = ($tot[$k] ?? 0) + $n;
$g = fn($k) => (int) ($tot[$k] ?? 0);
$prefix = function (string $p) use ($tot): array {
    $o = [];
    foreach ($tot as $k => $n) if (str_starts_with($k, $p . ':')) $o[substr($k, strlen($p) + 1)] = $n;
    arsort($o);
    return $o;
};

if (($_GET['csv'] ?? '') === '1') {
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="chirp-metrics-' . $from . '-to-' . $to . '.csv"');
    $out = fopen('php://output', 'w');
    fputcsv($out, ['date', 'metric', 'count']);
    foreach ($days as $d => $c) foreach ($c as $k => $n) fputcsv($out, [$d, $k, $n]);
    exit;
}

$todayC = $days[$to] ?? [];
$avgDau = $g('dau') / $range;
$pv = array_sum($prefix('pv'));
$new = $g('new_device');
$pct = fn($a, $b) => $b > 0 ? round(100 * $a / $b) . '%' : '–';

$kpis = [
    ['Active today', (int) ($todayC['dau'] ?? 0), 'devices that opened Chirp today'],
    ['Avg daily active', number_format($avgDau, 1), 'per day, last ' . $range . ' days'],
    ['Weekly active', $g('wau'), 'device-weeks in range'],
    ['Monthly active', $g('mau'), 'device-months in range'],
    ['New devices', $new, 'first visits'],
    ['Returning visits', $g('returning'), 'days a past visitor came back'],
    ['Page views', $pv, number_format($pv / $range, 0) . ' per day'],
    ['Chats started', $g('chat_start'), $g('chat_msg') . ' messages sent'],
    ['Chat replies', $g('chat_ok'), $g('chat_error') . ' errors'],
    ['Safety alerts', $g('chat_risk:urgent') + $g('chat_ai_risk:urgent'), ($g('chat_risk:concern') + $g('chat_ai_risk:concern')) . ' concern-level'],
    ['Day-1 retention', $pct($g('retained_d1'), $new), 'came back after 1+ days'],
    ['Day-7 retention', $pct($g('retained_d7'), $new), 'came back after 7+ days'],
    ['Day-30 retention', $pct($g('retained_d30'), $new), 'came back after 30+ days'],
    ['Age check', $g('age_pass'), $g('age_block') . ' under 13, turned away'],
    ['Skills practiced', array_sum($prefix('practiced')), 'cards marked practiced'],
    ['Meditations', $g('listen_start_all'), $pct($g('listen_done_all'), $g('listen_start_all')) . ' finished'],
    ['Articles read', array_sum($prefix('article')), count($prefix('article')) . ' different articles'],
    ['Bingo lines', $g('bingo'), $g('bingo_full') . ' full cards'],
    ['AI tokens', number_format($g('tokens_in') + $g('tokens_out')), number_format($g('tokens_in')) . ' in, ' . number_format($g('tokens_out')) . ' out'],
    ['Help page', (int) ($tot['pv:/help'] ?? 0), $g('sos_pick') . ' used the right-now finder'],
];

$table = function (string $title, array $rows, int $limit = 12, string $empty = 'No data yet') use ($h): string {
    $o = '<div class="card"><h2>' . $h($title) . '</h2>';
    if (!$rows) return $o . '<p class="sub">' . $empty . '</p></div>';
    $max = max($rows) ?: 1;
    $o .= '<table>';
    foreach (array_slice($rows, 0, $limit, true) as $k => $n) {
        $o .= '<tr><td>' . $h($k) . '<div class="bar" style="width:' . round(100 * $n / $max) . '%"></div></td><td>' . number_format($n) . '</td></tr>';
    }
    return $o . '</table></div>';
};

// Trend chart: daily active devices and chats.
$series = [];
for ($d = new DateTime($from, $tz); $d->format('Y-m-d') <= $to; $d->modify('+1 day')) {
    $k = $d->format('Y-m-d');
    $series[$k] = [(int) ($days[$k]['dau'] ?? 0), (int) ($days[$k]['chat_start'] ?? 0)];
}
$W = 1000; $H = 180; $n = count($series); $bw = $W / max(1, $n);
$mx = max(1, max(array_map(fn($v) => max($v), $series)));
$svg = '<svg viewBox="0 0 ' . $W . ' ' . ($H + 24) . '" width="100%" role="img" aria-label="Daily active devices and chats">';
$i = 0;
foreach ($series as $day => [$a, $c]) {
    $x = $i * $bw;
    $ha = $H * $a / $mx; $hc = $H * $c / $mx;
    $svg .= '<rect x="' . round($x + 1, 1) . '" y="' . round($H - $ha, 1) . '" width="' . round(max(1, $bw / 2 - 1), 1) . '" height="' . round($ha, 1) . '" fill="#001c38"><title>' . $day . ': ' . $a . ' active</title></rect>';
    $svg .= '<rect x="' . round($x + $bw / 2, 1) . '" y="' . round($H - $hc, 1) . '" width="' . round(max(1, $bw / 2 - 1), 1) . '" height="' . round($hc, 1) . '" fill="#c8321e"><title>' . $day . ': ' . $c . ' chats</title></rect>';
    if ($n <= 31 ? $i % max(1, intdiv($n, 7)) === 0 : $i % 30 === 0) $svg .= '<text x="' . round($x, 1) . '" y="' . ($H + 16) . '">' . substr($day, 5) . '</text>';
    $i++;
}
$svg .= '</svg>';

$hours = [];
for ($x = 0; $x < 24; $x++) $hours[sprintf('%02d:00', $x)] = (int) ($tot['hour:' . $x] ?? 0);

$moods = $prefix('mood');
$pages = $prefix('pv');
$practiced = $prefix('practiced');
$articles = $prefix('article');
$listens = $prefix('listen_done');
$starts = $prefix('listen_start');
$medRows = [];
foreach ($starts as $id => $s) $medRows[$id . ' (' . $pct($listens[$id] ?? 0, $s) . ' finished)'] = $s;
$chatSkills = $prefix('chat_skill');
$sos = $prefix('sos');
$tips = $prefix('practice');

$nav = '';
foreach ([7 => '7 days', 30 => '30 days', 90 => '90 days', 365 => '1 year'] as $d => $l) $nav .= '<a class="' . ($d === $range ? 'on' : '') . '" href="?days=' . $d . '">' . $l . '</a>';
$nav .= '<a href="?days=' . $range . '&csv=1">Download CSV</a><a href="?logout=1">Sign out</a>';

$body = '<header><b>Chirp</b><span>Admin dashboard</span><nav>' . $nav . '</nav></header><main>';
$body .= '<div class="k">' . $h($from) . ' to ' . $h($to) . ' · Pacific time</div><h1>How Chirp is doing</h1><p class="sub">Counts are anonymous totals. Chirp stores no accounts, names, IP addresses or chat messages, so no number here can be traced to a person.</p>';
$body .= '<div class="grid">';
foreach ($kpis as [$l, $v, $s]) $body .= '<div class="card"><div class="k">' . $h($l) . '</div><div class="big">' . $h($v) . '</div><div class="sub">' . $h($s) . '</div></div>';
$body .= '</div>';
$body .= '<div class="card" style="margin-top:20px"><h2>Daily trend</h2><p class="sub"><span style="color:#001c38">■</span> active devices &nbsp; <span style="color:#c8321e">■</span> chats started</p>' . $svg . '</div>';
$body .= '<div class="cols">';
$body .= $table('Moods people picked', $moods);
$body .= $table('Most-visited pages', $pages, 15);
$body .= $table('Skills marked practiced', $practiced, 15);
$body .= $table('Skills Chirp suggested in chat', $chatSkills, 15);
$body .= $table('Articles read', $articles, 15);
$body .= $table('Meditations started', $medRows, 15);
$body .= $table('Right-now finder picks', $sos);
$body .= $table('Practices used', $tips);
$body .= $table('Devices (first visit)', $prefix('device'));
$body .= $table('Where new visitors came from', $prefix('ref'));
$body .= $table('Time of day (visitor local time)', $hours, 24);
$body .= '</div><p class="note">Metrics are counted on your own SiteGround server with no third-party tools and no added cost. Visitors whose browser sends Global Privacy Control are not counted. To reset the admin password, delete <code>chirp-data/admin.json</code> (in the folder above public_html) and visit this page again.</p></main>';
page('Chirp admin', $body);
