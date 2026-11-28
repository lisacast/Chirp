// Tips and tricks, and the "Right now" finder for the Help page.

export interface Tip {
  title: string;
  body: string;
  skillId?: string;
}

export const TIP_GROUPS: { name: string; tips: Tip[] }[] = [
  {
    name: "In the moment",
    tips: [
      { title: "Cold water reset", body: "Splash cold water on your face or hold something cold for 30 seconds. It can slow a racing heart fast.", skillId: "self-soothe" },
      { title: "Long exhale", body: "Breathe out longer than you breathe in: in for 4, out for 6. Three rounds is enough to start.", skillId: "self-soothe" },
      { title: "Name five blue things", body: "Look around and find five blue things. It pulls your attention out of spinning thoughts.", skillId: "accepts" },
      { title: "15-minute delay", body: "Tell an urge: maybe later, but not for 15 minutes. Most urges shrink while you wait.", skillId: "willingness" },
      { title: "Shake it out", body: "Shake your hands, arms and legs hard for 30 seconds. Big feelings carry energy that needs to go somewhere.", skillId: "improve" },
      { title: "Half-smile", body: "Relax your face and turn up the corners of your lips slightly. Your body can nudge your mood.", skillId: "radical-acceptance" },
    ],
  },
  {
    name: "Every day",
    tips: [
      { title: "One pleasant thing", body: "Plan one small good thing every day, then really pay attention while it happens.", skillId: "positive-events" },
      { title: "Same bedtime", body: "A steady sleep schedule is one of the strongest mood protectors there is.", skillId: "please" },
      { title: "Check in twice", body: "Ask yourself 'What am I feeling?' once in the morning and once at night. Practice makes naming faster.", skillId: "name-emotions" },
      { title: "One thing at a time", body: "Pick one daily task, like brushing your teeth, and do only that, with full attention.", skillId: "one-mindfully" },
      { title: "Move a little", body: "A 10-minute walk counts. Movement lowers stress and helps sleep.", skillId: "please" },
      { title: "Do one hard thing", body: "Each day, do one thing that's a little challenging. Feeling capable builds confidence.", skillId: "positive-events" },
    ],
  },
  {
    name: "With other people",
    tips: [
      { title: "Write your DEAR MAN first", body: "Before a hard ask, jot down Describe, Express, Assert, Reinforce. It keeps you on track.", skillId: "dear-man" },
      { title: "Validate first", body: "Start with 'I get why you feel that way.' People listen better when they feel understood.", skillId: "give" },
      { title: "Drop the extra sorry", body: "Notice when you apologize for having a need. One apology, when it fits, is plenty.", skillId: "fast" },
      { title: "Broken record", body: "If someone changes the subject, calmly repeat your request. Same words, same calm voice.", skillId: "dear-man" },
      { title: "Ask, don't assume", body: "Before reacting to a message, ask: is there another explanation? Then check the facts.", skillId: "obstacles" },
      { title: "Plan a time-out", body: "Agree ahead of time on a word that means 'let's take a break and come back to this.'", skillId: "give" },
    ],
  },
  {
    name: "Thoughts and feelings",
    tips: [
      { title: "'And' not 'but'", body: "'I'm upset AND I can handle this.' Two things can be true at once.", skillId: "wise-mind" },
      { title: "Thoughts are not facts", body: "Say 'I'm having the thought that...' before a worry. It creates a little distance.", skillId: "describe" },
      { title: "Swap the label", body: "Replace 'I'm so stupid' with what happened and how you feel. Facts, not judgments.", skillId: "non-judgmental" },
      { title: "Ride the wave", body: "Feelings rise and fall. Notice the peak, and remind yourself it will pass.", skillId: "mindful-emotions" },
      { title: "Opposite, all the way", body: "If a feeling doesn't fit the facts, do the opposite of its urge with your whole body.", skillId: "opposite-action-er" },
      { title: "It is what it is", body: "For things you can't change, practice saying 'It is what it is' and loosening your shoulders.", skillId: "radical-acceptance" },
    ],
  },
];

