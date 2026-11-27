"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import { ART } from "@/data/art";
import { ChevronIcon, LeafIcon, SunIcon } from "@/components/Icons";
import { TIP_GROUPS } from "@/data/tips";
import { getSkill } from "@/data/skills";
import { markActive } from "@/lib/profile";
import { track } from "@/lib/track";

const PATTERNS = [
  { id: "calm", name: "Calm", desc: "In 4 · Out 6", phases: [["Breathe in", 4], ["Breathe out", 6]] },
  { id: "box", name: "Box", desc: "In 4 · Hold 4 · Out 4 · Hold 4", phases: [["Breathe in", 4], ["Hold", 4], ["Breathe out", 4], ["Hold", 4]] },
  { id: "478", name: "Relax", desc: "In 4 · Hold 7 · Out 8", phases: [["Breathe in", 4], ["Hold", 7], ["Breathe out", 8]] },
] as const;

export default function PracticePage() {
  return (
    <Shell width="wide">
      <PageHeader art={ART.practice} kicker="Tools" title="Tips & practices" />
      <Breathe />

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/mindful" className="card flex items-center gap-4 p-5 hover:border-oxford">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-oxford text-white">
            <LeafIcon />
          </span>
          <span className="flex-1">
            <span className="block text-lg font-bold text-oxford">Timed mindful exercises</span>
            <span className="text-sm text-muted">2-minute distraction, 3-minute grounding, 5-minute Wise Mind</span>
          </span>
          <ChevronIcon />
        </Link>
        <Link href="/joy" className="card flex items-center gap-4 p-5 hover:border-oxford">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sun text-oxford">
            <SunIcon />
          </span>
          <span className="flex-1">
            <span className="block text-lg font-bold text-oxford">Joy finder</span>
            <span className="text-sm text-muted">Hundreds of ideas for something pleasant to do today</span>
          </span>
          <ChevronIcon />
        </Link>
      </div>

      {TIP_GROUPS.map((g) => (
        <section key={g.name} className="mt-12">
          <h2 className="display border-t-4 border-oxford pt-3 text-3xl sm:text-4xl">{g.name}</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.tips.map((t, i) => {
              const s = t.skillId ? getSkill(t.skillId) : undefined;
              return (
                <li key={t.title} className="card flex flex-col p-5">
                  <span className="text-2xl font-bold text-red">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-1 font-extrabold text-oxford">{t.title}</span>
                  <span className="mt-1 flex-1 text-[0.95rem] text-ink">{t.body}</span>
                  {s && (
                    <Link href={`/skills/${s.id}`} className="mt-3 text-sm font-bold text-blue underline">
                      Skill: {s.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </Shell>
  );
}

function Breathe() {
  const [pat, setPat] = useState<(typeof PATTERNS)[number]>(PATTERNS[0]);
  const [mins, setMins] = useState(1);
  const [on, setOn] = useState(false);
  const [phase, setPhase] = useState(0);
  const [left, setLeft] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endAt = useRef(0);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function stop() {
    if (timer.current) clearTimeout(timer.current);
    setOn(false);
  }

  function start() {
    setOn(true);
    track("practice", `breathe_${pat.id}`);
    endAt.current = Date.now() + mins * 60000;
    let i = 0;
    const next = () => {
      if (Date.now() >= endAt.current) {
        setOn(false);
        markActive();
        return;
      }
      setPhase(i);
      setLeft(Math.ceil((endAt.current - Date.now()) / 1000));
      timer.current = setTimeout(next, (pat.phases[i][1] as number) * 1000);
      i = (i + 1) % pat.phases.length;
    };
    next();
  }

  const [label, secs] = pat.phases[phase] ?? pat.phases[0];
  const big = on && (label === "Breathe in" || (label === "Hold" && phase === 1));
  const scale = !on ? 0.7 : label === "Breathe in" ? 1 : label === "Breathe out" ? 0.55 : big ? 1 : 0.55;

  return (
    <section id="breathe" className="scroll-mt-20 overflow-hidden rounded-2xl bg-oxford text-white">
      <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">Breathing pacer</p>
          <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Breathe with the circle</h2>
          <p className="mt-2 text-white/90">Slow breathing, especially a long out-breath, tells your body it&apos;s safe. Follow the circle as it grows and shrinks.</p>
          <div className="mt-5 flex flex-wrap gap-2" role="radiogroup" aria-label="Pattern">
            {PATTERNS.map((p) => (
              <button
                key={p.id}
                role="radio"
                aria-checked={pat.id === p.id}
                disabled={on}
                onClick={() => setPat(p)}
                className={`rounded-xl border-2 px-3 py-2 text-left text-sm ${pat.id === p.id ? "border-sun bg-sun text-oxford" : "border-white/40 hover:bg-white/10"}`}
              >
                <span className="block font-extrabold">{p.name}</span>
                <span className="block text-xs">{p.desc}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold">
            Length
            {[1, 3, 5].map((m) => (
              <button
                key={m}
                disabled={on}
                onClick={() => setMins(m)}
                aria-pressed={mins === m}
                className={`rounded-full px-3 py-1 ${mins === m ? "bg-white text-oxford" : "border border-white/40"}`}
              >
                {m} min
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative flex h-64 w-64 items-center justify-center">
            <div
              className="absolute inset-0 rounded-full bg-sun"
              style={{ transform: `scale(${scale})`, transition: `transform ${on ? secs : 0.5}s ease-in-out` }}
            />
            <div className="relative text-center text-oxford">
              <p aria-live="polite" className="text-2xl font-bold">
                {on ? label : "Ready"}
              </p>
              {on && <p className="text-sm font-bold">{Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")} left</p>}
            </div>
          </div>
          <button onClick={on ? stop : start} className="btn btn-coral mt-4 max-w-xs">
            {on ? "Stop" : "Start breathing"}
          </button>
        </div>
      </div>
    </section>
  );
}
