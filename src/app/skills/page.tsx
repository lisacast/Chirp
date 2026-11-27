"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import Art from "@/components/Art";
import { ART, MODULE_ART } from "@/data/art";
import { MODULES, SKILLS } from "@/data/skills";
import { loadProfile } from "@/lib/profile";

export default function SkillsPage() {
  const [practiced, setPracticed] = useState<string[]>([]);
  useEffect(() => setPracticed(loadProfile().practiced), []);

  return (
    <Shell width="wide">
      <PageHeader art={ART.skills} kicker="Flashcards" title="Skills library">
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
        {MODULES.map((m) => {
          const pool = MODULE_ART[m.id];
          return (
            <section key={m.id}>
              <div className="flex items-center gap-3">
                <span className="h-8 w-2 rounded-full" style={{ background: m.color }} />
                <h2 className="text-2xl font-bold text-oxford sm:text-3xl">{m.name}</h2>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {SKILLS.filter((s) => s.module === m.id).map((s, i) => (
                  <li key={s.id}>
                    <Link href={`/skills/${s.id}`} className="card group relative block h-full overflow-hidden hover:border-oxford hover:shadow-md">
                      <span className="relative block">
                        <Art n={pool[i % pool.length]} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/3] w-full transition group-hover:scale-105" />
                        <span className="absolute inset-x-0 bottom-0 h-1.5" style={{ background: m.color }} />
                        {practiced.includes(s.id) && (
                          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-sun text-sm font-extrabold text-oxford" aria-label="practiced">
                            ✓
                          </span>
                        )}
                      </span>
                      <span className="block p-3 font-bold leading-snug text-oxford">{s.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Shell>
  );
}
