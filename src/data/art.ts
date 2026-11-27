// Chirp illustration library (the owner's tree and branch artwork, resized to WebP in /public/art).
export type ArtId = number;

export const ART = {
  today: 19,
  welcome: 18,
  skills: 43,
  learn: 39,
  meditate: 40,
  practice: 31,
  progress: 37,
  help: 45,
  faq: 23,
  joy: 51,
  mindful: 21,
  mood: 17,
} as const;

export const MODULE_ART: Record<string, number[]> = {
  mindfulness: [21, 42, 17, 55],
  "distress-tolerance": [33, 30, 34, 45],
  "emotion-regulation": [47, 44, 49, 48],
  interpersonal: [50, 54, 56, 51],
};

export const SECTION_ART: Record<string, number[]> = {
  Foundations: [39, 41, 37, 43, 40],
  Mindfulness: [21, 17, 42, 55],
  "Distress Tolerance": [30, 33, 34, 45],
  "Emotion Regulation": [47, 44, 49, 48],
  Relationships: [50, 54, 51, 56],
  "Everyday Life": [23, 22, 25, 31, 19, 18, 40, 37, 41],
};

export const MEDITATION_ART: Record<string, number> = {
  arrive: 18,
  "breathing-space": 21,
  "wise-mind-lake": 47,
  "leaves-on-a-stream": 55,
  "body-scan": 49,
  "urge-surfing": 34,
  "kindness-for-you": 51,
  "safe-place": 48,
  "sleep-wind-down": 22,
};

export const artSrc = (n: number, small = false) => `/art/tree-${n}${small ? "-sm" : ""}.webp`;

/** Illustration for an article: rotates through its section's pool. */
export function articleArt(section: string, slug: string, all: { section: string; slug: string }[]): number {
  const pool = SECTION_ART[section] ?? [39];
  const i = all.filter((a) => a.section === section).findIndex((a) => a.slug === slug);
  return pool[Math.max(0, i) % pool.length];
}
