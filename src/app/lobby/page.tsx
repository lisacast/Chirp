"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { loadProfile, todaysMood, type Profile } from "@/lib/profile";

const SECTIONS = [
  {
    title: "Chat with Chirp",
    body: "Chirp is your guide as you practice emotional and communication skills through a private chat.",
    href: "/chat",
    cta: "Chat now",
    style: "btn-coral",
  },
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
    <Shell>
      <h1 className="text-3xl font-bold">
        {name ? `Hi ${name}! ` : ""}What can I do here?
      </h1>
      {mood ? (
        <p className="mt-1 text-ink/75">
          You&apos;re feeling <strong>{mood}</strong> today.{" "}
          <Link href="/mood" className="underline">
            Change
          </Link>
        </p>
      ) : (
        <p className="mt-1">
          <Link href="/mood" className="text-ink/75 underline">
            Check in with your mood
          </Link>
        </p>
      )}

      <div className="mt-5 space-y-6">
        {SECTIONS.map((s) => (
          <section key={s.href}>
            <h2 className="font-bold">{s.title}</h2>
            <p className="text-ink/85">{s.body}</p>
            <Link href={s.href} className={`btn ${s.style} mt-3`}>
              {s.cta}
            </Link>
          </section>
        ))}
      </div>

      {profile && profile.practiced.length > 0 && (
        <p className="mt-6 text-center text-sm text-ink/70">
          You&apos;ve practiced {profile.practiced.length} skill{profile.practiced.length === 1 ? "" : "s"} so far. Keep it up!
        </p>
      )}
    </Shell>
  );
}
