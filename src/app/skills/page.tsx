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
    <Shell>
      <h1 className="text-3xl font-bold">Skills library</h1>
      <p className="mt-1 text-ink/80">Tap a skill to open its flashcard.</p>

      <div className="mt-5 space-y-6">
        {MODULES.map((m) => (
          <section key={m.id}>
            <h2 className="text-xl font-bold" style={{ color: m.color }}>
              {m.name}
            </h2>
            <p className="text-sm text-ink/75">{m.tagline}</p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SKILLS.filter((s) => s.module === m.id).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/skills/${s.id}`}
                    className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm hover:shadow"
                    style={{ borderLeft: `6px solid ${m.color}` }}
                  >
                    <span className="font-semibold">{s.name}</span>
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
