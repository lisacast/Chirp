import type { Engine } from "@/data/tools";

// A small white glyph that shows what kind of interaction a tool is.
export default function ToolGlyph({ kind, className = "h-10 w-10" }: { kind: Engine["kind"]; className?: string }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  const g: Record<Engine["kind"], React.ReactNode> = {
    pace: <><circle cx="24" cy="24" r="8" fill="currentColor" /><circle cx="24" cy="24" r="15" {...s} opacity={0.6} /><circle cx="24" cy="24" r="21" {...s} opacity={0.3} /></>,
    sequence: <><circle cx="24" cy="24" r="18" {...s} opacity={0.35} /><path d="M24 6 A18 18 0 0 1 42 24" {...s} /><path d="M20 18 L30 24 L20 30 Z" fill="currentColor" /></>,
    timer: <><circle cx="24" cy="26" r="16" {...s} /><path d="M24 26 V16 M20 6 H28" {...s} /></>,
    steps: <><path d="M8 38 H18 V28 H28 V18 H38 V10" {...s} /></>,
    senses: <><circle cx="24" cy="24" r="6" fill="currentColor" /><path d="M6 24 C12 12 36 12 42 24 C36 36 12 36 6 24 Z" {...s} /></>,
    count: <><circle cx="24" cy="24" r="17" {...s} /><path d="M18 20 L24 15 V33" {...s} /></>,
    label: <><path d="M8 10 H28 L40 24 L28 38 H8 Z" {...s} /><circle cx="16" cy="24" r="3" fill="currentColor" /></>,
    deck: <><rect x="12" y="8" width="24" height="32" rx="4" {...s} /><path d="M8 14 V36 A4 4 0 0 0 12 40" {...s} opacity={0.5} /><path d="M20 24 H28" {...s} /></>,
    checklist: <><path d="M8 12 L11 15 L16 9 M8 24 L11 27 L16 21 M8 36 L11 39 L16 33 M22 12 H40 M22 24 H40 M22 36 H40" {...s} /></>,
    write: <><path d="M10 38 L12 30 L32 10 L38 16 L18 36 Z M28 14 L34 20" {...s} /></>,
    rate: <><path d="M6 40 V34 M14 40 V28 M22 40 V22 M30 40 V16 M38 40 V10" {...s} strokeWidth={4} /></>,
    pick: <><circle cx="14" cy="14" r="5" {...s} /><circle cx="34" cy="14" r="5" fill="currentColor" /><circle cx="14" cy="34" r="5" {...s} /><circle cx="34" cy="34" r="5" {...s} /></>,
    slider: <><path d="M6 24 H42" {...s} /><circle cx="26" cy="24" r="7" fill="currentColor" /></>,
    chain: <><rect x="4" y="18" width="16" height="12" rx="6" {...s} /><rect x="16" y="18" width="16" height="12" rx="6" {...s} /><rect x="28" y="18" width="16" height="12" rx="6" {...s} /></>,
    bilateral: <><circle cx="13" cy="24" r="8" fill="currentColor" /><circle cx="35" cy="24" r="8" {...s} /></>,
  };
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      {g[kind]}
    </svg>
  );
}
