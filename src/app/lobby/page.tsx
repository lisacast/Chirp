"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { ChevronIcon, LeafIcon, SendIcon } from "@/components/Icons";
import Art from "@/components/Art";
import { gradientCss, MODULE_THEME, moduleTheme, articleTheme, THEMES, MEDITATION_PHOTO, photoSrc, pickPhoto, type ThemeKey } from "@/data/art";
import { REFLECTIONS } from "@/data/reflections";
import ToolPlayer from "@/components/ToolPlayer";
import ToolCard from "@/components/ToolCard";
import { getTool, TOOLS } from "@/data/tools";
import type { ModuleId } from "@/data/skills";
import { dayKey, loadProfile, streak, todaysMood, type Profile } from "@/lib/profile";
import { ARTICLES, readMinutes } from "@/data/articles";
import { MEDITATIONS } from "@/data/meditations";
import { getSkill, MODULES } from "@/data/skills";
import { BINGO_SKILLS } from "@/data/bingo";

// Skill suggestion for today's mood.
const FOR_MOOD: Record<string, string> = {
  happy: "positive-events",
  calm: "wise-mind",
  loved: "give",
  meh: "participate",
  tired: "please",
  worried: "observe",
  sad: "self-soothe",
  angry: "opposite-action-er",
  stressed: "improve",
  embarrassed: "non-judgmental",
  numb: "self-soothe",
  overwhelmed: "accepts",
};

const ROWS: { module: ModuleId; title: string }[] = [
  { module: "distress-tolerance", title: "Calm down fast" },
  { module: "mindfulness", title: "Steady your mind" },
  { module: "emotion-regulation", title: "Work with feelings" },
  { module: "interpersonal", title: "With other people" },
];
const BREATHS = ["calm-breath", "box-breath", "ocean-breath", "double-sigh", "relax-478", "wise-mind-breath", "triangle-breath"];
const rotate = <T,>(a: T[], n: number) => (a.length ? [...a.slice(n % a.length), ...a.slice(0, n % a.length)] : a);

const CHIPS = [
  "I'm stressed and can't switch off",
  "Help me calm down right now",
  "I had a fight with a friend",
  "I did something I regret",
  "Help me plan a hard conversation",
];

const dayIndex = () => Math.floor(Date.now() / 86400000);

