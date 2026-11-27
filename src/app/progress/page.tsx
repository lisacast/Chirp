"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import { ART } from "@/data/art";
import { HeartIcon } from "@/components/Icons";
import { dayKey, loadProfile, streak, updateProfile, type Profile } from "@/lib/profile";
import { track } from "@/lib/track";
import { bingoState, CARD, FREE, SHORT } from "@/data/bingo";
import { getSkill, MODULES } from "@/data/skills";

const MOOD_EMOJI: Record<string, string> = {
  happy: "😄", calm: "😌", loved: "🥰", meh: "😐", tired: "😴", worried: "😟",
  sad: "😢", angry: "😠", stressed: "😣", embarrassed: "😳", numb: "😶", overwhelmed: "🤯",
};

export default function ProgressPage() {
  const [p, setP] = useState<Profile | null>(null);
  const [cheer, setCheer] = useState<string | null>(null);

  useEffect(() => {
    const prof = loadProfile();
    const b = bingoState(prof.practiced);
    const seen = prof.bingoLines ?? 0;
    if (b.lines.length > seen) {
      setCheer(b.full ? "Full card! You've practiced every skill on the board. 🎉" : `BINGO! You completed ${b.lines.length === 1 ? "a line" : `${b.lines.length} lines`}. 🎉`);
      for (let i = seen; i < b.lines.length; i++) track("bingo");
      if (b.full) track("bingo_full");
      updateProfile({ bingoLines: b.lines.length });
    }
    setP(loadProfile());
  }, []);

  if (!p) return <Shell width="wide">{null}</Shell>;
  const b = bingoState(p.practiced);
  const winning = new Set(b.lines.flat());
  const days = streak(p);
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const k = dayKey(d);
    return { k, label: d.toLocaleDateString(undefined, { weekday: "short" }), mood: p.moods?.[k], active: p.activeDays?.includes(k) };
  });
  const favorites = (p.favorites ?? []).map(getSkill).filter(Boolean);

  return (
    <Shell width="wide">
      <PageHeader art={ART.progress} kicker="Your progress" title="Skills bingo" dek="Practice a skill to fill its square. Five in a row wins." />

      {cheer && (
        <div role="status" className="mb-6 rounded-2xl bg-sun p-5 text-center text-xl font-bold text-oxford">
          {cheer}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <section aria-label="Bingo card">
          <div className="grid grid-cols-5 gap-1.5 rounded-2xl bg-oxford p-2 sm:gap-2 sm:p-3">
            {["C", "H", "I", "R", "P"].map((l) => (
              <div key={l} className="py-1 text-center text-xl font-bold text-sun sm:text-3xl">
                {l}
              </div>
            ))}
            {CARD.map((id, i) => {
              const done = b.done[i];
              if (id === FREE)
                return (
                  <div key={id} className="flex aspect-square flex-col items-center justify-center rounded-lg bg-sun p-1 text-center text-oxford">
                    <span className="text-xl sm:text-3xl" aria-hidden>
                      🐦
                    </span>
                    <span className="text-[0.6rem] font-extrabold uppercase sm:text-xs">Free</span>
                  </div>
                );
              const s = getSkill(id)!;
              const color = MODULES.find((m) => m.id === s.module)!.color;
              return (
                <Link
                  key={id}
                  href={`/skills/${id}`}
                  aria-label={`${s.name}${done ? ", practiced" : ""}`}
                  className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-lg p-1 text-center text-[0.6rem] font-bold leading-tight sm:text-xs ${
                    done ? "text-white" : "bg-white text-oxford hover:bg-paper"
                  } ${winning.has(i) ? "ring-4 ring-sun" : ""}`}
                  style={done ? { background: color } : { borderTop: `5px solid ${color}` }}
                >
                  <span className="line-clamp-3 break-words">{SHORT[id] ?? s.name}</span>
                  {done && (
                    <span aria-hidden className="absolute right-1 top-0.5 text-[0.65rem] sm:text-sm">
                      ✓
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-muted">
            {b.count} of 25 squares · {b.lines.length} bingo{b.lines.length === 1 ? "" : "s"}. Tap a square to open that skill, then tap &ldquo;I practiced this&rdquo; on the back of the card.
          </p>
        </section>

        <div className="space-y-6">
          <section className="card p-5">
            <p className="kicker">This week</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-oxford">{days}</span>
              <span className="font-bold text-muted">day streak</span>
            </div>
            <ol className="mt-4 grid grid-cols-7 gap-1 text-center">
              {week.map((w) => (
                <li key={w.k} className="flex flex-col items-center gap-1">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full text-xl ${w.active ? "bg-sun" : "bg-paper"}`} title={w.mood ?? ""}>
                    {w.mood ? MOOD_EMOJI[w.mood] ?? "•" : w.active ? "✓" : ""}
                  </span>
                  <span className="text-xs font-bold text-muted">{w.label}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-muted">Yellow days are days you practiced. Emojis show the mood you picked.</p>
          </section>

          <section className="card p-5">
            <p className="kicker">My coping kit</p>
            {favorites.length === 0 ? (
              <p className="mt-2 text-muted">
                Tap the <HeartIcon className="inline h-4 w-4" /> on any skill card to save it here, so your go-to skills are always one tap away.
              </p>
            ) : (
              <ul className="mt-2 divide-y divide-line">
                {favorites.map((s) => (
                  <li key={s!.id}>
                    <Link href={`/skills/${s!.id}`} className="block py-2.5 hover:underline">
                      <span className="block font-bold text-oxford">{s!.name}</span>
                      <span className="block text-sm text-muted">{s!.tagline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="grid grid-cols-3 gap-3 text-center">
            {[
              [p.practiced.length, "skills practiced"],
              [p.listened?.length ?? 0, "meditations"],
              [p.read?.length ?? 0, "articles read"],
            ].map(([n, l]) => (
              <div key={l as string} className="card p-3">
                <div className="text-2xl font-bold text-oxford">{n}</div>
                <div className="text-xs font-bold text-muted">{l}</div>
              </div>
            ))}
          </section>
          <p className="text-xs text-muted">Your progress is saved only on this device. Chirp never sees it.</p>
        </div>
      </div>
    </Shell>
  );
}
