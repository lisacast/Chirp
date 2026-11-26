"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { loadProfile, todaysMood, type Profile } from "@/lib/profile";

const SECTIONS = [
  {
    title: "Skills library",
    body: "Flip through flashcards for every skill, from Wise Mind to DEAR MAN.",
    href: "/skills",
    cta: "Browse skills",
    style: "btn-coral",
  },
  {
    title: "Mindful exercises",
    body: "Three short guided exercises for grounding and centering.",
    href: "/mindful",
    cta: "Practice mindfulness",
    style: "btn-coral",
  },
  {
    title: "Joy finder",
    body: "Need a lift? Get a random idea for something pleasant to do today.",
    href: "/joy",
    cta: "Find a joyful activity",
    style: "btn-coral",
  },
  {
    title: "Frequently asked questions",
    body: "New here? Learn how Chirp works and what to expect.",
    href: "/faq",
    cta: "Review FAQ",
    style: "btn-outline",
  },
];

export default function Lobby() {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => setProfile(loadProfile()), []);

  const mood = profile ? todaysMood(profile) : undefined;
  const name = profile?.nickname;

  return (
    <Shell width="wide">
      <section className="grid items-center gap-6 rounded-3xl bg-white/70 p-6 shadow-sm sm:p-8 md:grid-cols-[1fr_auto]">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold text-navy sm:text-4xl">
            {name ? `Hi ${name}!` : "Welcome back!"}
          </h1>
          <p className="mt-2 text-lg text-ink/80">
            What would you like to practice today?
          </p>
          {mood ? (
            <p className="mt-3 text-ink/75">
              You&apos;re feeling <strong>{mood}</strong> today.{" "}
              <Link href="/mood" className="underline">
                Change
              </Link>
            </p>
          ) : (
            <Link
              href="/mood"
              className="mt-3 mr-3 inline-block font-semibold text-navy underline"
            >
              Check in with your mood
            </Link>
          )}
          {profile && profile.practiced.length > 0 && (
            <p className="mt-3 inline-block rounded-full bg-sun/70 px-3 py-1 text-sm font-semibold">
              {profile.practiced.length} skill
              {profile.practiced.length === 1 ? "" : "s"} practiced. Keep it up!
            </p>
          )}
        </div>
        <Link href="/chat" className="btn btn-coral md:w-56">
          Chat with Chirp
        </Link>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SECTIONS.map((s) => (
          <section
            key={s.href}
            className="flex flex-col rounded-3xl bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-navy">{s.title}</h2>
            <p className="mt-1 flex-1 text-ink/80">{s.body}</p>
            <Link href={s.href} className={`btn ${s.style} mt-5`}>
              {s.cta}
            </Link>
          </section>
        ))}
      </div>
    </Shell>
  );
}
