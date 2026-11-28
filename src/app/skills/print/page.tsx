"use client";

import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { MODULES, SKILLS, type ModuleId } from "@/data/skills";

// Printable cue cards: pick a module, a set, or single cards, then print.
// Four cards per letter or A4 page, with dashed cut lines. Ink-friendly: white cards, a colour band only.

export default function PrintCards() {
  const [picked, setPicked] = useState<string[]>([]);
  useEffect(() => {
    const ids = new URLSearchParams(location.search).get("ids");
    setPicked(ids ? ids.split(",").filter((id) => SKILLS.some((s) => s.id === id)) : SKILLS.map((s) => s.id));
  }, []);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const setModule = (m: ModuleId) => setPicked(SKILLS.filter((s) => s.module === m).map((s) => s.id));
  const cards = SKILLS.filter((s) => picked.includes(s.id));
  const mod = (id: ModuleId) => MODULES.find((m) => m.id === id)!;

  return (
    <Shell width="wide">
      <style>{`@media print { @page { margin: 0.4in; } body { background: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; } }`}</style>

      <div className="print:hidden">
        <h1 className="text-3xl font-bold text-oxford">Print cue cards</h1>
        <p className="mt-1 text-muted">Pick the cards you want, then press Print. Four cards fit on each page, with dashed lines to cut along. Tip: print on card stock and keep one in your bag or wallet.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => setPicked(SKILLS.map((s) => s.id))} className="rounded-full bg-oxford px-3 py-1.5 text-sm font-bold text-white">
            All {SKILLS.length}
          </button>
          {MODULES.map((m) => (
            <button key={m.id} onClick={() => setModule(m.id)} className="rounded-full px-3 py-1.5 text-sm font-bold text-white" style={{ background: m.color }}>
              {m.name}
            </button>
          ))}
          <button onClick={() => setPicked([])} className="rounded-full border border-line bg-white px-3 py-1.5 text-sm font-bold text-muted">
            Clear
          </button>
        </div>

        <details className="mt-3 rounded-xl border border-line bg-white p-3">
          <summary className="cursor-pointer font-bold text-oxford">Choose single cards ({cards.length} picked)</summary>
          <div className="mt-3 grid gap-x-4 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((s) => (
              <label key={s.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={picked.includes(s.id)} onChange={() => toggle(s.id)} className="h-4 w-4" />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: mod(s.module).color }} />
                {s.name}
              </label>
            ))}
          </div>
        </details>

        <div className="sticky top-16 z-10 mt-4 flex items-center justify-between gap-3 rounded-xl bg-oxford p-3 text-white">
          <span className="font-bold">
            {cards.length} {cards.length === 1 ? "card" : "cards"} · {Math.ceil(cards.length / 4)} {Math.ceil(cards.length / 4) === 1 ? "page" : "pages"}
          </span>
          <button onClick={() => window.print()} disabled={!cards.length} className="rounded-xl bg-sun px-5 py-2.5 font-extrabold text-oxford disabled:opacity-40">
            🖨 Print
          </button>
        </div>
        <p className="mt-6 text-sm font-bold text-muted">Preview</p>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 print:mt-0 print:grid-cols-2 print:gap-0">
        {cards.map((s) => {
          const m = mod(s.module);
          return (
            <article
              key={s.id}
              className="flex break-inside-avoid flex-col overflow-hidden rounded-xl border-2 bg-white text-ink print:h-[4.9in] print:rounded-none print:border-dashed print:border-[#999]"
            >
              <div className="px-4 py-2.5 text-white" style={{ background: m.color }}>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] opacity-90">{m.name}</p>
                <h2 className="text-xl font-bold leading-tight">{s.name}</h2>
              </div>
              <div className="flex flex-1 flex-col px-4 py-3">
                <p className="font-bold" style={{ color: m.color }}>
                  {s.tagline}
                </p>
                <p className="mt-1.5 text-sm leading-snug">{s.what}</p>
                <ol className="mt-2 space-y-1 text-sm leading-snug">
                  {s.steps.map((st, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white" style={{ background: m.color }}>
                        {i + 1}
                      </span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-auto flex items-center gap-1.5 pt-2 text-[10px] font-bold text-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/chirp-bird.png" alt="" width={14} height={14} className="h-3.5 w-3.5" />
                  Chirp · playchirp.com · Crisis? Call or text 988
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </Shell>
  );
}
