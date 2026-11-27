<?php
// Receives anonymous event names from the app and adds 1 to today's counters.
declare(strict_types=1);
require __DIR__ . '/metrics-lib.php';

header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { http_response_code(405); exit; }
if (chirpThrottle('trk', 120)) { http_response_code(204); exit; }

$body = json_decode((string) file_get_contents('php://input', false, null, 0, 4096), true);
$list = is_array($body['e'] ?? null) ? array_slice($body['e'], 0, 12) : [];
$events = [];
foreach ($list as $e) {
    if (!is_string($e)) continue;
    $e = strtolower(trim($e));
    if (!preg_match('~^[a-z][a-z0-9_]{1,24}(:[a-z0-9._/\-]{1,60})?$~', $e)) continue;
    $events[$e] = ($events[$e] ?? 0) + 1;
}
chirpCount($events);
http_response_code(204);
