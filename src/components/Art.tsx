import { gradientCss, hash, scrimCss, THEMES, type ThemeKey } from "@/data/art";

// Generated art: a layered colour gradient in the theme's family, plus a light line motif.
// Decorative only (aria-hidden). Pass scrim to darken the bottom for overlaid white text.
export default function Art({
  theme,
  seed = "",
  className = "",
  scrim = false,
  motif = true,
}: {
  theme: ThemeKey;
  seed?: string;
  className?: string;
  scrim?: boolean;
  motif?: boolean;
}) {
  return (
    <span aria-hidden className={`${className.includes("absolute") ? "" : "relative "}block overflow-hidden ${className}`} style={{ background: gradientCss(theme, seed) }}>
      {motif && <MotifSvg theme={theme} seed={seed} />}
      {scrim && <span className="absolute inset-0" style={{ background: scrimCss(theme) }} />}
    </span>
  );
}

function MotifSvg({ theme, seed }: { theme: ThemeKey; seed: string }) {
  const h = hash(seed + theme);
  const x = 80 + (h % 240);
  const y = 40 + ((h >>> 8) % 140);
  const s = { fill: "none", stroke: "#fff", strokeWidth: 1.5 } as const;
  let shapes: React.ReactNode;
  switch (THEMES[theme].motif) {
    case "ripples":
      shapes = [30, 60, 95, 135, 180].map((r) => <circle key={r} cx={x} cy={y} r={r} {...s} opacity={0.35 - r / 700} />);
      break;
    case "waves":
      shapes = [0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M-20 ${y - 40 + i * 26} C 80 ${y - 90 + i * 26}, 160 ${y + 10 + i * 26}, 240 ${y - 40 + i * 26} S 360 ${y - 70 + i * 26}, 420 ${y - 30 + i * 26}`} {...s} strokeWidth={2} opacity={0.3 - i * 0.04} />
      ));
      break;
    case "blobs":
      shapes = (
        <>
          <circle cx={x} cy={y} r={70} fill="#fff" opacity={0.12} />
          <circle cx={x + 60} cy={y + 30} r={50} fill="#fff" opacity={0.1} />
          <circle cx={x - 50} cy={y + 50} r={36} fill="#fff" opacity={0.14} />
          <circle cx={x} cy={y} r={110} {...s} opacity={0.2} />
        </>
      );
      break;
    case "rings":
      shapes = (
        <>
          <circle cx={x - 35} cy={y} r={70} {...s} strokeWidth={2.5} opacity={0.35} />
          <circle cx={x + 35} cy={y} r={70} {...s} strokeWidth={2.5} opacity={0.35} />
          <circle cx={x} cy={y} r={130} {...s} opacity={0.15} />
        </>
      );
      break;
    case "lines":
      shapes = [0, 1, 2, 3, 4, 5, 6].map((i) => <line key={i} x1={-50 + i * 70} y1={320} x2={100 + i * 70} y2={-20} {...s} opacity={0.18} />);
      break;
    case "stars":
      shapes = (
        <>
          <circle cx={x} cy={y} r={44} fill="#fff" opacity={0.85} />
          <circle cx={x + 18} cy={y - 10} r={42} fill={THEMES[theme].stops[1]} opacity={0.95} />
          {[...Array(14)].map((_, i) => {
            const k = hash(seed + i);
            return <circle key={i} cx={k % 400} cy={(k >>> 9) % 300} r={1 + ((k >>> 4) % 3) * 0.6} fill="#fff" opacity={0.7} />;
          })}
        </>
      );
      break;
    case "rays":
      shapes = (
        <>
          {[...Array(12)].map((_, i) => {
            const a = (i * Math.PI) / 6;
            return <line key={i} x1={x + Math.cos(a) * 60} y1={y + Math.sin(a) * 60} x2={x + Math.cos(a) * 400} y2={y + Math.sin(a) * 400} {...s} strokeWidth={10} opacity={0.12} />;
          })}
          <circle cx={x} cy={y} r={46} fill="#fff" opacity={0.3} />
        </>
      );
      break;
    case "sun":
      shapes = (
        <>
          <circle cx={340} cy={70} r={56} fill="#FED35D" opacity={0.9} />
          <circle cx={340} cy={70} r={90} {...s} opacity={0.25} />
          <circle cx={340} cy={70} r={130} {...s} opacity={0.15} />
        </>
      );
      break;
    case "grid":
      shapes = [...Array(5)].flatMap((_, i) =>
        [...Array(8)].map((__, j) => <rect key={`${i}-${j}`} x={20 + j * 48} y={20 + i * 52} width={34} height={34} rx={8} {...s} opacity={(i + j + h) % 4 === 0 ? 0.45 : 0.14} />),
      );
      break;
  }
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {shapes}
    </svg>
  );
}
