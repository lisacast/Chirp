"use client";

import Link from "next/link";
import { useState } from "react";
import { SOS } from "@/data/tips";
import { getSkill } from "@/data/skills";
import { getMeditation } from "@/data/meditations";
import { track } from "@/lib/track";

export default function SosFinder() {
  const [pick, setPick] = useState<string | null>(null);
  const o = SOS.find((s) => s.id === pick);
  const med = o?.listen ? getMeditation(o.listen) : undefined;

  return (
    <section className="rounded-2xl bg-oxford p-5 text-white sm:p-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">Right now</p>
      <h2 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">What&apos;s going on?</h2>
      <p className="mt-1 text-white/90">Pick the closest one. You&apos;ll get three quick steps you can try right away.</p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SOS.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setPick(s.id);
              track("sos_pick");
              track("sos", s.id);
            }}
            aria-pressed={pick === s.id}
            className={`flex items-center gap-2 rounded-xl border-2 px-3 py-3 text-left text-sm font-bold ${
              pick === s.id ? "border-sun bg-sun text-oxford" : "border-white/30 hover:bg-white/10"
            }`}
          >
            <span className="text-xl" aria-hidden>
              {s.emoji}
            </span>
            {s.label}
          </button>
        ))}
      </div>

      {o && (
        <div className="mt-6 rounded-2xl bg-white p-5 text-ink" aria-live="polite">
          <p className="font-display text-xl font-bold text-oxford">{o.intro}</p>
          <ol className="mt-4 space-y-3">
            {o.steps.map((s, i) => (
              <li key={s} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red font-extrabold text-white">{i + 1}</span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/practice#breathe" className="rounded-full bg-oxford px-4 py-2 text-sm font-bold text-white">
              Breathing pacer
            </Link>
            {med && (
              <Link href={`/listen?play=${med.id}`} className="rounded-full bg-blue px-4 py-2 text-sm font-bold text-white">
                Listen: {med.title}
              </Link>
            )}
            {o.skillIds.map((id) => {
              const sk = getSkill(id);
              return sk ? (
                <Link key={id} href={`/skills/${id}`} className="rounded-full border-2 border-oxford px-4 py-1.5 text-sm font-bold text-oxford hover:bg-sun">
                  {sk.name}
                </Link>
              ) : null;
            })}
            <Link href="/chat" className="rounded-full bg-red px-4 py-2 text-sm font-bold text-white">
              Talk to Chirp
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
