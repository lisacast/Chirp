"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import { MODULES, SKILLS } from "@/data/skills";
import { loadProfile } from "@/lib/profile";

export default function SkillsPage() {
  const [practiced, setPracticed] = useState<string[]>([]);
  useEffect(() => setPracticed(loadProfile().practiced), []);

  return (
    <Shell width="wide">
      <PageHeader kicker="Flashcards" title="Skills library" dek={`${SKILLS.length} DBT skills in four areas. Tap a skill to open its card, then mark it practiced to fill in your bingo board.`}>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-sun px-3 py-1 text-sm font-bold text-oxford">
            {practiced.length} of {SKILLS.length} practiced
          </span>
          <Link href="/progress" className="text-sm font-bold text-red underline">
            See your bingo card
          </Link>
        </div>
      </PageHeader>

      <div className="space-y-10">
        {MODULES.map((m) => (
          <section key={m.id}>
            <div className="border-t-4 pt-3" style={{ borderColor: m.color }}>
              <h2 className="display text-3xl sm:text-4xl">{m.name}</h2>
              <p className="mt-1 text-muted">{m.tagline}</p>
            </div>
            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SKILLS.filter((s) => s.module === m.id).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/skills/${s.id}`}
                    className="flex h-full items-center justify-between gap-3 card px-4 py-3 transition hover:border-oxford"
                    style={{ borderLeft: `6px solid ${m.color}` }}
                  >
                    <span>
                      <span className="block font-extrabold text-oxford">{s.name}</span>
                      <span className="block text-sm text-muted">
                        {s.tagline}
                      </span>
                    </span>
                    {practiced.includes(s.id) && (
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: m.color }} aria-label="practiced">
                        ✓
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Shell>
  );
}
