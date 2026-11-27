// Hand-drawn SVG scene for each meditation, so every card matches what it's about.
// Bottom is darkened so overlaid white text stays readable.
export default function MeditationArt({ id, className = "", scrim = true }: { id: string; className?: string; scrim?: boolean }) {
  const S = SCENES[id] ?? SCENES.arrive;
  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden className={`block ${className}`}>
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          {S.sky.map((c, i) => (
            <stop key={i} offset={i / (S.sky.length - 1)} stopColor={c} />
          ))}
        </linearGradient>
        <linearGradient id={`scrim-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.35" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor={S.scrim} stopOpacity="0.92" />
        </linearGradient>
        <radialGradient id={`glow-${id}`}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#sky-${id})`} />
      {S.draw(id)}
      {scrim && <rect width="400" height="250" fill={`url(#scrim-${id})`} />}
    </svg>
  );
}

type Scene = { sky: string[]; scrim: string; draw: (id: string) => React.ReactNode };

const stars = (n: number, seed: number, h = 140) =>
  [...Array(n)].map((_, i) => {
    const x = (i * 97 + seed * 31) % 400;
    const y = (i * 53 + seed * 17) % h;
    return <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 1.8 : 1} fill="#fff" opacity={0.5 + (i % 3) * 0.2} />;
  });

