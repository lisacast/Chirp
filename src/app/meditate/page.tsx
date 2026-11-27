"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import Art from "@/components/Art";
import { ART, MEDITATION_ART } from "@/data/art";
import { PauseIcon, PlayIcon } from "@/components/Icons";
import { MEDITATIONS, getMeditation, type Meditation } from "@/data/meditations";
import { markListened } from "@/lib/profile";
import { track } from "@/lib/track";

const KINDS = ["All", "Calm", "Focus", "Hard moments", "Kindness", "Sleep"] as const;

export default function MeditatePage() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("All");
  const [current, setCurrent] = useState<Meditation | null>(null);

  useEffect(() => {
    const id = new URLSearchParams(location.search).get("play");
    const m = id ? getMeditation(id) : undefined;
    if (m) setCurrent(m);
  }, []);

  const list = MEDITATIONS.filter((m) => kind === "All" || m.kind === kind);

  return (
    <Shell width="wide">
      <PageHeader art={ART.meditate} kicker="Guided, at your pace" title="Meditate" />


      {current && <Player key={current.id} m={current} onClose={() => setCurrent(null)} />}

      <div className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1" role="tablist" aria-label="Filter">
        {KINDS.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={kind === k}
            onClick={() => setKind(k)}
            className={`shrink-0 rounded-full border-2 border-oxford px-4 py-1.5 text-sm font-bold ${kind === k ? "bg-oxford text-white" : "bg-white text-oxford hover:bg-sun"}`}
          >
            {k}
          </button>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <li key={m.id}>
            <button
              onClick={() => {
                setCurrent(m);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group relative block h-full w-full overflow-hidden rounded-2xl bg-oxford text-left text-white hover:shadow-lg"
            >
              <Art n={MEDITATION_ART[m.id]} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10] w-full transition group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-oxford via-oxford/40 to-transparent" />
              <span className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-sun text-oxford">
                <PlayIcon className="ml-0.5 h-6 w-6" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-4">
                <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">
                  {m.kind} · {m.minutes} min
                </span>
                <span className="block text-2xl font-bold">{m.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

function Player({ m, onClose }: { m: Meditation; onClose: () => void }) {
  const [step, setStep] = useState(-1);
  const [auto, setAuto] = useState(true);
  const [done, setDone] = useState(false);
  const total = m.steps.length;

  // Auto-advance: time to read the line, plus the quiet pause after it.
  useEffect(() => {
    if (!auto || step < 0 || done) return;
    const [text, pause] = m.steps[step];
    const ms = (Math.max(3, text.split(" ").length / 2.5) + pause) * 1000;
    const t = setTimeout(() => go(step + 1), ms);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, auto, done]);

  function go(i: number) {
    if (i === 0 && step < 0) {
      track("listen_start_all");
      track("listen_start", m.id);
    }
    if (i >= total) {
      setDone(true);
      markListened(m.id, m.skillId);
      track("listen_done_all");
      track("listen_done", m.id);
      return;
    }
    setStep(Math.max(0, i));
  }

  const pct = done ? 100 : step < 0 ? 0 : Math.round((step / total) * 100);

  return (
    <section aria-label={m.title} className="relative mb-8 overflow-hidden rounded-2xl bg-oxford text-white">
      <Art n={MEDITATION_ART[m.id]} priority className="absolute inset-0 h-full w-full opacity-30" />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">
              {m.kind} · about {m.minutes} min
            </p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{m.title}</h2>
          </div>
          <button onClick={onClose} className="rounded-lg border border-white/40 px-3 py-1.5 text-sm font-bold hover:bg-white/10">
            Close
          </button>
        </div>

        <p aria-live="polite" className="mt-6 min-h-[6rem] text-xl leading-relaxed text-white sm:text-2xl">
          {done ? "Well done. Take a moment before you move on." : step >= 0 ? m.steps[step][0] : m.blurb}
        </p>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/20" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-sun transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {step < 0 || done ? (
            <button onClick={() => { setDone(false); setStep(-1); go(0); }} className="btn btn-coral w-auto px-6">
              <PlayIcon className="h-5 w-5" /> {done ? "Start again" : "Begin"}
            </button>
          ) : (
            <>
              <button onClick={() => go(step - 1)} disabled={step === 0} className="rounded-xl border-2 border-white/40 px-4 py-2.5 font-bold disabled:opacity-40">
                ← Back
              </button>
              <button onClick={() => go(step + 1)} className="rounded-xl bg-sun px-5 py-2.5 font-extrabold text-oxford">
                Next →
              </button>
              <button onClick={() => setAuto((a) => !a)} className="ml-auto flex items-center gap-1.5 text-sm font-bold">
                {auto ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                {auto ? "Pause" : "Resume"}
              </button>
            </>
          )}
        </div>
        <p className="mt-4 text-sm text-white/80">
          {done ? "✓ Saved to your progress." : "Read each line slowly, then rest in the quiet. The next line appears on its own, or tap Next."}
        </p>
      </div>
    </section>
  );
}
