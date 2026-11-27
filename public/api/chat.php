<?php
// Chirp chat backend for SiteGround (PHP 8.1+).
// Receives the conversation from the chat page, runs the crisis keyword check,
// asks Claude for Chirp's reply, and returns JSON:
//   { reply, skillIds, quickReplies, risk }
//
// The API key is read from playchirp-config.php in the folder ABOVE
// public_html, so it is never inside the website's public files:
//   <?php return ['anthropic_api_key' => 'sk-ant-...', 'model' => 'claude-opus-5-5'];

declare(strict_types=1);
require_once __DIR__ . '/metrics-lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const MAX_INPUT_CHARS = 512;   // carried over from the old AI Engine settings
const MAX_HISTORY = 15;
const RATE_LIMIT_PER_MINUTE = 20;

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'POST only']);
    exit;
}

$config = loadChirpConfig();
$settings = loadPrivateSettings();

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body) || !isset($body['messages']) || !is_array($body['messages'])) {
    respondError(400, 'Bad request');
}

// Clean the history: user/assistant text only, trimmed, last 15 turns, starting with a user turn.
$history = [];
foreach ($body['messages'] as $m) {
    if (!is_array($m)) continue;
    $role = $m['role'] ?? '';
    $content = $m['content'] ?? '';
    if (!in_array($role, ['user', 'assistant'], true) || !is_string($content)) continue;
    $limit = $role === 'user' ? MAX_INPUT_CHARS : 4000;
    $history[] = ['role' => $role, 'content' => mb_substr($content, 0, $limit)];
}
$history = array_slice($history, -MAX_HISTORY);
while ($history && $history[0]['role'] !== 'user') array_shift($history);
$last = end($history);
if (!$last || $last['role'] !== 'user' || trim($last['content']) === '') {
    respondError(400, 'Message required');
}

// Layer 1: deterministic crisis keyword check, independent of the AI.
$keywordRisk = checkRisk($last['content'], $config);
chirpCount(['chat_msg' => 1] + ($keywordRisk !== 'none' ? ['chat_risk:' . $keywordRisk => 1] : []) + (count(array_filter($history, fn($h) => $h['role'] === 'user')) === 1 ? ['chat_start' => 1] : []));

if (rateLimited(clientIp())) {
    respond(safeFallback($keywordRisk, "Whoa, that's a lot of chirping! Let's take a breath and try again in a minute.", $config));
}

$apiKey = $settings['anthropic_api_key'] ?? getenv('ANTHROPIC_API_KEY') ?: '';
if ($apiKey === '') {
    respond(safeFallback($keywordRisk, "Chirp's chat isn't connected yet (no API key is set up). You can still explore the skills library and mindful exercises!", $config));
}

$autoload = __DIR__ . '/vendor/autoload.php';
if (!is_file($autoload)) {
    error_log('Chirp: vendor/autoload.php missing');
    respond(safeFallback($keywordRisk, "Oops, my wings got tangled and I couldn't answer. Please try again in a moment.", $config));
}
require $autoload;

$mood = isset($body['mood']) && is_string($body['mood']) ? mb_substr($body['mood'], 0, 30) : '';
$system = $config['systemPrompt'] . ($mood !== '' ? "\n\nThe person picked this mood when they arrived: {$mood}." : '');
$model = $settings['model'] ?? getenv('CHIRP_MODEL') ?: 'claude-opus-5-5';

try {
    $client = new \Anthropic\Client(apiKey: $apiKey);
    $message = $client->beta->messages->create(
        model: $model,
        maxTokens: 2000,
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
        system: [['type' => 'text', 'text' => $system, 'cacheControl' => ['type' => 'ephemeral']]],
        messages: $history,
        outputConfig: [
            'effort' => 'low',
            'format' => [
                'type' => 'json_schema',
                'schema' => [
                    'type' => 'object',
                    'properties' => [
                        'reply' => ['type' => 'string'],
                        'skill_ids' => ['type' => 'array', 'items' => ['type' => 'string']],
                        'quick_replies' => ['type' => 'array', 'items' => ['type' => 'string']],
                        'risk' => ['type' => 'string', 'enum' => ['none', 'concern', 'urgent']],
                    ],
                    'required' => ['reply', 'skill_ids', 'quick_replies', 'risk'],
                    'additionalProperties' => false,
                ],
            ],
        ],
    );
} catch (\Anthropic\Core\Exceptions\APIStatusException $e) {
    chirpCount(['chat_error' => 1]);
    error_log('Chirp chat API error: ' . ($e->type?->value ?? 'unknown') . ' ' . $e->getMessage());
    respond(safeFallback($keywordRisk, "Oops, my wings got tangled and I couldn't answer. Please try again in a moment.", $config));
} catch (\Throwable $e) {
    chirpCount(['chat_error' => 1]);
    error_log('Chirp chat error: ' . $e->getMessage());
    respond(safeFallback($keywordRisk, "Oops, my wings got tangled and I couldn't answer. Please try again in a moment.", $config));
}

