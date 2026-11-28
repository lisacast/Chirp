// Skills bingo: a 5x5 card of 24 skills with a free square in the middle.
export const BINGO_SKILLS = [
  "wise-mind", "observe", "describe", "participate", "non-judgmental",
  "one-mindfully", "effectively", "accepts", "self-soothe", "improve",
  "pros-cons", "radical-acceptance", "turning-the-mind", "willingness",
  "opposite-action-dt", "name-emotions", "obstacles", "please", "positive-events",
  "mindful-emotions", "opposite-action-er", "dear-man", "give", "fast",
];

export const FREE = "__free__";

/** The card, row by row, with the free square at the center. */
export const CARD: string[] = [...BINGO_SKILLS.slice(0, 12), FREE, ...BINGO_SKILLS.slice(12)];

export const LINES: number[][] = [
  ...[0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3, 4].map((c) => r * 5 + c)),
  ...[0, 1, 2, 3, 4].map((c) => [0, 1, 2, 3, 4].map((r) => r * 5 + c)),
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

export function bingoState(practiced: string[]) {
  const done = CARD.map((id) => id === FREE || practiced.includes(id));
  const lines = LINES.filter((l) => l.every((i) => done[i]));
  return { done, lines, count: done.filter(Boolean).length, full: done.every(Boolean) };
}

/** Short labels that fit a bingo square. */
export const SHORT: Record<string, string> = {
  "non-judgmental": "Non-Judging",
  accepts: "ACCEPTS",
  "self-soothe": "Self-Soothe",
  improve: "IMPROVE",
  "opposite-action-dt": "Opposite Action",
  "turning-the-mind": "Turn the Mind",
  "name-emotions": "Name Emotions",
  obstacles: "Check Obstacles",
  please: "PLEASE",
  "positive-events": "Positive Events",
  "mindful-emotions": "Mindful of Emotions",
  "opposite-action-er": "Opposite Emotion",
  "radical-acceptance": "Radical Accept\u00adance",
};
