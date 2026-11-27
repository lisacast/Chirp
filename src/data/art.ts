// Chirp colour system and generated gradient art.
// Every module and section has its own colour family. Art is drawn in code (CSS gradients
// plus a light SVG motif), so it costs nothing and weighs almost nothing.

export type ThemeKey =
  | "mindfulness"
  | "distress"
  | "emotion"
  | "relationships"
  | "learn"
  | "meditate"
  | "joy"
  | "help"
  | "today"
  | "progress"
  | "practice";

export type Motif = "ripples" | "waves" | "blobs" | "rings" | "lines" | "stars" | "rays" | "sun" | "grid";

export interface Theme {
  name: string;
  /** deep, mid, bright, light. The deep stop sits behind text (white text passes AA on it). */
  stops: [string, string, string, string];
  /** solid colour for pills, bars, squares and badges (white text passes AA). */
  solid: string;
  /** light tint for soft backgrounds. */
  tint: string;
  motif: Motif;
}

export const THEMES: Record<ThemeKey, Theme> = {
  mindfulness: { name: "Mindfulness", stops: ["#03303D", "#0B7285", "#15AABF", "#99E9F2"], solid: "#0B7285", tint: "#E3FAFC", motif: "ripples" },
  distress: { name: "Distress Tolerance", stops: ["#4A1002", "#B83D0B", "#F76707", "#FFC078"], solid: "#B83D0B", tint: "#FFF4E6", motif: "waves" },
  emotion: { name: "Emotion Regulation", stops: ["#2B0A4D", "#7B2CBF", "#E64980", "#FCC2D7"], solid: "#7B2CBF", tint: "#F8F0FC", motif: "blobs" },
  relationships: { name: "Relationships", stops: ["#062E1E", "#187A4A", "#37B24D", "#C0EB75"], solid: "#187A4A", tint: "#EBFBEE", motif: "rings" },
  learn: { name: "Learn", stops: ["#001C38", "#1A56C4", "#4DABF7", "#FED35D"], solid: "#1A56C4", tint: "#E7F0FF", motif: "lines" },
  meditate: { name: "Meditate", stops: ["#0E0B33", "#3D3A9E", "#7950F2", "#D0BFFF"], solid: "#4C3FB0", tint: "#F3F0FF", motif: "stars" },
  joy: { name: "Joy", stops: ["#6B2300", "#D9480F", "#FD7E14", "#FFE066"], solid: "#C2410C", tint: "#FFF9DB", motif: "rays" },
  help: { name: "Help", stops: ["#3D0008", "#A3200D", "#E03131", "#FFA8A8"], solid: "#A3200D", tint: "#FFF5F5", motif: "rings" },
  today: { name: "Today", stops: ["#001C38", "#00264D", "#1A56C4", "#FED35D"], solid: "#001C38", tint: "#E7F0FF", motif: "sun" },
  progress: { name: "Progress", stops: ["#3B2A00", "#7A5C12", "#F59F00", "#FFE066"], solid: "#7A5C12", tint: "#FFF9DB", motif: "grid" },
  practice: { name: "Practice", stops: ["#002B36", "#0B5F73", "#20C997", "#FED35D"], solid: "#0B5F73", tint: "#E6FCF5", motif: "waves" },
};

/** Page -> theme. */
export const ART = {
  today: "today",
  welcome: "today",
  skills: "mindfulness",
  learn: "learn",
  meditate: "meditate",
  practice: "practice",
  progress: "progress",
  help: "help",
  faq: "learn",
  joy: "joy",
  mindful: "mindfulness",
  mood: "emotion",
} as const satisfies Record<string, ThemeKey>;

export const MODULE_THEME: Record<string, ThemeKey> = {
  mindfulness: "mindfulness",
  "distress-tolerance": "distress",
  "emotion-regulation": "emotion",
  interpersonal: "relationships",
};

export const SECTION_THEME: Record<string, ThemeKey> = {
  Foundations: "learn",
  Mindfulness: "mindfulness",
  "Distress Tolerance": "distress",
  "Emotion Regulation": "emotion",
  Relationships: "relationships",
  "Everyday Life": "joy",
  "Skill Guides": "learn",
};

export const moduleTheme = (id: string): Theme => THEMES[MODULE_THEME[id] ?? "learn"];
export const sectionTheme = (name: string): Theme => THEMES[SECTION_THEME[name] ?? "learn"];

/** Small deterministic hash so each card gets its own, stable composition. */
export function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** A layered "mesh" gradient: three soft colour pools over an angled base. */
export function gradientCss(key: ThemeKey, seed = ""): string {
  const [deep, mid, bright, light] = THEMES[key].stops;
  const h = hash(key + seed);
  const r = (shift: number, span: number, min = 0) => min + ((h >>> shift) % span);
  const angle = r(0, 360);
  return [
    `radial-gradient(ellipse at ${r(3, 60, 40)}% ${r(7, 40)}%, ${light}d9 0%, transparent 42%)`,
    `radial-gradient(ellipse at ${r(11, 50)}% ${r(15, 50, 10)}%, ${bright} 0%, transparent 55%)`,
    `radial-gradient(circle at ${r(19, 40, 60)}% ${r(23, 40, 60)}%, ${mid} 0%, transparent 60%)`,
    `linear-gradient(${angle}deg, ${deep} 0%, ${mid} 55%, ${bright} 100%)`,
  ].join(", ");
}

/** Gradient from the theme's deep colour up to clear, to sit behind white text. */
export const scrimCss = (key: ThemeKey) => {
  const deep = THEMES[key].stops[0];
  return `linear-gradient(to top, ${deep} 0%, ${deep}cc 30%, ${deep}00 75%)`;
};

/** The owner's photos (lakes, mountains, sky reflections, rain ripples), grouped by theme. */
export const PHOTOS: Record<ThemeKey, number[]> = {
  mindfulness: [36, 37, 38, 39, 40, 2, 4],
  distress: [33, 34, 35, 29, 41, 1],
  emotion: [6, 8, 24, 11, 13, 1],
  relationships: [30, 31, 32, 22, 23, 16],
  learn: [7, 14, 15, 21, 25, 12, 9, 10],
  meditate: [3, 5, 17, 18, 2, 4],
  joy: [42, 28, 26, 27],
  help: [1, 41],
  today: [42, 15, 3, 7, 12, 26, 30, 5, 19, 24, 28],
  progress: [19, 20, 27],
  practice: [37, 31, 16, 10],
};

export const MEDITATION_PHOTO: Record<string, number> = {
  arrive: 42,
  "breathing-space": 5,
  "wise-mind-lake": 15,
  "leaves-on-a-stream": 31,
  "body-scan": 18,
  "urge-surfing": 1,
  "kindness-for-you": 33,
  "safe-place": 32,
  "sleep-wind-down": 3,
};

export const photoSrc = (n: number, small = false) => `/photos/p${n}${small ? "-sm" : ""}.webp`;
export const pickPhoto = (key: ThemeKey, seed = "") => {
  const pool = PHOTOS[key];
  return pool[hash(seed + key) % pool.length];
};

/** Theme for an article: skill guides take their skill's module colour, others their section's. */
export const articleTheme = (a: { section: string; module?: string }): ThemeKey =>
  (a.module && MODULE_THEME[a.module]) || SECTION_THEME[a.section] || "learn";
