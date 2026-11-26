import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/prompt";
import { checkMessage, maxRisk, URGENT_FALLBACK_REPLY, type RiskLevel } from "@/lib/crisis";
import { SKILLS } from "@/data/skills";
import type { ChatRequest, ChatResponse } from "@/lib/types";

export const runtime = "nodejs";

// Limits carried over from the old AI Engine settings.
const MAX_INPUT_CHARS = 512;
const MAX_HISTORY = 15;

// Model is configurable so cost can be tuned without a code change.
const MODEL = process.env.CHIRP_MODEL || "claude-opus-5-5";

const ChirpReply = z.object({
  reply: z.string(),
  skill_ids: z.array(z.string()),
  quick_replies: z.array(z.string()),
  risk: z.enum(["none", "concern", "urgent"]),
});

// Best-effort per-instance rate limit: 20 messages per minute per IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 20;
}

const validSkillIds = new Set(SKILLS.map((s) => s.id));

export async function POST(req: Request) {
  let body: ChatRequest;
  try {
    body = (await req.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const history = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, m.role === "user" ? MAX_INPUT_CHARS : 4000) }))
    .slice(-MAX_HISTORY);

  // The API needs the conversation to start with a user turn.
  while (history.length && history[0].role !== "user") history.shift();
  const last = history[history.length - 1];
  if (!last || last.role !== "user" || !last.content.trim()) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  // Layer 1: deterministic keyword check, independent of the AI.
  const keywordRisk: RiskLevel = checkMessage(last.content);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      safeFallback(keywordRisk, "Whoa, that's a lot of chirping! Let's take a breath and try again in a minute."),
    );
  }

  if (!process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    return NextResponse.json(
      safeFallback(
        keywordRisk,
        "Chirp's chat isn't connected yet (no API key is set up). You can still explore the skills library and mindful exercises!",
      ),
    );
  }

  const moodNote = body.mood ? `\n\nThe person picked this mood when they arrived: ${body.mood}.` : "";

  try {
    const client = new Anthropic();
    const response = await client.beta.messages.parse({
      model: MODEL,
      max_tokens: 2000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: SYSTEM_PROMPT + moodNote, cache_control: { type: "ephemeral" } }],
      messages: history,
      output_config: { effort: "low", format: betaZodOutputFormat(ChirpReply) },
    });

    const parsed = response.stop_reason === "refusal" ? null : response.parsed_output;
    if (!parsed) {
      return NextResponse.json(
        safeFallback(keywordRisk, "Hmm, I got a little tangled up there. Could you say that another way?"),
      );
    }

    const risk = maxRisk(keywordRisk, parsed.risk);
    const out: ChatResponse = {
      reply: parsed.reply,
      skillIds: parsed.skill_ids.filter((id) => validSkillIds.has(id)).slice(0, 3),
      quickReplies: parsed.quick_replies.slice(0, 3),
      risk,
    };
    return NextResponse.json(out);
  } catch (err) {
    console.error("chat error", err instanceof Anthropic.APIError ? `${err.status} ${err.message}` : err);
    return NextResponse.json(
      safeFallback(keywordRisk, "Oops, my wings got tangled and I couldn't answer. Please try again in a moment."),
    );
  }
}

// Used whenever the AI can't answer. If the message showed urgent risk, the
// person always gets the crisis reply and resources, never just an error.
function safeFallback(risk: RiskLevel, message: string): ChatResponse {
  if (risk === "urgent") {
    return { reply: URGENT_FALLBACK_REPLY, skillIds: [], quickReplies: [], risk };
  }
  return { reply: message, skillIds: [], quickReplies: [], risk };
}
