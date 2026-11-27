"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Shell from "@/components/Shell";
import { updateProfile } from "@/lib/profile";

// Mood check-in, from the "Icon selection" mockup.
const MOODS = [
  { emoji: "😄", label: "happy" },
  { emoji: "😌", label: "calm" },
  { emoji: "🥰", label: "loved" },
  { emoji: "😐", label: "meh" },
  { emoji: "😴", label: "tired" },
  { emoji: "😟", label: "worried" },
  { emoji: "😢", label: "sad" },
  { emoji: "😠", label: "angry" },
  { emoji: "😣", label: "stressed" },
  { emoji: "😳", label: "embarrassed" },
  { emoji: "😶", label: "numb" },
  { emoji: "🤯", label: "overwhelmed" },
];

export default function MoodPage() {
  const router = useRouter();
  const [mood, setMood] = useState<string | null>(null);

  function go(selected: string | null) {
    updateProfile({
      mood: selected ?? undefined,
      moodDate: selected ? new Date().toDateString() : undefined,
    });
    router.push("/lobby");
  }

  return (
    <Shell>
      <h1 className="text-2xl font-extrabold text-oxford sm:text-4xl">
        What&apos;s your mood today?
      </h1>
      <p className="mt-2 text-muted">
        Pick the one that feels most like you right now.
      </p>

      <div
        className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4"
        role="radiogroup"
        aria-label="Mood"
      >
        {MOODS.map((m) => (
          <button
            key={m.label}
            role="radio"
            aria-checked={mood === m.label}
            onClick={() => setMood(m.label)}
            className={`flex flex-col items-center rounded-xl border-2 bg-white py-3 transition ${
              mood === m.label
                ? "border-oxford bg-sun"
                : "border-line hover:border-oxford"
            }`}
          >
            <span className="text-4xl" aria-hidden>
              {m.emoji}
            </span>
            <span className="mt-1 text-sm font-medium capitalize">
              {m.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          className="btn btn-coral"
          disabled={!mood}
          onClick={() => go(mood)}
        >
          Use my mood
        </button>
        <button className="btn btn-outline" onClick={() => go(null)}>
          Skip for today
        </button>
      </div>
    </Shell>
  );
}
