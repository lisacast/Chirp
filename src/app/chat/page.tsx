"use client";

import { useEffect, useRef, useState } from "react";
import Shell from "@/components/Shell";
import Flashcard from "@/components/Flashcard";
import LiveBird, { type BirdMood } from "@/components/LiveBird";
import CrisisCard from "@/components/CrisisCard";
import { SendIcon } from "@/components/Icons";
import { getSkill, getModule, SKILLS } from "@/data/skills";
import { checkMessage, maxRisk } from "@/lib/crisis";
import { loadProfile, todaysMood } from "@/lib/profile";
import type { ChatMessage, ChatResponse } from "@/lib/types";

const STORE = "playchirp.chat.v1";
const MAX_INPUT = 512;

function greeting(): ChatMessage {
  const p = loadProfile();
  const mood = todaysMood(p);
  const hi = p.nickname ? `Hi ${p.nickname}! ` : "Hi there! ";
  return {
    role: "assistant",
    content: mood
      ? `${hi}I'm Chirp. I see you're feeling ${mood} today. Want to tell me a little about what's going on?`
      : `${hi}I'm Chirp, your skills buddy. How are you feeling today?`,
    quickReplies: mood
      ? undefined
      : ["Pretty good", "Stressed out", "Not great"],
  };
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [openSkill, setOpenSkill] = useState<{
    id: string;
    list: string[];
  } | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [bird, setBird] = useState<BirdMood>("idle");
  const pendingQ = useRef<string | null>(null);

  useEffect(() => {
    let q = new URLSearchParams(location.search).get("q");
    try {
      const pre = sessionStorage.getItem("playchirp.prefill");
      if (pre) {
        q = pre;
        sessionStorage.removeItem("playchirp.prefill");
      }
    } catch {}
    if (q) {
      pendingQ.current = q.slice(0, MAX_INPUT);
      history.replaceState(null, "", "/chat/");
    }
    try {
      const saved = sessionStorage.getItem(STORE);
      if (saved) {
        setMessages(JSON.parse(saved));
        return;
      }
    } catch {}
    setMessages([greeting()]);
  }, []);

  useEffect(() => {
    try {
      if (messages.length)
        sessionStorage.setItem(STORE, JSON.stringify(messages));
    } catch {}
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    if (messages.length && pendingQ.current && !busy) {
      const q = pendingQ.current;
      pendingQ.current = null;
      send(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, busy]);

  async function send(text: string) {
    const content = text.trim().slice(0, MAX_INPUT);
    if (!content || busy) return;
    const localRisk = checkMessage(content);
    const userMsg: ChatMessage = { role: "user", content, risk: localRisk };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setBusy(true);
    setBird("thinking");

    try {
      const res = await fetch("/api/chat.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
          mood: todaysMood(loadProfile()),
        }),
      });
      const data = (await res.json()) as ChatResponse;
      if (!res.ok || !data.reply) throw new Error("bad response");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.reply,
          skillIds: data.skillIds,
          quickReplies: data.quickReplies,
          risk: maxRisk(localRisk, data.risk),
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            localRisk === "urgent"
              ? "I'm really glad you told me. You deserve support from a real person right now. Please reach out to one of the people below."
              : "Oops, I couldn't connect just now. Please try again in a moment.",
          risk: localRisk,
        },
      ]);
    } finally {
      setBusy(false);
      setBird("reply");
      setTimeout(() => setBird("idle"), 900);
    }
  }

  function closeCard() {
    setOpenSkill(null);
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        content: "Hey, great job. What would you like to practice next?",
      },
    ]);
  }

  function nextCard() {
    if (!openSkill) return;
    const { id, list } = openSkill;
    const i = list.indexOf(id);
    if (i >= 0 && i < list.length - 1) {
      setOpenSkill({ id: list[i + 1], list });
      return;
    }
    // Past the suggested cards: continue through the same module.
    const skill = getSkill(id)!;
    const mod = SKILLS.filter((s) => s.module === skill.module);
    const j = mod.findIndex((s) => s.id === id);
    setOpenSkill({ id: mod[(j + 1) % mod.length].id, list });
  }

  function clearChat() {
    try {
      sessionStorage.removeItem(STORE);
    } catch {}
    setMessages([greeting()]);
  }

  const last = messages[messages.length - 1];
  const card = openSkill ? getSkill(openSkill.id) : undefined;

  return (
    <Shell fill>
      <div className="flex items-center gap-3 pb-3">
        <LiveBird mood={bird} size={52} />
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-bold leading-tight text-oxford">Chirp</h1>
          <p className="text-xs font-semibold text-muted">
            {bird === "thinking" ? (
              <>
                thinking<span className="dot-1">.</span>
                <span className="dot-2">.</span>
                <span className="dot-3">.</span>
              </>
            ) : bird === "listening" ? "listening…" : "here for you · private, nothing saved"}
          </p>
        </div>
        <button onClick={clearChat} className="rounded-full border border-line bg-white px-3 py-1 text-xs font-bold text-muted">
          Start over
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pb-3" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className="space-y-2">
            {m.role === "assistant" ? (
              <div className="flex items-start gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/chirp-bird.png" alt="" width={34} height={34} className={`mt-1 h-[34px] w-[34px] shrink-0 rounded-full bg-white p-0.5 ring-1 ring-line ${i === messages.length - 1 ? "bird-ruffle" : ""}`} />
                <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm border border-line bg-white px-4 py-3">
                  {m.content}
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-oxford px-4 py-3 text-white">
                  {m.content}
                </div>
              </div>
            )}

            {m.skillIds && m.skillIds.length > 0 && (
              <div className="flex flex-wrap gap-2 pl-12">
                {m.skillIds.map((id) => {
                  const s = getSkill(id);
                  if (!s) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => setOpenSkill({ id, list: m.skillIds! })}
                      className="rounded-lg px-3 py-2 text-sm font-bold text-white"
                      style={{ background: getModule(s.module).color }}
                    >
                      🃏 {s.name}
                    </button>
                  );
                })}
              </div>
            )}

            {m.risk && m.risk !== "none" && m.role === "assistant" && (
              <div className="pl-12">
                <CrisisCard risk={m.risk} compact />
              </div>
            )}
          </div>
        ))}

        {busy && (
          <div className="flex items-center gap-2 pl-11" aria-label="Chirp is typing">
            <span className="rounded-2xl rounded-tl-sm border border-line bg-white px-4 py-3 text-xl font-bold leading-none text-oxford">
              <span className="dot-1">•</span> <span className="dot-2">•</span> <span className="dot-3">•</span>
            </span>
          </div>
        )}

        {!busy &&
          last?.role === "assistant" &&
          last.quickReplies &&
          last.quickReplies.length > 0 && (
            <div className="flex flex-wrap justify-end gap-2">
              {last.quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border-2 border-oxford bg-white px-4 py-2 text-sm font-bold text-oxford hover:bg-sun"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mb-[max(env(safe-area-inset-bottom),0.75rem)] flex items-center gap-2 rounded-xl border-2 border-oxford bg-white px-3 py-1.5"
      >
        <label htmlFor="chat-input" className="sr-only">
          Message Chirp
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (!busy) setBird(e.target.value ? "listening" : "idle");
          }}
          maxLength={MAX_INPUT}
          placeholder="Tell Chirp anything…"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-2 outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Send"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-sun text-oxford disabled:opacity-40"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </form>
      <p className="pb-2 text-center text-xs text-muted">
        Chirp is an AI guide, not a therapist. In crisis, call or text 988.
      </p>

      {card && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={card.name}
        >
          <div className="w-full max-w-md">
            <Flashcard skill={card} onBack={closeCard} onNext={nextCard} />
          </div>
        </div>
      )}
    </Shell>
  );
}