export default function Today() {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => setProfile(loadProfile()), []);

  const mood = profile ? todaysMood(profile) : undefined;
  const name = profile?.nickname;
  const practicedOnCard = BINGO_SKILLS.filter((id) => profile?.practiced.includes(id)).length + 1;
  const days = profile ? streak(profile) : 0;
  const d = dayIndex();
  const reflection = REFLECTIONS[d % REFLECTIONS.length];
  const reflTool = getTool(reflection.tool);
  const unread = ARTICLES.filter((a) => !profile?.read?.includes(a.slug));
  const reads = rotate(unread.length >= 4 ? unread : ARTICLES, d * 3).slice(0, 4);
  const meds = rotate(MEDITATIONS, d).slice(0, 3);
  const chain = getTool("chain-analysis")!;
  const week = Array.from({ length: 7 }, (_, i) => {
    const dt = new Date();
    dt.setDate(dt.getDate() - (6 - i));
    const k = dayKey(dt);
    return { k, label: dt.toLocaleDateString(undefined, { weekday: "narrow" }), on: !!profile?.activeDays?.includes(k), today: i === 6 };
  });
  const stats = [
    { n: days, label: days === 1 ? "day streak" : "day streak", href: "/progress" },
    { n: profile?.practiced.length ?? 0, label: "skills practiced", href: "/skills" },
    { n: profile?.listened?.length ?? 0, label: "meditations", href: "/meditate" },
    { n: profile?.read?.length ?? 0, label: "articles read", href: "/learn" },
  ];
  const skill = getSkill(mood ? FOR_MOOD[mood] ?? "wise-mind" : ["wise-mind", "self-soothe", "dear-man", "radical-acceptance", "please", "observe", "opposite-action-er"][d % 7])!;
  const breathTool = getTool(BREATHS[d % BREATHS.length])!;
  const mod = MODULES.find((m) => m.id === skill.module)!;
  const skillTheme = MODULE_THEME[skill.module] ?? "learn";
  const date = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  return (
    <Shell width="wide">
      {/* Greeting + ask */}
      <section className="relative overflow-hidden rounded-2xl bg-oxford text-white">
        <Art theme="today" seed={String(d)} priority className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-oxford/70 via-oxford/55 to-oxford/90" />
        <div className="relative p-4 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">{date}</p>
            <Link href="/mood" className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur hover:bg-white/25">
              {mood ? `Feeling ${mood} · Change` : "How are you feeling?"}
            </Link>
          </div>
          <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
            Hi{name ? ` ${name}` : ""}, how can I help today?
          </h1>
          <Link href="/chat" className="mt-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-ink ring-4 ring-sun/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/chirp-bird.png" alt="" width={28} height={28} className="h-7 w-7 bird-idle" />
            <span className="flex-1 text-muted">Ask Chirp anything…</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sun text-oxford">
              <SendIcon className="h-4 w-4" />
            </span>
          </Link>
          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {CHIPS.map((c) => (
              <Link key={c} href={`/chat?q=${encodeURIComponent(c)}`} className="shrink-0 rounded-full border border-white/40 bg-white/10 px-3 py-1.5 text-sm font-semibold backdrop-blur hover:bg-white/20">
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + week */}
      <section className="mt-3 grid gap-2 lg:grid-cols-[2fr_1fr]">
        <div className="grid grid-cols-4 gap-2">
          {stats.map((t) => (
            <Link key={t.label} href={t.href} className="card px-2 py-2.5 text-center hover:border-oxford">
              <span className="block text-2xl font-extrabold leading-none text-oxford">{t.n}</span>
              <span className="mt-1 block text-[11px] font-bold leading-tight text-muted">{t.label}</span>
            </Link>
          ))}
        </div>
        <Link href="/progress" className="card flex items-center justify-between gap-2 px-3 py-2.5 hover:border-oxford">
          <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted">This week</span>
          <span className="flex gap-1.5">
            {week.map((w) => (
              <span key={w.k} className="flex flex-col items-center gap-0.5">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-extrabold ${w.on ? "bg-sun text-oxford" : w.today ? "border-2 border-oxford text-oxford" : "bg-paper text-muted"}`}>
                  {w.on ? "✓" : w.label}
                </span>
              </span>
            ))}
          </span>
          <span className="text-xs font-bold text-oxford">Bingo {practicedOnCard}/25</span>
        </Link>
      </section>

      {/* Tools */}
      <section className="mt-5">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl font-bold text-oxford">Tools</h2>
          <Link href="/tools" className="text-sm font-extrabold text-red hover:underline">
            See all {TOOLS.length} ›
          </Link>
        </div>
        <div className="mt-2 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="min-w-0 space-y-3">
            <div>
              <p className="kicker !text-oxford">Breathe now</p>
              <div className="mt-1.5">
                <ToolPlayer tool={breathTool} />
              </div>
            </div>
            <Link href={`/tools/${chain.id}`} className="group relative flex items-center gap-3 overflow-hidden rounded-2xl p-4 text-white" style={{ background: THEMES.emotion.stops[0] }}>
              <Art theme="emotion" seed="chain" scrim className="absolute inset-0 h-full w-full opacity-60" sizes="600px" />
              <span className="relative flex-1">
                <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">New · Guided worksheet</span>
                <span className="block text-xl font-bold">Chain analysis</span>
                <span className="block text-sm text-white/90">Something went wrong? Trace it link by link and find where a skill could change the ending.</span>
              </span>
              <ChevronIcon className="relative h-6 w-6 shrink-0" />
            </Link>
          </div>
          <div className="min-w-0 space-y-4">
            {ROWS.map((r) => (
              <div key={r.module}>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em]" style={{ color: moduleTheme(r.module).solid }}>
                  {r.title}
                </p>
                <div className="-mx-4 mt-1.5 flex snap-x gap-2.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0">
                  {rotate(TOOLS.filter((x) => x.module === r.module && x.id !== breathTool.id && x.id !== chain.id), d).slice(0, 8).map((x) => (
                    <ToolCard key={x.id} tool={x} wide />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { href: "/help", label: "I need help right now", theme: "help" as ThemeKey },
            { href: "/joy", label: "Joy finder", theme: "joy" as ThemeKey },
          ].map((q) => (
            <Link key={q.href} href={q.href} className="rounded-xl px-3 py-3 text-center text-sm font-extrabold text-white" style={{ background: gradientCss(q.theme, q.label) }}>
              {q.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Reflection + practice */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <section className="rounded-2xl bg-sun p-5 text-oxford sm:p-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em]">Something to sit with</p>
          <p className="mt-2 text-lg font-semibold leading-snug sm:text-xl">{reflection.text}</p>
          {reflTool && (
            <Link href={`/tools/${reflTool.id}`} className="mt-4 inline-flex items-center gap-1 rounded-full bg-oxford px-4 py-2 text-sm font-extrabold text-white">
              Try it: {reflTool.name} <ChevronIcon className="h-4 w-4" />
            </Link>
          )}

        </section>

        <section className="overflow-hidden rounded-2xl text-white" style={{ background: THEMES[skillTheme].stops[0] }}>
          <Art theme={skillTheme} seed={skill.id} className="aspect-[16/6] w-full" sizes="600px" />
          <div className="p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">
              {mood ? `For feeling ${mood}` : "Today's skill"} · {mod.name}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold leading-tight">{skill.name}</h2>
            <p className="mt-1 text-white/90">{skill.tagline}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link href={`/skills/${skill.id}`} className="btn btn-coral !py-2.5 text-sm">
                Open the card
              </Link>
              <Link href={`/learn/skill-${skill.id}`} className="btn border-2 border-white !py-2.5 text-sm text-white hover:bg-white/10">
                Read the guide
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Read + Meditate lists */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section>
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold text-oxford">Keep reading</h2>
            <Link href="/learn" className="text-sm font-extrabold text-red hover:underline">
              All articles ›
            </Link>
          </div>
          <ul className="mt-2 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {reads.map((a) => {
              const th = articleTheme(a);
              return (
                <li key={a.slug}>
                  <Link href={`/learn/${a.slug}`} className="flex items-center gap-3 p-2.5 hover:bg-paper">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photoSrc(pickPhoto(th, a.slug), true)} alt="" loading="lazy" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] font-extrabold uppercase tracking-[0.1em]" style={{ color: THEMES[th].solid }}>
                        {a.section} · {readMinutes(a)} min
                      </span>
                      <span className="line-clamp-2 block font-bold leading-snug text-ink">{a.title}</span>
                    </span>
                    <ChevronIcon className="h-5 w-5 shrink-0 text-muted" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold text-oxford">Meditate</h2>
            <Link href="/meditate" className="text-sm font-extrabold text-red hover:underline">
              All meditations ›
            </Link>
          </div>
          <ul className="mt-2 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {meds.map((m) => (
              <li key={m.id}>
                <Link href={`/meditate?play=${m.id}`} className="flex items-center gap-3 p-2.5 hover:bg-paper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoSrc(MEDITATION_PHOTO[m.id] ?? 1, true)} alt="" loading="lazy" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#4C3FB0]">{m.minutes} min</span>
                    <span className="block font-bold leading-snug text-ink">{m.title}</span>
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sun text-oxford">
                    <LeafIcon className="h-5 w-5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {[
          ["/practice", "Tips & practices"],
          ["/mindful", "Timed mindful exercises"],
          ["/learn/chirp-meets-you-where-you-are", "How Chirp works"],
        ].map(([href, label]) => (
          <Link key={href} href={href} className="card flex items-center justify-between px-4 py-3 font-bold text-oxford hover:border-oxford">
            {label} <ChevronIcon className="h-5 w-5" />
          </Link>
        ))}
      </div>
    </Shell>
  );
}
