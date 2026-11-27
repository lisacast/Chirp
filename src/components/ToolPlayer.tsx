"use client";

import { useEffect, useRef, useState } from "react";
import { gradientCss, MODULE_THEME, THEMES, type Theme } from "@/data/art";
import type { Engine, Tool } from "@/data/tools";
import { getSkill } from "@/data/skills";
import { markActive, markPracticed } from "@/lib/profile";
import { track } from "@/lib/track";

type Done = () => void;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;

// Plays any Chirp tool. The panel is drawn in the tool's module colours.
export default function ToolPlayer({ tool }: { tool: Tool }) {
  const key = MODULE_THEME[tool.module];
  const th = THEMES[key];
  const [finished, setFinished] = useState(false);
  const [counted, setCounted] = useState(false);
  const started = useRef(false);
  const skill = getSkill(tool.skillId);

  const begin = () => {
    if (started.current) return;
    started.current = true;
    track("tool", tool.id);
  };
  const done: Done = () => {
    if (!finished) {
      setFinished(true);
      markActive();
      track("tool_done", tool.id);
    }
  };

  return (
    <section
      className="overflow-hidden rounded-2xl text-white shadow-lg"
      style={{ background: `linear-gradient(${th.stops[0]}d9, ${th.stops[0]}f2), ${gradientCss(key, tool.id)}` }}
      onPointerDown={begin}
      onKeyDown={begin}
    >
      <div className="p-5 sm:p-8">
        <Engine e={tool.engine} th={th} done={done} />
        {finished && (
          <div className="anim-pop mt-6 rounded-xl bg-white/12 p-4 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
            <p className="text-lg font-bold">Nice work. 🐦</p>
            {skill && (
              <button
                onClick={() => {
                  markPracticed(skill.id);
                  setCounted(true);
                }}
                disabled={counted}
                className="mt-3 rounded-full bg-sun px-4 py-2 text-sm font-extrabold text-oxford disabled:opacity-80"
              >
                {counted ? `✓ Added to your bingo card` : `Count it as practicing ${skill.name}`}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function Engine({ e, th, done }: { e: Engine; th: Theme; done: Done }) {
  switch (e.kind) {
    case "pace":
      return <Pace e={e} th={th} done={done} />;
    case "sequence":
      return <Sequence e={e} th={th} done={done} />;
    case "timer":
      return <Timer e={e} th={th} done={done} />;
    case "steps":
      return <Steps steps={e.steps} th={th} done={done} />;
    case "senses":
      return <Senses e={e} th={th} done={done} />;
    case "count":
      return <Count e={e} th={th} done={done} />;
    case "label":
      return <Labels e={e} th={th} done={done} />;
    case "deck":
      return <Deck e={e} th={th} done={done} />;
    case "checklist":
      return <Checklist e={e} th={th} done={done} />;
    case "write":
      return <Write e={e} th={th} done={done} />;
    case "rate":
      return <Rate e={e} th={th} done={done} />;
    case "pick":
      return <Pick e={e} th={th} done={done} />;
    case "slider":
      return <Slider e={e} th={th} done={done} />;
    case "bilateral":
      return <Bilateral e={e} th={th} done={done} />;
  }
}

const Btn = ({ children, onClick, ghost, disabled }: { children: React.ReactNode; onClick: () => void; ghost?: boolean; disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`min-h-12 rounded-xl px-5 py-3 text-base font-extrabold transition disabled:opacity-40 ${ghost ? "border-2 border-white/60 text-white hover:bg-white/10" : "bg-sun text-oxford hover:brightness-95"}`}
  >
    {children}
  </button>
);

/* ── Breathing pacer (the original Breathe tool, now with shapes) ── */
function Pace({ e, th, done }: { e: Extract<Engine, { kind: "pace" }>; th: Theme; done: Done }) {
  const [mins, setMins] = useState(e.mins ?? 1);
  const [on, setOn] = useState(false);
  const [phase, setPhase] = useState(0);
  const [left, setLeft] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => stop(), []);

  function stop() {
    if (timer.current) clearTimeout(timer.current);
    if (tick.current) clearInterval(tick.current);
    setOn(false);
  }
  function start() {
    setOn(true);
    const end = Date.now() + mins * 60000;
    let i = 0;
    tick.current = setInterval(() => setLeft(Math.ceil((end - Date.now()) / 1000)), 500);
    const next = () => {
      if (Date.now() >= end) {
        stop();
        done();
        return;
      }
      setPhase(i);
      timer.current = setTimeout(next, e.phases[i][1] * 1000);
      i = (i + 1) % e.phases.length;
    };
    setLeft(mins * 60);
    next();
  }

  const [label, secs] = e.phases[phase];
  const l = label.toLowerCase();
  const isIn = /in\b|in:|sniff|top up|rolls in|tense|squeeze/.test(l) && !/out/.test(l);
  const isHold = l.startsWith("hold");
  const prevIn = phase > 0 && /in/.test(e.phases[phase - 1][0].toLowerCase()) && !/out/.test(e.phases[phase - 1][0].toLowerCase());
  const big = on && (isIn || (isHold && prevIn));
  const scale = !on ? 0.72 : big ? 1 : 0.5;
  const shape = e.shape ?? "circle";
  const light = th.stops[3];

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
        <div className="absolute inset-0" style={{ transform: `scale(${scale})`, transition: `transform ${on ? secs : 0.6}s ease-in-out` }}>
          {shape === "circle" && <div className="h-full w-full rounded-full" style={{ background: `radial-gradient(circle at 35% 30%, #fff, ${light} 45%, ${th.stops[2]})` }} />}
          {shape === "square" && <div className="h-full w-full rounded-3xl" style={{ background: `linear-gradient(135deg, #fff, ${light} 45%, ${th.stops[2]})` }} />}
          {shape === "triangle" && (
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs>
                <linearGradient id="tg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#fff" />
                  <stop offset="1" stopColor={th.stops[2]} />
                </linearGradient>
              </defs>
              <path d="M50 6 L96 88 L4 88 Z" fill="url(#tg)" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          )}
          {shape === "wave" && (
            <div className="h-full w-full overflow-hidden rounded-full" style={{ background: `${th.stops[1]}` }}>
              <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="anim-wave absolute bottom-0 h-3/4 w-[200%]">
                <path d="M0 30 Q25 10 50 30 T100 30 T150 30 T200 30 V100 H0 Z" fill={light} />
              </svg>
            </div>
          )}
        </div>
        <div className="relative px-6" style={{ color: th.stops[0] }}>
          <p aria-live="polite" className="text-2xl font-bold leading-tight">
            {on ? label : "Ready"}
          </p>
          {on && <p className="mt-1 text-sm font-bold">{fmt(left)} left</p>}
        </div>
      </div>
      {!on && (
        <div className="mt-4 flex items-center gap-2 text-sm font-bold">
          {[1, 3, 5].map((m) => (
            <button key={m} onClick={() => setMins(m)} aria-pressed={mins === m} className={`rounded-full px-3 py-1 ${mins === m ? "bg-white text-oxford" : "border border-white/50"}`}>
              {m} min
            </button>
          ))}
        </div>
      )}
      <div className="mt-4">
        <Btn onClick={on ? stop : start}>{on ? "Stop" : "Start"}</Btn>
      </div>
      <p className="mt-3 text-sm text-white/80">{e.phases.map(([a, b]) => `${a} ${b}`).join(" · ")}</p>
    </div>
  );
}

/* ── Ring helper ── */
function Ring({ pct, th, size = 220, children, ms = 400 }: { pct: number; th: Theme; size?: number; children?: React.ReactNode; ms?: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="6" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={th.stops[3]} strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, pct))} style={{ transition: `stroke-dashoffset ${ms}ms linear` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">{children}</div>
    </div>
  );
}

/* ── One-time guided sequence ── */
function Sequence({ e, th, done }: { e: Extract<Engine, { kind: "sequence" }>; th: Theme; done: Done }) {
  const [i, setI] = useState(-1);
  const [on, setOn] = useState(false);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    if (!on || i < 0) return;
    if (i >= e.phases.length) {
      setOn(false);
      done();
      return;
    }
    const secs = e.phases[i][1];
    setPct(0);
    const r = requestAnimationFrame(() => setPct(1));
    const t = setTimeout(() => setI(i + 1), secs * 1000);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(r);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, on]);
  const fin = i >= e.phases.length;
  const cur = e.phases[Math.max(0, Math.min(i, e.phases.length - 1))];
  return (
    <div className="text-center">
      <Ring pct={on ? pct : fin ? 1 : 0} th={th} ms={on && pct === 1 ? cur[1] * 1000 : 0}>
        <p aria-live="polite" className="text-xl font-bold leading-snug sm:text-2xl">
          {fin ? "All done" : i < 0 ? "Ready when you are" : cur[0]}
        </p>
        {i >= 0 && !fin && <p className="mt-1 text-sm font-bold text-white/80">{i + 1} of {e.phases.length}</p>}
      </Ring>
      <div className="mt-5 flex justify-center gap-3">
        {i < 0 || fin ? (
          <Btn onClick={() => { setI(0); setOn(true); }}>{fin ? "Again" : "Start"}</Btn>
        ) : (
          <>
            <Btn ghost onClick={() => setOn(!on)}>{on ? "Pause" : "Resume"}</Btn>
            <Btn onClick={() => { setOn(true); setI(i + 1); }}>Skip</Btn>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Timer with prompts; ring, rising-and-falling wave, or candle ── */
function Timer({ e, th, done }: { e: Extract<Engine, { kind: "timer" }>; th: Theme; done: Done }) {
  const [on, setOn] = useState(false);
  const [el, setEl] = useState(0);
  useEffect(() => {
    if (!on) return;
    const t = setInterval(() => setEl((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, [on]);
  useEffect(() => {
    if (el >= e.secs && on) {
      setOn(false);
      done();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el]);
  const prompt = [...(e.prompts ?? [])].reverse().find(([at]) => at <= el)?.[1] ?? "";
  const pct = el / e.secs;
  const fin = el >= e.secs;
  const v = e.visual ?? "ring";
  const controls = (
    <div className="mt-5 flex justify-center gap-3">
      {!on && el === 0 && <Btn onClick={() => setOn(true)}>Start</Btn>}
      {(on || (el > 0 && !fin)) && <Btn ghost onClick={() => setOn(!on)}>{on ? "Pause" : "Resume"}</Btn>}
      {el > 0 && <Btn ghost onClick={() => { setEl(0); setOn(false); }}>Reset</Btn>}
    </div>
  );
  const text = (
    <p aria-live="polite" className="anim-pop min-h-[3.5rem] text-xl font-bold leading-snug sm:text-2xl" key={prompt}>
      {fin ? "Time. Well done." : el === 0 && !on ? e.prompts?.[0]?.[1] ?? "Ready" : prompt}
    </p>
  );
  if (v === "wave") {
    const h = 20 + Math.sin(Math.PI * Math.min(1, pct)) * 65; // urge rises, peaks, falls
    return (
      <div className="text-center">
        {text}
        <div className="relative mx-auto mt-4 h-48 w-full max-w-md overflow-hidden rounded-2xl" style={{ background: `${th.stops[0]}` }}>
          <div className="absolute inset-x-0 bottom-0 transition-all duration-1000" style={{ height: `${h}%` }}>
            <svg viewBox="0 0 200 20" preserveAspectRatio="none" className={`${on ? "anim-wave" : ""} absolute -top-4 h-5 w-[200%]`}>
              <path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 V20 H0 Z" fill={th.stops[2]} />
            </svg>
            <div className="h-full w-full" style={{ background: `linear-gradient(${th.stops[2]}, ${th.stops[1]})` }} />
          </div>
          <p className="absolute right-3 top-2 text-sm font-bold">{fmt(e.secs - el)}</p>
        </div>
        {controls}
      </div>
    );
  }
  if (v === "candle") {
    return (
      <div className="text-center">
        {text}
        <div className="mx-auto mt-4 flex h-52 w-40 flex-col items-center justify-end">
          <svg viewBox="0 0 40 60" className={`${on ? "anim-flicker" : ""} h-24 w-16`}>
            <defs>
              <radialGradient id="fl" cx="50%" cy="70%" r="60%">
                <stop offset="0" stopColor="#fff" />
                <stop offset="0.4" stopColor="#FED35D" />
                <stop offset="1" stopColor="#F76707" />
              </radialGradient>
            </defs>
            <path d="M20 2 C30 20 34 32 34 42 A14 14 0 0 1 6 42 C6 32 10 20 20 2 Z" fill="url(#fl)" />
          </svg>
          <div className="h-1 w-1 bg-oxford" />
          <div className="h-20 w-12 rounded-t-md" style={{ background: "linear-gradient(90deg,#f1e7d0,#fff8e6,#e8dcc0)" }} />
        </div>
        <p className="mt-2 text-sm font-bold">{fmt(e.secs - el)}</p>
        {controls}
      </div>
    );
  }
  return (
    <div className="text-center">
      <Ring pct={pct} th={th} ms={1000}>
        <p className="text-4xl font-bold">{fmt(e.secs - el)}</p>
      </Ring>
      <div className="mt-4">{text}</div>
      {controls}
    </div>
  );
}

/* ── Step-by-step cards ── */
function Steps({ steps, th, done }: { steps: string[]; th: Theme; done: Done }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="flex gap-1.5" aria-hidden>
        {steps.map((_, k) => (
          <span key={k} className="h-1.5 flex-1 rounded-full" style={{ background: k <= i ? th.stops[3] : "rgba(255,255,255,0.2)" }} />
        ))}
      </div>
      <p className="mt-2 text-sm font-bold text-white/80">Step {i + 1} of {steps.length}</p>
      <p key={i} aria-live="polite" className="anim-pop mt-4 min-h-[7rem] text-2xl font-bold leading-snug sm:text-3xl">
        {steps[i]}
      </p>
      <div className="mt-5 flex gap-3">
        <Btn ghost onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}>Back</Btn>
        <Btn onClick={() => (i < steps.length - 1 ? setI(i + 1) : done())}>{i < steps.length - 1 ? "Next" : "Finish"}</Btn>
      </div>
    </div>
  );
}

/* ── Grounding counter: tap a dot for each thing you find ── */
function Senses({ e, th, done }: { e: Extract<Engine, { kind: "senses" }>; th: Theme; done: Done }) {
  const [got, setGot] = useState<number[]>(e.groups.map(() => 0));
  const cur = got.findIndex((g, k) => g < e.groups[k][1]);
  useEffect(() => {
    if (cur === -1) done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur]);
  return (
    <div>
      <p aria-live="polite" className="text-2xl font-bold leading-snug">
        {cur === -1 ? "You're here, right now. Well done." : `Find ${e.groups[cur][1] - got[cur]} more ${e.groups[cur][0]}`}
      </p>
      <ul className="mt-5 space-y-3">
        {e.groups.map(([name, n], k) => (
          <li key={name} className={`rounded-xl p-3 ${k === cur ? "bg-white/15 ring-2 ring-white/60" : ""}`}>
            <p className="text-sm font-bold capitalize">{n} {name}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[...Array(n)].map((_, d) => (
                <button
                  key={d}
                  aria-label={`${name} ${d + 1}`}
                  disabled={k !== cur || d !== got[k]}
                  onClick={() => setGot(got.map((g, j) => (j === k ? g + 1 : g)))}
                  className="h-11 w-11 rounded-full border-2 border-white/70 text-lg font-bold transition disabled:cursor-default"
                  style={d < got[k] ? { background: th.stops[3], color: th.stops[0], borderColor: th.stops[3] } : {}}
                >
                  {d < got[k] ? "✓" : ""}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Big tap counter ── */
function Count({ e, th, done }: { e: Extract<Engine, { kind: "count" }>; th: Theme; done: Done }) {
  const [n, setN] = useState(0);
  return (
    <div className="text-center">
      <p className="text-lg font-bold">{e.label}</p>
      <button
        onClick={() => {
          const v = n + 1;
          setN(v);
          if (v === e.target) done();
        }}
        className="mx-auto mt-5 block rounded-full transition active:scale-95"
        aria-label={`Tap. Count ${n}`}
      >
        <Ring pct={n / e.target} th={th} size={210}>
          <span className="text-6xl font-bold">{n}</span>
          <span className="text-sm font-bold text-white/80">of {e.target}</span>
        </Ring>
      </button>
      <div className="mt-4">
        <Btn ghost onClick={() => setN(0)}>Start over</Btn>
      </div>
    </div>
  );
}

/* ── Thought labels ── */
function Labels({ e, th, done }: { e: Extract<Engine, { kind: "label" }>; th: Theme; done: Done }) {
  const [c, setC] = useState<Record<string, number>>({});
  const total = Object.values(c).reduce((a, b) => a + b, 0);
  return (
    <div>
      <p className="text-lg font-bold">Notice a thought? Tap its label, then let it go.</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {e.labels.map((l) => (
          <button
            key={l}
            onClick={() => {
              setC({ ...c, [l]: (c[l] ?? 0) + 1 });
              if (total + 1 === 10) done();
            }}
            className="flex min-h-16 items-center justify-between rounded-xl bg-white/12 px-4 py-3 text-left font-bold transition active:scale-95"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            {l}
            <span className="rounded-full px-2.5 py-0.5 text-sm" style={{ background: th.stops[3], color: th.stops[0] }}>
              {c[l] ?? 0}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-white/85">{total} thoughts noticed. You&apos;re watching your mind, not getting lost in it.</p>
    </div>
  );
}

/* ── Shuffle deck (with flip for "front => back" cards) ── */
function Deck({ e, th, done }: { e: Extract<Engine, { kind: "deck" }>; th: Theme; done: Done }) {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const [seen, setSeen] = useState(1);
  const [front, back] = e.cards[i].split(" => ");
  return (
    <div className="text-center">
      <div
        key={`${i}-${flip}`}
        className="anim-pop mx-auto flex min-h-56 max-w-md flex-col items-center justify-center rounded-2xl p-6 shadow-xl"
        style={{ background: flip ? "#fff" : `linear-gradient(135deg, ${th.stops[3]}, #fff)`, color: th.stops[0] }}
      >
        {back && <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.14em]">{flip ? "Try saying" : "Judgment"}</p>}
        <p className="text-2xl font-bold leading-snug">{flip && back ? back : front}</p>
      </div>
      <p className="mt-3 text-sm font-bold text-white/80">{seen} of {e.cards.length}</p>
      <div className="mt-4 flex justify-center gap-3">
        {back && !flip && <Btn ghost onClick={() => setFlip(true)}>Flip</Btn>}
        <Btn
          onClick={() => {
            setFlip(false);
            setI((i + 1) % e.cards.length);
            const s = seen + 1;
            setSeen(Math.min(s, e.cards.length));
            if (s === Math.min(5, e.cards.length)) done();
          }}
        >
          Next card
        </Btn>
      </div>
    </div>
  );
}

/* ── Checklist ── */
function Checklist({ e, th, done }: { e: Extract<Engine, { kind: "checklist" }>; th: Theme; done: Done }) {
  const [on, setOn] = useState<boolean[]>(e.items.map(() => false));
  const n = on.filter(Boolean).length;
  return (
    <div>
      <div className="h-2 overflow-hidden rounded-full bg-white/20">
        <div className="h-full transition-all" style={{ width: `${(n / e.items.length) * 100}%`, background: th.stops[3] }} />
      </div>
      <ul className="mt-4 space-y-2">
        {e.items.map((it, k) => (
          <li key={it}>
            <button
              onClick={() => {
                const v = on.map((x, j) => (j === k ? !x : x));
                setOn(v);
                if (v.filter(Boolean).length >= Math.ceil(e.items.length / 2)) done();
              }}
              aria-pressed={on[k]}
              className="flex w-full items-center gap-3 rounded-xl p-3 text-left font-semibold transition"
              style={{ background: on[k] ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)" }}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 border-white/70 font-bold" style={on[k] ? { background: th.stops[3], color: th.stops[0], borderColor: th.stops[3] } : {}}>
                {on[k] ? "✓" : ""}
              </span>
              {it}
            </button>
          </li>
        ))}
      </ul>
      {n === e.items.length && <p className="anim-pop mt-4 text-lg font-bold">{e.done}</p>}
    </div>
  );
}

/* ── Worksheet (nothing is saved or sent) ── */
function Write({ e, done }: { e: Extract<Engine, { kind: "write" }>; th: Theme; done: Done }) {
  const [v, setV] = useState<string[]>(e.fields.map(() => ""));
  const [fin, setFin] = useState(false);
  return (
    <div>
      <p className="text-sm text-white/85">Just for you: nothing you type here is saved or sent anywhere.</p>
      <div className="mt-4 space-y-4">
        {e.fields.map((f, k) => (
          <label key={f} className="block">
            <span className="text-sm font-extrabold">{f}</span>
            <textarea
              rows={2}
              value={v[k]}
              onChange={(ev) => setV(v.map((x, j) => (j === k ? ev.target.value : x)))}
              className="mt-1 w-full rounded-xl border-0 bg-white p-3 text-base text-ink outline-none focus:ring-4 focus:ring-sun"
            />
          </label>
        ))}
      </div>
      {fin && <p className="anim-pop mt-4 text-lg font-bold">{e.done}</p>}
      <div className="mt-4 flex gap-3">
        <Btn onClick={() => { setFin(true); done(); }}>Done</Btn>
        <Btn ghost onClick={() => { setV(e.fields.map(() => "")); setFin(false); }}>Clear</Btn>
      </div>
    </div>
  );
}

/* ── 0–10 rating, remembers the last rating so you can compare ── */
function Rate({ e, th, done }: { e: Extract<Engine, { kind: "rate" }>; th: Theme; done: Done }) {
  const [r, setR] = useState<number | null>(null);
  const [prev, setPrev] = useState<number | null>(null);
  return (
    <div>
      <p className="text-2xl font-bold leading-snug">{e.question}</p>
      <div className="mt-5 grid grid-cols-11 gap-1">
        {[...Array(11)].map((_, n) => (
          <button
            key={n}
            onClick={() => {
              if (r !== null) setPrev(r);
              setR(n);
              done();
            }}
            aria-pressed={r === n}
            className="aspect-[3/4] rounded-lg text-sm font-extrabold sm:text-base"
            style={{ background: r === n ? "#fff" : `color-mix(in srgb, ${th.stops[3]} ${20 + n * 8}%, transparent)`, color: r === n ? th.stops[0] : "#fff" }}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-xs font-bold text-white/85">
        <span>{e.low}</span>
        <span>{e.high}</span>
      </div>
      {r !== null && (
        <p key={r} className="anim-pop mt-4 text-lg font-bold">
          {prev !== null ? `Before: ${prev}. Now: ${r}. ${r < prev ? "It came down. Your skills worked." : r > prev ? "It went up. That's okay. Try another tool, or reach out." : "About the same. Keep going, or try another tool."}` : r >= 7 ? "That's a lot. Try a breathing or TIPP tool, then rate again." : r >= 4 ? "Noticeable. A quick tool could help. Rate again after." : "Pretty manageable. Nice noticing."}
        </p>
      )}
    </div>
  );
}

/* ── Pick one option, get a response ── */
function Pick({ e, th, done }: { e: Extract<Engine, { kind: "pick" }>; th: Theme; done: Done }) {
  const [p, setP] = useState<number | null>(null);
  return (
    <div>
      <p className="text-2xl font-bold leading-snug">{e.question}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {e.options.map(([o], k) => (
          <button
            key={o}
            onClick={() => {
              setP(k);
              done();
            }}
            aria-pressed={p === k}
            className="min-h-14 rounded-xl px-3 py-2 font-bold transition"
            style={p === k ? { background: "#fff", color: th.stops[0] } : { background: "rgba(255,255,255,0.12)" }}
          >
            {o}
          </button>
        ))}
      </div>
      {p !== null && (
        <p key={p} className="anim-pop mt-5 rounded-xl p-4 text-lg font-semibold leading-snug" style={{ background: th.stops[3], color: th.stops[0] }}>
          {e.options[p][1]}
        </p>
      )}
    </div>
  );
}

/* ── Two-pole slider (wise mind) ── */
function Slider({ e, th, done }: { e: Extract<Engine, { kind: "slider" }>; th: Theme; done: Done }) {
  const [v, setV] = useState(50);
  const [moved, setMoved] = useState(false);
  const note = v < 35 ? e.notes[0] : v > 65 ? e.notes[2] : e.notes[1];
  return (
    <div>
      <div className="flex justify-between text-sm font-extrabold">
        <span>{e.left}</span>
        <span>Wise mind</span>
        <span>{e.right}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={v}
        onChange={(ev) => {
          setV(+ev.target.value);
          if (!moved) {
            setMoved(true);
            done();
          }
        }}
        aria-label="Where are you right now?"
        className="mt-3 h-3 w-full cursor-pointer appearance-none rounded-full"
        style={{ background: `linear-gradient(90deg, #E64980, ${th.stops[3]} 50%, #4DABF7)`, accentColor: "#fff" }}
      />
      <p key={note} className="anim-pop mt-5 min-h-[5rem] text-xl font-bold leading-snug">
        {moved ? note : "Drag the slider to where you are right now."}
      </p>
    </div>
  );
}

/* ── Left-right tapping (butterfly hug) ── */
function Bilateral({ e, th, done }: { e: Extract<Engine, { kind: "bilateral" }>; th: Theme; done: Done }) {
  const [on, setOn] = useState(false);
  const [side, setSide] = useState(0);
  const [el, setEl] = useState(0);
  useEffect(() => {
    if (!on) return;
    const a = setInterval(() => setSide((s) => 1 - s), 700);
    const b = setInterval(() => setEl((x) => x + 1), 1000);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [on]);
  useEffect(() => {
    if (el >= e.secs && on) {
      setOn(false);
      done();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el]);
  return (
    <div className="text-center">
      <p className="text-xl font-bold">{on ? (side === 0 ? "Tap left" : "Tap right") : "Tap along with the lights."}</p>
      <div className="mt-6 flex justify-center gap-10">
        {[0, 1].map((s) => (
          <div
            key={s}
            className="h-28 w-28 rounded-full transition-all duration-300"
            style={{ background: on && side === s ? `radial-gradient(circle, #fff, ${th.stops[3]})` : "rgba(255,255,255,0.15)", transform: on && side === s ? "scale(1.08)" : "scale(0.9)" }}
          />
        ))}
      </div>
      <p className="mt-4 text-sm font-bold">{fmt(e.secs - el)}</p>
      <div className="mt-4">
        <Btn onClick={() => setOn(!on)}>{on ? "Pause" : el > 0 ? "Resume" : "Start"}</Btn>
      </div>
    </div>
  );
}