export interface SosOption {
  id: string;
  label: string;
  emoji: string;
  intro: string;
  steps: string[];
  skillIds: string[];
  listen?: string; // meditation id
}

export const SOS: SosOption[] = [
  {
    id: "overwhelmed",
    label: "Overwhelmed",
    emoji: "🌊",
    intro: "Too much at once. Let's turn the volume down first, then pick one thing.",
    steps: ["Breathe out slowly, longer than you breathe in, three times.", "Splash cold water on your face or hold something cold.", "Write down everything on your mind, then circle just ONE thing to do next."],
    skillIds: ["self-soothe", "one-mindfully", "improve"],
    listen: "breathing-space",
  },
  {
    id: "anxious",
    label: "Anxious or panicky",
    emoji: "😰",
    intro: "Your body's alarm is going off. You're safe enough right now to slow it down.",
    steps: ["Feel your feet on the floor. Press them down.", "Name 5 things you see, 4 you can touch, 3 you hear.", "Breathe in for 4 and out for 6 until your heart slows."],
    skillIds: ["observe", "self-soothe", "accepts"],
    listen: "arrive",
  },
  {
    id: "angry",
    label: "Angry",
    emoji: "😡",
    intro: "Anger has a lot of energy. Let's use it safely before deciding anything.",
    steps: ["Step away from the person or the screen for a few minutes.", "Burn the energy: fast walk, jumping jacks, or shake it out.", "Unclench your hands and jaw. Then ask: what do I actually want to happen?"],
    skillIds: ["opposite-action-er", "pros-cons", "dear-man"],
  },
  {
    id: "sad",
    label: "Sad or low",
    emoji: "🌧️",
    intro: "Sadness tells you something matters. Be gentle with yourself while you feel it.",
    steps: ["Put a hand on your heart and say: this is really hard right now.", "Do one tiny kind thing: a warm drink, a blanket, a favorite song.", "If you can, text one person, even just to say hi."],
    skillIds: ["self-soothe", "positive-events", "opposite-action-er"],
    listen: "kindness-for-you",
  },
  {
    id: "urge",
    label: "Having an urge",
    emoji: "⚡",
    intro: "Urges rise and fall like waves. You don't have to act on this one.",
    steps: ["Name it: I'm having the urge to...", "Wait 15 minutes. Set a timer and do something else while it runs.", "List the pros and cons of acting on it, and of not acting on it."],
    skillIds: ["willingness", "pros-cons", "accepts"],
    listen: "urge-surfing",
  },
  {
    id: "conflict",
    label: "Fighting with someone",
    emoji: "💬",
    intro: "Conflict hurts. A pause and a plan can protect both you and the relationship.",
    steps: ["Take a break before replying. It's okay to say 'I need a minute.'", "Ask yourself: what matters most here, my goal, the relationship, or my self-respect?", "Plan what you'll say using DEAR MAN, and start with something validating."],
    skillIds: ["dear-man", "give", "fast"],
  },
  {
    id: "numb",
    label: "Numb or empty",
    emoji: "😶",
    intro: "Feeling nothing can be its own kind of hard. Let's gently wake up your senses.",
    steps: ["Hold an ice cube or run cool water over your hands.", "Smell something strong: coffee, peppermint, a candle.", "Move: walk around, stretch, or put on a song and sway."],
    skillIds: ["self-soothe", "participate", "observe"],
    listen: "body-scan",
  },
  {
    id: "cant-sleep",
    label: "Can't sleep",
    emoji: "🌙",
    intro: "Lying awake is frustrating. Let's make rest easier, even if sleep takes a while.",
    steps: ["Put your phone face down and dim the lights.", "Breathe in for 4, out for 6 to 8, and relax one body part at a time.", "If worries spin, write them down for tomorrow."],
    skillIds: ["please", "self-soothe"],
    listen: "sleep-wind-down",
  },
];
