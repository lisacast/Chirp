<?php
// Shared helpers for Chirp's private, aggregate-only usage counts.
// Counts live in chirp-data/ ABOVE public_html, one JSON file per month:
//   { "2026-11-27": { "pv:/lobby": 12, "dau": 5, ... }, ... }
// Nothing personal is stored: no IDs, IPs, cookies, names or messages.

declare(strict_types=1);

function chirpDataDir(): string
{
    $base = dirname(__DIR__, 2);
    $dir = $base . '/chirp-data';
    if (!is_dir($dir)) @mkdir($dir, 0750, true);
    if (!is_dir($dir) || !is_writable($dir)) {
        $dir = sys_get_temp_dir() . '/chirp-data';
        if (!is_dir($dir)) @mkdir($dir, 0750, true);
    }
    return $dir;
}

/** Add to daily counters. $events: [name => increment]. */
function chirpCount(array $events): void
{
    if (!$events) return;
    $tz = new DateTimeZone('America/Los_Angeles');
    $now = new DateTime('now', $tz);
    $file = chirpDataDir() . '/metrics-' . $now->format('Y-m') . '.json';
    $day = $now->format('Y-m-d');
    $fh = @fopen($file, 'c+');
    if (!$fh) return;
    if (flock($fh, LOCK_EX)) {
        $raw = stream_get_contents($fh);
        $data = $raw ? (json_decode($raw, true) ?: []) : [];
        $today = $data[$day] ?? [];
        foreach ($events as $k => $n) {
            if (!isset($today[$k]) && count($today) >= 3000) continue; // cap distinct keys per day
            $today[$k] = ($today[$k] ?? 0) + $n;
        }
        $data[$day] = $today;
        ftruncate($fh, 0);
        rewind($fh);
        fwrite($fh, json_encode($data));
        fflush($fh);
        flock($fh, LOCK_UN);
    }
    fclose($fh);
}

/** Read all days between two Y-m-d dates (inclusive). */
function chirpReadMetrics(string $from, string $to): array
{
    $out = [];
    $start = new DateTime($from . '-01' === $from ? $from : substr($from, 0, 7) . '-01');
    $end = new DateTime(substr($to, 0, 7) . '-01');
    for ($m = clone $start; $m <= $end; $m->modify('+1 month')) {
        $file = chirpDataDir() . '/metrics-' . $m->format('Y-m') . '.json';
        if (!is_file($file)) continue;
        $data = json_decode((string) @file_get_contents($file), true) ?: [];
        foreach ($data as $day => $counts) {
            if ($day >= $from && $day <= $to) $out[$day] = $counts;
        }
    }
    ksort($out);
    return $out;
}

/** Throttle per visitor using a one-way hash that is never stored beyond a minute. */
function chirpThrottle(string $bucket, int $perMinute): bool
{
    $fwd = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    $ip = $fwd !== '' ? trim(explode(',', $fwd)[0]) : ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $file = sys_get_temp_dir() . '/chirp-' . $bucket . '-' . hash('sha256', $ip . date('YmdH'));
    $now = time();
    $hits = [];
    if (is_file($file)) {
        $hits = array_filter(array_map('intval', explode(',', (string) @file_get_contents($file))), fn($t) => $now - $t < 60);
    }
    $hits[] = $now;
    @file_put_contents($file, implode(',', $hits), LOCK_EX);
    return count($hits) > $perMinute;
}
