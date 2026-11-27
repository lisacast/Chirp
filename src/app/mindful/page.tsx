"use client";

import { useEffect, useRef, useState } from "react";
import Shell from "@/components/Shell";

// The three exercises from the "Mindful Exercises" mockup. The mockup shows
// videos; until those are recorded, each is a guided, timed walkthrough.
const EXERCISES = [
  {
    id: "distraction",
    title: "2-Minute Distraction",
    intro: "Give your mind a short break from a big feeling.",
    seconds: 120,
    steps: [
      "Name five things you can see that are blue.",
      "Count backward from 50 by threes.",
      "Think of an animal for every letter from A to J.",
      "Hum or quietly sing the chorus of a favorite song.",
      "Notice: is the feeling a little smaller now?",
    ],
  },
  {
    id: "grounding",
    title: "3-Minute Grounding",
    intro: "Use your five senses to come back to right now.",
    seconds: 180,
    steps: [
      "Notice 5 things you can see.",
      "Notice 4 things you can feel, like your feet on the floor.",
      "Notice 3 things you can hear.",
      "Notice 2 things you can smell.",
      "Notice 1 thing you can taste.",
      "Take one slow breath. You are here, right now.",
    ],
  },
  {
    id: "wise-mind",
    title: "5-Minute Wise Mind",
    intro: "Find the calm place where feeling and thinking meet.",
    seconds: 300,
    steps: [
      "Sit comfortably and let your eyes soften or close.",
      "Breathe in slowly for 4, hold for 4, out for 4, hold for 4.",
      "Imagine dropping a pebble into a calm lake and watching it drift down.",
      'As you breathe in, silently say "Wise." As you breathe out, say "Mind."',
      "Ask: what does my Wise Mind know right now? Just listen.",
      "Before you finish, thank yourself for taking this time.",
    ],
  },
];

function fmt(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function MindfulPage() {
  const [active, setActive] = useState<string | null>(null);
  const [left, setLeft] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const ex = EXERCISES.find((e) => e.id === active);

  useEffect(() => {
    if (!ex) return;
    setLeft(ex.seconds);
    timer.current = setInterval(
      () => setLeft((l) => (l > 0 ? l - 1 : 0)),
      1000,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [ex]);

  if (ex) {
    const elapsed = ex.seconds - left;
    const stepIdx = Math.min(
      ex.steps.length - 1,
      Math.floor((elapsed / ex.seconds) * ex.steps.length),
    );
    const finished = left === 0;
    return (
      <Shell>
        <h1 className="display text-center text-4xl sm:text-5xl">
          {ex.title}
        </h1>
        <div className="mt-6 flex flex-col items-center">
          <div className="relative flex h-56 w-56 sm:h-72 sm:w-72 items-center justify-center">
            <div className="breathe absolute inset-0 rounded-full bg-sun/60" />
            <span className="relative text-4xl font-bold tabular-nums">
              {fmt(left)}
            </span>
          </div>
          <p
            className="mt-6 min-h-[4.5rem] w-full max-w-lg card px-5 py-4 text-center text-lg"
            aria-live="polite"
          >
            {finished
              ? "All done. Nice work taking care of yourself!"
              : ex.steps[stepIdx]}
          </p>
          <p className="mt-2 text-sm text-muted">
            Step {Math.min(stepIdx + 1, ex.steps.length)} of {ex.steps.length}
          </p>
        </div>
        <button
          className="btn btn-outline mx-auto mt-8 max-w-sm"
          onClick={() => setActive(null)}
        >
          {finished ? "Back to exercises" : "Stop"}
        </button>
      </Shell>
    );
  }

  return (
    <Shell width="wide">
      <h1 className="display text-[2.25rem] sm:text-6xl">
        Mindful exercises
      </h1>
      <p className="mt-1 text-muted">
        Short guided exercises for grounding and centering. Pick one and follow
        along.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {EXERCISES.map((e) => (
          <section
            key={e.id}
            className="flex flex-col card p-5"
          >
            <h2 className="text-lg font-extrabold text-oxford">{e.title}</h2>
            <p className="mt-1 flex-1 text-muted">{e.intro}</p>
            <button
              className="btn btn-coral mt-5"
              onClick={() => setActive(e.id)}
            >
              ▶ Start
            </button>
          </section>
        ))}
      </div>
    </Shell>
  );
}
