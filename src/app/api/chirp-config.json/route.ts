// Build-time only: writes /api/chirp-config.json into the static export so the
// PHP chat backend (public/api/chat.php) uses the same prompt, skill list and
// crisis keywords as the app. The folder's .htaccess blocks public access.
import { SYSTEM_PROMPT } from "@/lib/prompt";
import { CONCERN_PATTERNS, URGENT_PATTERNS, URGENT_FALLBACK_REPLY } from "@/lib/crisis";
import { SKILLS } from "@/data/skills";

export const dynamic = "force-static";

// JS regex -> PCRE: same syntax for the patterns we use; flags become "/i" or "/".
const toPcre = (r: RegExp) => `/${r.source}/${r.flags.includes("i") ? "i" : ""}`;

export function GET() {
  return Response.json({
    systemPrompt: SYSTEM_PROMPT,
    skillIds: SKILLS.map((s) => s.id),
    urgentPatterns: URGENT_PATTERNS.map(toPcre),
    concernPatterns: CONCERN_PATTERNS.map(toPcre),
    urgentFallbackReply: URGENT_FALLBACK_REPLY,
  });
}
