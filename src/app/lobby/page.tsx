"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { ChevronIcon, GridIcon, LeafIcon, SunIcon, WindIcon } from "@/components/Icons";
import Art from "@/components/Art";
import { gradientCss, MODULE_THEME, SECTION_THEME, THEMES, type ThemeKey } from "@/data/art";
import { loadProfile, streak, todaysMood, type Profile } from "@/lib/profile";
import { ARTICLES, readMinutes } from "@/data/articles";
import { MEDITATIONS } from "@/data/meditations";
import { getSkill, MODULES } from "@/data/skills";
import { BINGO_SKILLS } from "@/data/bingo";
import quotes from "@/data/quotes.json";

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

const dayIndex = () => Math.floor(Date.now() / 86400000);

export default function Today() {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => setProfile(loadProfile()), []);

  const mood = profile ? todaysMood(profile) : undefined;
  const name = profile?.nickname;
  const practicedOnCard = BINGO_SKILLS.filter((id) => profile?.practiced.includes(id)).length + 1;
  const days = profile ? streak(profile) : 0;
  const d = dayIndex();
  const quote = (quotes as string[])[d % quotes.length];
  const [qText, qBy] = quote.split(" - ");
  const article = ARTICLES[d % ARTICLES.length];
  const med = MEDITATIONS[d % MEDITATIONS.length];
  const skill = getSkill(mood ? FOR_MOOD[mood] ?? "wise-mind" : ["wise-mind", "self-soothe", "dear-man", "radical-acceptance", "please", "observe", "opposite-action-er"][d % 7])!;
  const mod = MODULES.find((m) => m.id === skill.module)!;
  const skillTheme = MODULE_THEME[skill.module] ?? "learn";
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const date = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  return (
    <Shell width="wide">
      {/* Masthead */}
      <section className="relative overflow-hidden rounded-2xl bg-oxford text-white">
        <Art theme="today" seed={String(d)} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-oxford/85 via-oxford/30 to-transparent" />
        <div className="relative flex min-h-48 flex-col justify-end p-5 sm:min-h-64 sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">{date}</p>
          <h1 className="mt-1 text-3xl font-bold leading-tight sm:text-4xl">
            {greet}
            {name ? `, ${name}` : ""}.
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <Link href="/mood" className="rounded-full bg-white px-3 py-1 font-bold text-oxford hover:bg-sun">
              {mood ? `Feeling ${mood} · Change` : "How are you feeling?"}
            </Link>
            {days > 0 && (
              <span className="rounded-full bg-sun px-3 py-1 font-bold text-oxford">
                🔥 {days}-day streak
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* Lead story: today's practice */}
        <section className="overflow-hidden rounded-2xl text-white" style={{ background: THEMES[skillTheme].stops[0] }}>
          <Art theme={skillTheme} seed={skill.id} className="aspect-[16/7] w-full" />
          <div className="p-6 sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">
              {mood ? `For feeling ${mood}` : "Today's practice"} · {mod.name}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl">{skill.name}</h2>
            <p className="mt-2 text-lg text-white/90">{skill.tagline}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href={`/skills/${skill.id}`} className="btn btn-coral">
                Open the card
              </Link>
              <Link href="/chat" className="btn border-2 border-white text-white hover:bg-white/10">
                Talk it through with Chirp
              </Link>
            </div>
          </div>
        </section>

        {/* Quote of the day */}
        <section className="flex flex-col justify-between rounded-2xl bg-sun p-6 text-oxford sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em]">Thought for today</p>
          <blockquote className="mt-3 text-xl font-semibold leading-snug sm:text-2xl">
            &ldquo;{qText}&rdquo;
          </blockquote>
          {qBy && <p className="mt-3 text-sm font-bold">{qBy}</p>}
        </section>
      </div>

      {/* Quick tools */}
      <h2 className="kicker mt-9 !text-oxford">Quick tools</h2>
      <ul className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { href: "/practice#breathe", label: "Breathe", sub: "1-minute pacer", Icon: WindIcon, tint: "mindfulness" },
          { href: "/help", label: "Right now", sub: "Help for this moment", Icon: LeafIcon, tint: "help" },
          { href: "/joy", label: "Joy finder", sub: "A small good thing", Icon: SunIcon, tint: "joy" },
          { href: "/progress", label: "Skills bingo", sub: `${practicedOnCard} of 25 squares`, Icon: GridIcon, tint: "progress" },
        ].map(({ href, label, sub, Icon, tint }) => (
          <li key={href}>
            <Link href={href} className="card flex h-full flex-col gap-3 p-4 transition hover:border-oxford hover:shadow-md">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ background: gradientCss(tint as ThemeKey, label) }}>
                <Icon className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-extrabold text-oxford">{label}</span>
                <span className="block text-sm text-muted">{sub}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Meditate + Read */}
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        <Link href={`/meditate?play=${med.id}`} className="group relative block overflow-hidden rounded-2xl text-white hover:shadow-lg">
          <Art theme="meditate" seed={med.id} scrim className="aspect-[16/9] w-full transition group-hover:scale-105" />
          <span className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-sun text-oxford">
            <LeafIcon className="h-6 w-6" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-5">
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">Meditate · {med.minutes} min</span>
            <span className="block text-2xl font-bold">{med.title}</span>
          </span>
        </Link>
        <Link href={`/learn/${article.slug}`} className="group relative block overflow-hidden rounded-2xl text-white hover:shadow-lg">
          <Art theme={SECTION_THEME[article.section] ?? "learn"} seed={article.slug} scrim className="aspect-[16/9] w-full transition group-hover:scale-105" />
          <span className="absolute inset-x-0 bottom-0 p-5">
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">
              Read · {readMinutes(article)} min
            </span>
            <span className="block text-2xl font-bold leading-tight">{article.title}</span>
          </span>
        </Link>
      </div>

      <div className="mt-9 grid gap-3 sm:grid-cols-3">
        <Link href="/practice" className="card flex items-center justify-between p-4 font-bold text-oxford hover:border-oxford">
          Tips &amp; practices <ChevronIcon className="h-5 w-5" />
        </Link>
        <Link href="/mindful" className="card flex items-center justify-between p-4 font-bold text-oxford hover:border-oxford">
          Timed mindful exercises <ChevronIcon className="h-5 w-5" />
        </Link>
        <Link href="/faq" className="card flex items-center justify-between p-4 font-bold text-oxford hover:border-oxford">
          How Chirp works <ChevronIcon className="h-5 w-5" />
        </Link>
      </div>
    </Shell>
  );
}
