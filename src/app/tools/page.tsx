"use client";

import { useMemo, useState } from "react";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import ToolCard from "@/components/ToolCard";
import { moduleTheme } from "@/data/art";
import { ENGINE_LABEL, TOOLS, type Engine } from "@/data/tools";
import { MODULES } from "@/data/skills";

const KINDS: { label: string; kinds: Engine["kind"][] }[] = [
  { label: "Breathe", kinds: ["pace"] },
  { label: "Timers", kinds: ["timer", "sequence", "bilateral"] },
  { label: "Step by step", kinds: ["steps"] },
  { label: "Grounding", kinds: ["senses", "count", "label"] },
  { label: "Cards", kinds: ["deck", "pick"] },
  { label: "Check-ins", kinds: ["rate", "slider", "checklist"] },
  { label: "Worksheets", kinds: ["write"] },
];

export default function ToolsPage() {
  const [mod, setMod] = useState<string>("all");
  const [kind, setKind] = useState<string>("all");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const k = KINDS.find((x) => x.label === kind);
    const s = q.trim().toLowerCase();
    return TOOLS.filter((t) => (mod === "all" || t.module === mod) && (!k || k.kinds.includes(t.engine.kind)) && (!s || `${t.name} ${t.blurb} ${ENGINE_LABEL[t.engine.kind]}`.toLowerCase().includes(s)));
  }, [mod, kind, q]);

  const chip = (on: boolean, color?: string) =>
    `shrink-0 rounded-full border-2 px-3.5 py-1.5 text-sm font-bold ${on ? "text-white" : "bg-white"}` + (color ? "" : on ? " border-oxford bg-oxford" : " border-oxford text-oxford");

  return (
    <Shell width="wide">
      <PageHeader art="practice" kicker={`${TOOLS.length} hands-on tools`} title="Tools" />

      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tools: breathe, sleep, anger…"
        aria-label="Search tools"
        className="w-full rounded-xl border-2 border-oxford bg-white px-4 py-3 text-base outline-none focus:ring-4 focus:ring-sun"
      />

      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label="Skill area">
        <button onClick={() => setMod("all")} className={chip(mod === "all")}>All areas</button>
        {MODULES.map((m) => {
          const th = moduleTheme(m.id);
          const on = mod === m.id;
          return (
            <button key={m.id} onClick={() => setMod(on ? "all" : m.id)} aria-pressed={on} className={chip(on, th.solid)} style={{ borderColor: th.solid, background: on ? th.solid : "#fff", color: on ? "#fff" : th.solid }}>
              {m.name.replace("Core ", "").replace(" Effectiveness", "")}
            </button>
          );
        })}
      </div>
      <div className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1" role="group" aria-label="Kind of tool">
        <button onClick={() => setKind("all")} className={chip(kind === "all")}>Any kind</button>
        {KINDS.map((k) => (
          <button key={k.label} onClick={() => setKind(kind === k.label ? "all" : k.label)} aria-pressed={kind === k.label} className={chip(kind === k.label)}>
            {k.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm font-bold text-muted">{list.length} tools</p>
      <ul className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {list.map((t) => (
          <li key={t.id}>
            <ToolCard tool={t} />
          </li>
        ))}
      </ul>
      {list.length === 0 && <p className="mt-6 text-muted">No tools match. Try a different word.</p>}
    </Shell>
  );
}
