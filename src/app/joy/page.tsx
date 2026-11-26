"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Shell from "@/components/Shell";
import activities from "@/data/joyous-activities.json";

// "1000 Joyous Activities" list, used for the Increase Positive Emotions skill.
const LIST = activities as string[];

export default function JoyPage() {
  const [idx, setIdx] = useState<number | null>(null);
  useEffect(() => setIdx(Math.floor(Math.random() * LIST.length)), []);

  function another() {
    if (LIST.length < 2) return;
    let n = idx ?? 0;
    while (n === idx) n = Math.floor(Math.random() * LIST.length);
    setIdx(n);
  }

  return (
    <Shell>
      <h1 className="text-3xl font-bold text-navy sm:text-4xl">Joy finder</h1>
      <p className="mt-1 text-ink/80">
        Small pleasant moments add up. Here&apos;s an idea for today:
      </p>
      <div
        className="mt-6 flex min-h-56 items-center justify-center rounded-3xl bg-sun p-8 text-center text-2xl sm:text-3xl font-bold shadow-sm"
        aria-live="polite"
      >
        {idx !== null ? LIST[idx] : ""}
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button className="btn btn-coral" onClick={another}>
          Show me another
        </button>
        <Link className="btn btn-outline" href="/skills/positive-events">
          Why this helps
        </Link>
      </div>
    </Shell>
  );
}
