// Crisis safety layer.
// Every user message is checked here BEFORE it reaches the AI, and the result
// is shown regardless of what the AI says. Keyword lists come from the
// "Trigger words" section of "Chirp Specification - full" (sections 1-7).

export type RiskLevel = "none" | "concern" | "urgent";

export interface CrisisResource {
  name: string;
  detail: string;
  href: string;
  action: string;
}

// US resources, verified current as of 2026. 988 replaced 1-800-273-8255 in 2022.
export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    name: "988 Suicide & Crisis Lifeline",
    detail: "Call or text 988, any time, free and confidential.",
    href: "tel:988",
    action: "Call 988",
  },
  {
    name: "988 by text",
    detail: "Text 988 to reach a trained counselor.",
    href: "sms:988",
    action: "Text 988",
  },
  {
    name: "Crisis Text Line",
    detail: "Text HOME to 741741.",
    href: "sms:741741?&body=HOME",
    action: "Text HOME to 741741",
  },
  {
    name: "The Trevor Project (LGBTQ+ young people)",
    detail: "Call 1-866-488-7386 or text START to 678-678.",
    href: "tel:18664887386",
    action: "Call Trevor",
  },
  {
    name: "SAMHSA National Helpline (substance use)",
    detail: "Call 1-800-662-4357, free, 24/7.",
    href: "tel:18006624357",
    action: "Call SAMHSA",
  },
  {
    name: "Emergency",
    detail: "If you are in immediate danger, call 911.",
    href: "tel:911",
    action: "Call 911",
  },
];

// Urgent: possible risk to life or safety (spec sections 1, 2 and overdose).
export const URGENT_PATTERNS: RegExp[] = [
  /\bsuicid/i,
  /\bkill(ing)?\s+my\s?self\b/i,
  /\bend(ing)?\s+(my|it)\s+(life|all)\b/i,
  /\bend\s+it\s+all\b/i,
  /\b(want|wanna|going)\s+to\s+die\b/i,
  /\bwant\s+to\s+be\s+dead\b/i,
  /\bbetter\s+off\s+dead\b/i,
  /\bno\s+(point|reason)\s+(in\s+)?(living|to\s+live)\b/i,
  /\bcan'?t\s+go\s+on\b/i,
  /\bdon'?t\s+want\s+to\s+(live|be\s+here|wake\s+up)\b/i,
  /\bcut(ting)?\s+my\s?self\b/i,
  /\bself[-\s]?harm/i,
  /\bhurt(ing)?\s+my\s?self\b/i,
  /\bself[-\s]?mutilat/i,
  /\boverdos/i,
  /\b(kill|hurt)\s+(him|her|them|someone|somebody|people)\b/i,
  /\b(being|getting)\s+(abused|hurt|hit)\b/i,
  /\bnot\s+safe\s+at\s+home\b/i,
];

// Concern: distress worth acknowledging and offering help for (spec sections 3-7).
export const CONCERN_PATTERNS: RegExp[] = [
  /\bhopeless\b/i,
  /\bworthless\b/i,
  /\bhelpless\b/i,
  /\bno\s+future\b/i,
  /\bpointless\b/i,
  /\bcan'?t\s+cope\b/i,
  /\bpanick?(ing)?\b/i,
  /\bpanic\s+attack/i,
  /\bcan'?t\s+breathe\b/i,
  /\bcan'?t\s+stop\s+worrying\b/i,
  /\bhearing\s+voices\b/i,
  /\bparanoid\b/i,
  /\bcan'?t\s+eat\b/i,
  /\bunbearable\b/i,
  /\bcan'?t\s+handle\s+(this|it)\b/i,
  /\baddicted\b/i,
  /\bcan'?t\s+stop\s+(drinking|using)\b/i,
  /\bneed\s+(drugs|a\s+drink)\b/i,
];

export function checkMessage(text: string): RiskLevel {
  if (URGENT_PATTERNS.some((p) => p.test(text))) return "urgent";
  if (CONCERN_PATTERNS.some((p) => p.test(text))) return "concern";
  return "none";
}

export function maxRisk(a: RiskLevel, b: RiskLevel): RiskLevel {
  const order: RiskLevel[] = ["none", "concern", "urgent"];
  return order[Math.max(order.indexOf(a), order.indexOf(b))];
}

// Fixed reply used when the keyword layer flags urgent risk and the AI is
// unavailable, so a person in crisis never gets an error message.
export const URGENT_FALLBACK_REPLY =
  "I'm really glad you told me. What you're feeling matters, and you deserve support from a real person right now. Please reach out to one of the people below. They're kind, free, and there any time. If you're in danger right now, call 911. Can you also tell a trusted adult or friend nearby?";
