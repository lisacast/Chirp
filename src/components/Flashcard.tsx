"use client";

import { useEffect, useState } from "react";
import { getModule, type Skill } from "@/data/skills";
import { markPracticed } from "@/lib/profile";

interface Props {
  skill: Skill;
  onBack?: () => void;
  backLabel?: string;
  onNext?: () => void;
}

// Skill flashcard from the spec: name on the front, description on the back,
// tap to flip, with "← Chat" and "Next →" on the back.
export default function Flashcard({
  skill,
  onBack,
  backLabel = "← Chat",
  onNext,
}: Props) {
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const mod = getModule(skill.module);

  useEffect(() => {
    setFlipped(false);
    setDone(false);
  }, [skill.id]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flip h-[26rem] w-full">
        <div className={`flip-inner ${flipped ? "flipped" : ""}`}>
          <button
            type="button"
            onClick={() => setFlipped(true)}
            className="flip-face flex flex-col items-center justify-center rounded-3xl p-6 text-center text-white shadow-lg"
            style={{ background: mod.color }}
            aria-label={`${skill.name}. Tap to flip.`}
            aria-hidden={flipped}
            tabIndex={flipped ? -1 : 0}
          >
            <span className="text-sm font-semibold uppercase tracking-wider opacity-85">
              {mod.name}
            </span>
            <span className="mt-3 text-3xl font-bold leading-tight">
              {skill.name}
            </span>
            <span className="mt-4 text-lg opacity-95">
              &ldquo;{skill.tagline}&rdquo;
            </span>
            <span className="mt-8 rounded-full bg-white/25 px-4 py-1 text-sm">
              Tap to flip
            </span>
          </button>

          <div
            className="flip-face flip-back flex flex-col overflow-y-auto rounded-3xl bg-card p-5 shadow-lg"
            aria-hidden={!flipped}
          >
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="self-end text-sm font-semibold text-coral"
              tabIndex={flipped ? 0 : -1}
            >
              Flip back
            </button>
            <h3 className="text-xl font-bold" style={{ color: mod.color }}>
              {skill.name}
            </h3>
            <p className="mt-2">{skill.what}</p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[0.95rem]">
              {skill.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <button
              type="button"
              tabIndex={flipped ? 0 : -1}
              onClick={() => {
                markPracticed(skill.id);
                setDone(true);
              }}
              className={`mt-auto pt-4 text-sm font-semibold ${done ? "text-green-700" : "text-navy underline"}`}
            >
              {done
                ? "✓ Nice work! Saved to your practice list."
                : "I practiced this"}
            </button>
          </div>
        </div>
      </div>

      {(onBack || onNext) && (
        <div className="flex gap-3">
          {onBack && (
            <button type="button" onClick={onBack} className="btn btn-outline">
              {backLabel}
            </button>
          )}
          {onNext && (
            <button type="button" onClick={onNext} className="btn btn-coral">
              Next →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
