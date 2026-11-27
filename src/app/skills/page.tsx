"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { MODULES, SKILLS } from "@/data/skills";
import { loadProfile } from "@/lib/profile";

export default function SkillsPage() {
  const [practiced, setPracticed] = useState<string[]>([]);
  useEffect(() => setPracticed(loadProfile().practiced), []);

  return (
    <Shell width="wide">
      <h1 className="text-2xl font-extrabold text-oxford sm:text-4xl">
        Skills library
      </h1>
      <p className="mt-1 text-muted">Tap a skill to open its flashcard.</p>

      <div className="mt-6 space-y-8">
        {MODULES.map((m) => (
          <section key={m.id}>
            <h2 className="text-xl font-bold" style={{ color: m.color }}>
              {m.name}
            </h2>
            <p className="text-sm text-muted">{m.tagline}</p>
            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SKILLS.filter((s) => s.module === m.id).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/skills/${s.id}`}
                    className="flex h-full items-center justify-between gap-3 card px-4 py-3 transition hover:border-oxford"
                    style={{ borderLeft: `6px solid ${m.color}` }}
                  >
                    <span>
                      <span className="block font-semibold">{s.name}</span>
                      <span className="block text-sm text-muted">
                        {s.tagline}
                      </span>
                    </span>
                    {practiced.includes(s.id) && (
                      <span className="text-green-700" aria-label="practiced">
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