$parsed = null;
if ($message->stopReason !== 'refusal') {
    foreach ($message->content as $block) {
        if ($block->type === 'text') {
            $parsed = json_decode($block->text, true);
            break;
        }
    }
}
if (!is_array($parsed) || !isset($parsed['reply']) || !is_string($parsed['reply'])) {
    respond(safeFallback($keywordRisk, 'Hmm, I got a little tangled up there. Could you say that another way?', $config));
}

$validSkills = array_flip($config['skillIds']);
$skillIds = array_values(array_filter(
    is_array($parsed['skill_ids'] ?? null) ? $parsed['skill_ids'] : [],
    fn($id) => is_string($id) && isset($validSkills[$id])
));
$quick = array_values(array_filter(
    is_array($parsed['quick_replies'] ?? null) ? $parsed['quick_replies'] : [],
    'is_string'
));
$aiRisk = in_array($parsed['risk'] ?? '', ['none', 'concern', 'urgent'], true) ? $parsed['risk'] : 'none';

$counts = ['chat_ok' => 1];
try {
    $counts['tokens_in'] = (int) ($message->usage->inputTokens ?? 0);
    $counts['tokens_out'] = (int) ($message->usage->outputTokens ?? 0);
} catch (\Throwable) {}
if ($aiRisk !== 'none') $counts['chat_ai_risk:' . $aiRisk] = 1;
foreach (array_slice($skillIds, 0, 3) as $sid) $counts['chat_skill:' . $sid] = 1;
chirpCount($counts);

respond([
    'reply' => $parsed['reply'],
    'skillIds' => array_slice($skillIds, 0, 3),
    'quickReplies' => array_slice($quick, 0, 3),
    'risk' => maxRisk($keywordRisk, $aiRisk),
]);

// ---------------------------------------------------------------------------

function loadChirpConfig(): array
{
    // Written by the app build (src/app/api/chirp-config.json/route.ts), converted to PHP when packaged.
    $php = __DIR__ . '/chirp-config.php';
    if (is_file($php)) {
        $cfg = require $php;
    } else {
        $raw = @file_get_contents(__DIR__ . '/chirp-config.json');
        $cfg = $raw ? json_decode($raw, true) : null;
    }
    if (!is_array($cfg)) {
        error_log('Chirp: chirp-config.json missing or invalid');
        http_response_code(500);
        echo json_encode(['error' => 'Server misconfigured']);
        exit;
    }
    return $cfg;
}

function loadPrivateSettings(): array
{
    // Look for playchirp-config.php above the web root (and one more level up).
    foreach ([dirname(__DIR__, 2), dirname(__DIR__, 3)] as $dir) {
        $file = $dir . '/playchirp-config.php';
        if (is_file($file)) {
            $s = require $file;
            return is_array($s) ? $s : [];
        }
    }
    return [];
}

function checkRisk(string $text, array $config): string
{
    foreach ($config['urgentPatterns'] as $p) if (@preg_match($p, $text)) return 'urgent';
    foreach ($config['concernPatterns'] as $p) if (@preg_match($p, $text)) return 'concern';
    return 'none';
}

function maxRisk(string $a, string $b): string
{
    $order = ['none' => 0, 'concern' => 1, 'urgent' => 2];
    return $order[$a] >= $order[$b] ? $a : $b;
}

// Used whenever the AI can't answer. Urgent risk always gets the crisis reply.
function safeFallback(string $risk, string $message, array $config): array
{
    if ($risk === 'urgent') {
        return ['reply' => $config['urgentFallbackReply'], 'skillIds' => [], 'quickReplies' => [], 'risk' => $risk];
    }
    return ['reply' => $message, 'skillIds' => [], 'quickReplies' => [], 'risk' => $risk];
}

function clientIp(): string
{
    $fwd = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if ($fwd !== '') return trim(explode(',', $fwd)[0]);
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

// Simple file-based limit: 20 messages per minute per visitor.
function rateLimited(string $ip): bool
{
    $file = sys_get_temp_dir() . '/playchirp-rl-' . hash('sha256', $ip);
    $now = time();
    $hits = [];
    if (is_file($file)) {
        $hits = array_filter(
            array_map('intval', explode(',', (string) @file_get_contents($file))),
            fn($t) => $now - $t < 60
        );
    }
    $hits[] = $now;
    @file_put_contents($file, implode(',', $hits), LOCK_EX);
    return count($hits) > RATE_LIMIT_PER_MINUTE;
}

function respond(array $data): never
{
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function respondError(int $code, string $msg): never
{
    http_response_code($code);
    echo json_encode(['error' => $msg]);
    exit;
}
