"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { CardsIcon, ChevronIcon, LeafIcon, SunIcon } from "@/components/Icons";
import { loadProfile, todaysMood, type Profile } from "@/lib/profile";

const SECTIONS = [
  {
    title: "Skills library",
    body: "Flashcards for every skill, from Wise Mind to DEAR MAN.",
    href: "/skills",
    Icon: CardsIcon,
    tint: "bg-blue text-white",
  },
  {
    title: "Mindful exercises",
    body: "Three short guided exercises for grounding.",
    href: "/mindful",
    Icon: LeafIcon,
    tint: "bg-oxford text-white",
  },
  {
    title: "Joy finder",
    body: "A quick idea for something pleasant to do today.",
    href: "/joy",
    Icon: SunIcon,
    tint: "bg-sun text-oxford",
  },
];

export default function Lobby() {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => setProfile(loadProfile()), []);

  const mood = profile ? todaysMood(profile) : undefined;
  const name = profile?.nickname;
  const practiced = profile?.practiced.length ?? 0;

  return (
    <Shell width="wide">
      <section className="rounded-2xl bg-oxford p-5 text-white sm:p-8">
        <div className="md:flex md:items-end md:justify-between md:gap-8">
          <div className="md:flex-1">
            <h1 className="text-2xl font-extrabold sm:text-4xl">{name ? `Hi ${name}!` : "Welcome back!"}</h1>
            <p className="mt-1 text-white/90 sm:text-lg">What would you like to practice today?</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <Link href="/mood" className="rounded-full border border-white/50 px-3 py-1 font-bold hover:bg-white/10">
                {mood ? `Feeling ${mood} · Change` : "Check in with your mood"}
              </Link>
              {practiced > 0 && (
                <span className="rounded-full bg-sun px-3 py-1 font-bold text-oxford">
                  {practiced} skill{practiced === 1 ? "" : "s"} practiced
                </span>
              )}
            </div>
          </div>
          <Link href="/chat" className="btn btn-coral mt-5 md:mt-0 md:w-64 md:shrink-0">
            Chat with Chirp
          </Link>
        </div>
      </section>

      <h2 className="mt-7 text-sm font-extrabold uppercase tracking-wider text-muted">Practice</h2>
      <ul className="mt-2 grid gap-3 md:grid-cols-3">
        {SECTIONS.map(({ title, body, href, Icon, tint }) => (
          <li key={href}>
            <Link
              href={href}
              className="card flex h-full items-center gap-4 p-4 transition hover:border-oxford md:flex-col md:items-start md:p-5"
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tint}`}>
                <Icon className="h-6 w-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-extrabold text-oxford">{title}</span>
                <span className="mt-0.5 block text-sm text-muted">{body}</span>
              </span>
              <ChevronIcon className="h-5 w-5 shrink-0 text-oxford md:hidden" />
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/faq" className="card mt-3 flex items-center justify-between p-4 font-bold text-oxford hover:border-oxford">
        New here? Read how Chirp works
        <ChevronIcon className="h-5 w-5" />
      </Link>
    </Shell>
  );
}