const SCENES: Record<string, Scene> = {
  // Sunrise and a path leading in: arriving in the moment.
  arrive: {
    sky: ["#FFD8A8", "#FFA8A8", "#B197FC"],
    scrim: "#2B1A4D",
    draw: () => (
      <>
        <circle cx="200" cy="150" r="70" fill="url(#glow-arrive)" />
        <circle cx="200" cy="150" r="34" fill="#FFF3BF" />
        <path d="M0 160 Q100 120 200 150 T400 140 V250 H0 Z" fill="#9775FA" />
        <path d="M0 190 Q120 160 230 185 T400 175 V250 H0 Z" fill="#7048E8" />
        <path d="M185 250 Q195 205 200 185 Q205 205 215 250 Z" fill="#FFE8CC" opacity="0.85" />
      </>
    ),
  },
  // Expanding rings of breath.
  "breathing-space": {
    sky: ["#C5F6FA", "#66D9E8", "#1098AD"],
    scrim: "#0B3D4A",
    draw: () => (
      <>
        {[90, 70, 50, 32].map((r, i) => (
          <circle key={r} cx="200" cy="110" r={r} fill="#fff" opacity={0.12 + i * 0.1} />
        ))}
        <circle cx="200" cy="110" r="16" fill="#fff" />
        <path d="M60 110 C110 70 150 150 200 110 S290 70 340 110" fill="none" stroke="#fff" strokeWidth="3" opacity="0.7" strokeLinecap="round" />
      </>
    ),
  },
  // Mountains reflected in a still lake; a stone sinking in rings.
  "wise-mind-lake": {
    sky: ["#A5D8FF", "#74C0FC", "#E7F5FF"],
    scrim: "#0B2545",
    draw: () => (
      <>
        <path d="M0 140 L80 60 L130 110 L190 40 L260 120 L320 70 L400 140 Z" fill="#364FC7" />
        <path d="M190 40 L210 62 L200 60 L185 70 L172 60 Z" fill="#fff" />
        <rect y="140" width="400" height="110" fill="#1C7ED6" />
        <path d="M0 140 L80 210 L130 170 L190 230 L260 160 L320 200 L400 140 Z" fill="#4263EB" opacity="0.45" />
        {[10, 22, 36].map((r) => (
          <ellipse key={r} cx="230" cy="185" rx={r * 1.8} ry={r * 0.45} fill="none" stroke="#fff" strokeWidth="1.6" opacity={0.9 - r / 50} />
        ))}
      </>
    ),
  },
  // A winding stream with leaves floating by.
  "leaves-on-a-stream": {
    sky: ["#D3F9D8", "#8CE99A", "#2F9E44"],
    scrim: "#0B3B1E",
    draw: () => (
      <>
        <path d="M150 0 C120 60 260 90 220 140 S140 210 190 250 H270 C230 210 300 170 300 130 S200 60 230 0 Z" fill="#4DABF7" />
        <path d="M175 0 C150 60 270 90 240 140" fill="none" stroke="#D0EBFF" strokeWidth="3" opacity="0.8" />
        {[
          [205, 40, -20, "#F08C00"],
          [250, 110, 30, "#E8590C"],
          [215, 175, -10, "#FAB005"],
          [245, 225, 50, "#D9480F"],
        ].map(([x, y, r, c], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M0 -12 C10 -6 10 6 0 12 C-10 6 -10 -6 0 -12 Z" fill={c as string} />
            <path d="M0 -12 V12" stroke="#fff" strokeWidth="1" opacity="0.6" />
          </g>
        ))}
        <circle cx="70" cy="80" r="40" fill="#2B8A3E" />
        <circle cx="340" cy="60" r="50" fill="#2B8A3E" />
      </>
    ),
  },
  // A seated figure with a soft scanning band of light.
  "body-scan": {
    sky: ["#E5DBFF", "#B197FC", "#6741D9"],
    scrim: "#2B0A4D",
    draw: () => (
      <>
        <rect x="0" y="95" width="400" height="34" fill="url(#glow-body-scan)" opacity="0.7" />
        <rect x="0" y="108" width="400" height="6" fill="#fff" opacity="0.6" />
        <g fill="#fff" opacity="0.95">
          <circle cx="200" cy="62" r="20" />
          <path d="M168 150 C168 105 180 88 200 88 C220 88 232 105 232 150 Z" />
          <path d="M140 170 C160 150 240 150 260 170 C250 182 150 182 140 170 Z" />
        </g>
      </>
    ),
  },
  // A big curling wave: urges rise, peak and pass.
  "urge-surfing": {
    sky: ["#99E9F2", "#3BC9DB", "#0C8599"],
    scrim: "#08304A",
    draw: () => (
      <>
        <path d="M0 200 C60 200 90 80 190 70 C260 64 290 120 250 140 C230 150 215 130 230 120 C200 110 170 160 220 200 L400 200 V250 H0 Z" fill="#1864AB" />
        <path d="M190 70 C260 64 290 120 250 140 C230 150 215 130 230 120" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <path d="M0 215 Q50 205 100 215 T200 215 T300 215 T400 215 V250 H0 Z" fill="#1971C2" />
        <g transform="translate(120 160) rotate(-18)">
          <ellipse rx="26" ry="6" fill="#FED35D" />
        </g>
      </>
    ),
  },
  // A warm, glowing heart.
  "kindness-for-you": {
    sky: ["#FFDEEB", "#FAA2C1", "#D6336C"],
    scrim: "#5C0A2E",
    draw: () => (
      <>
        <circle cx="200" cy="105" r="95" fill="url(#glow-kindness-for-you)" opacity="0.7" />
        <path d="M200 160 C140 120 140 70 172 64 C190 60 200 76 200 84 C200 76 210 60 228 64 C260 70 260 120 200 160 Z" fill="#fff" />
        <path d="M200 145 C155 115 158 80 178 78 C192 76 200 90 200 96 C200 90 208 76 222 78 C242 80 245 115 200 145 Z" fill="#F06595" />
        {stars(10, 4, 220)}
      </>
    ),
  },
  // A cozy cabin with a warm window at dusk.
  "safe-place": {
    sky: ["#FFE8CC", "#FFC078", "#E8590C"],
    scrim: "#3D1A00",
    draw: () => (
      <>
        <circle cx="320" cy="70" r="26" fill="#FFF3BF" />
        <path d="M0 170 Q100 130 210 160 T400 150 V250 H0 Z" fill="#A9420A" />
        <g transform="translate(150 105)">
          <path d="M0 40 L50 0 L100 40 Z" fill="#5C2B0A" />
          <rect x="10" y="40" width="80" height="55" fill="#7A3A0E" />
          <rect x="22" y="52" width="20" height="18" fill="#FED35D" />
          <rect x="58" y="60" width="20" height="35" fill="#4A2006" />
          <circle cx="32" cy="61" r="22" fill="url(#glow-safe-place)" opacity="0.5" />
        </g>
        <path d="M60 175 l14 -40 l14 40 Z M90 172 l12 -34 l12 34 Z" fill="#2B5D1F" />
      </>
    ),
  },
  // Crescent moon over sleeping hills.
  "sleep-wind-down": {
    sky: ["#0B0B2E", "#1F1B5C", "#3B2F8F"],
    scrim: "#05051A",
    draw: () => (
      <>
        {stars(40, 9)}
        <circle cx="290" cy="70" r="34" fill="#FFF3BF" />
        <circle cx="304" cy="60" r="32" fill="#1F1B5C" />
        <path d="M0 180 Q90 140 190 170 T400 160 V250 H0 Z" fill="#2B246E" />
        <path d="M0 205 Q120 180 240 200 T400 195 V250 H0 Z" fill="#17134A" />
      </>
    ),
  },
};
