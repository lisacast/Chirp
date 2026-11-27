"use client";

import { useEffect, useRef, useState } from "react";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import { HeadphonesIcon, PauseIcon, PlayIcon } from "@/components/Icons";
import { MEDITATIONS, getMeditation, type Meditation } from "@/data/meditations";
import { markListened } from "@/lib/profile";
import { say, speechSupported, startAmbient, stopSpeech } from "@/lib/speech";
import { track } from "@/lib/track";

type Ambient = "none" | "ocean" | "hum";
const KINDS = ["All", "Calm", "Focus", "Hard moments", "Kindness", "Sleep"] as const;

export default function ListenPage() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("All");
  const [current, setCurrent] = useState<Meditation | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(speechSupported());
    const id = new URLSearchParams(location.search).get("play");
    const m = id ? getMeditation(id) : undefined;
    if (m) setCurrent(m);
  }, []);

  const list = MEDITATIONS.filter((m) => kind === "All" || m.kind === kind);

  return (
    <Shell width="wide">
      <PageHeader kicker="Guided audio" title="Listen" dek="Short guided meditations, read aloud by your device. Put on headphones, press play, and follow along." />

      {!supported && (
        <p className="mb-6 rounded-2xl border-2 border-red bg-white p-4 text-sm">
          This browser can&apos;t read aloud. You can still follow each meditation by reading the words on screen.
        </p>
      )}

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
              className="card flex h-full w-full flex-col overflow-hidden text-left hover:border-oxford hover:shadow-md"
            >
              <span className="flex h-28 items-end justify-between p-4 text-white" style={{ background: m.color }}>
                <span className="text-xs font-extrabold uppercase tracking-[0.14em]">{m.kind}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95" style={{ color: m.color }}>
                  <PlayIcon className="h-6 w-6" />
                </span>
              </span>
              <span className="p-4">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-2xl font-extrabold text-oxford">{m.title}</span>
                  <span className="shrink-0 text-sm font-bold text-muted">{m.minutes} min</span>
                </span>
                <span className="mt-1 block text-sm text-muted">{m.blurb}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

function Player({ m, onClose }: { m: Meditation; onClose: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);
  const [ambient, setAmbient] = useState<Ambient>("ocean");
  const run = useRef(0);
  const stopAmb = useRef<(() => void) | null>(null);

  const total = m.steps.length;

  useEffect(
    () => () => {
      run.current++;
      stopSpeech();
      stopAmb.current?.();
    },
    [],
  );

  function wait(sec: number, id: number) {
    return new Promise<void>((res) => {
      const t0 = Date.now();
      const tick = () => (run.current !== id || Date.now() - t0 >= sec * 1000 ? res() : setTimeout(tick, 200));
      tick();
    });
  }

  async function play(from = Math.max(0, step)) {
    const id = ++run.current;
    setPlaying(true);
    setDone(false);
    if (from === 0) {
      track("listen_start_all");
      track("listen_start", m.id);
    }
    stopAmb.current?.();
    stopAmb.current = ambient !== "none" ? startAmbient(ambient) : null;
    for (let i = from; i < total; i++) {
      if (run.current !== id) return;
      setStep(i);
      await say(m.steps[i][0], 0.85);
      if (run.current !== id) return;
      await wait(m.steps[i][1], id);
    }
    if (run.current !== id) return;
    stopAmb.current?.();
    stopAmb.current = null;
    setPlaying(false);
    setDone(true);
    setStep(total - 1);
    markListened(m.id, m.skillId);
    track("listen_done_all");
    track("listen_done", m.id);
  }

  function pause() {
    run.current++;
    stopSpeech();
    stopAmb.current?.();
    stopAmb.current = null;
    setPlaying(false);
  }

  const pct = step < 0 ? 0 : Math.round(((step + (done ? 1 : 0)) / total) * 100);

  return (
    <section aria-label={`${m.title} player`} className="mb-8 overflow-hidden rounded-2xl bg-oxford text-white">
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">
              Now playing · {m.minutes} min
            </p>
            <h2 className="mt-1 font-display text-4xl font-extrabold sm:text-5xl">{m.title}</h2>
          </div>
          <button onClick={() => {
              pause();
              onClose();
            }} className="rounded-lg border border-white/40 px-3 py-1.5 text-sm font-bold hover:bg-white/10">
            Close
          </button>
        </div>

        <p aria-live="polite" className="mt-6 min-h-[5.5rem] font-display text-2xl leading-snug text-white sm:text-3xl">
          {done ? "Well done. Take a moment before you move on." : step >= 0 ? m.steps[step][0] : m.blurb}
        </p>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/20" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-sun transition-all" style={{ width: `${pct}%` }} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={() => (playing ? pause() : play(done ? 0 : Math.max(0, step)))}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-sun text-oxford hover:brightness-95"
          >
            {playing ? <PauseIcon className="h-8 w-8" /> : <PlayIcon className="ml-1 h-8 w-8" />}
          </button>
          {step > 0 && !playing && !done && (
            <button onClick={() => play(0)} className="text-sm font-bold underline">
              Start over
            </button>
          )}
          <label className="ml-auto flex items-center gap-2 text-sm font-bold">
            <HeadphonesIcon className="h-5 w-5" />
            Background
            <select
              value={ambient}
              disabled={playing}
              onChange={(e) => setAmbient(e.target.value as Ambient)}
              className="rounded-lg border border-white/40 bg-oxford px-2 py-1.5 text-white"
            >
              <option value="ocean">Soft waves</option>
              <option value="hum">Warm hum</option>
              <option value="none">Voice only</option>
            </select>
          </label>
        </div>
        {done && <p className="mt-4 text-sm font-bold text-sun">✓ Saved to your progress.</p>}
      </div>
    </section>
  );
}
