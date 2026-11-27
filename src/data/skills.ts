// PlayChirp skill library.
// Skill list and taglines follow "Chirp Specification - full" (Skills overview +
// Flashcard learning approach). Descriptions and steps are written for PlayChirp.

export type ModuleId =
  | "mindfulness"
  | "distress-tolerance"
  | "emotion-regulation"
  | "interpersonal";

export interface SkillModule {
  id: ModuleId;
  name: string;
  tagline: string;
  color: string; // tailwind-friendly hex from the PlayChirp palette
}

export interface Skill {
  id: string;
  module: ModuleId;
  name: string;
  tagline: string;
  what: string;
  steps: string[];
}

export const MODULES: SkillModule[] = [
  {
    id: "mindfulness",
    name: "Core Mindfulness",
    tagline: "Rooted in the present, responsive not reactive.",
    color: "#1A56C4",
  },
  {
    id: "distress-tolerance",
    name: "Distress Tolerance",
    tagline: "Get through tough moments without making them worse.",
    color: "#C8321E",
  },
  {
    id: "emotion-regulation",
    name: "Emotion Regulation",
    tagline: "Understand your feelings and steer them.",
    color: "#7A5C12",
  },
  {
    id: "interpersonal",
    name: "Interpersonal Effectiveness",
    tagline: "Ask for what you need and keep your relationships strong.",
    color: "#001C38",
  },
];

export const SKILLS: Skill[] = [
  // ---------- Core Mindfulness ----------
  {
    id: "wise-mind",
    module: "mindfulness",
    name: "Wise Mind",
    tagline: "Where feeling and thinking meet.",
    what: "Wise Mind is the part of you that hears both your emotions and your logic, and then knows what to do.",
    steps: [
      "Take a slow breath in and out.",
      "Ask yourself: what is my emotion saying? What do the facts say?",
      "Breathe in and ask, \"What does my Wise Mind know?\" Breathe out and listen.",
      "Notice the answer that feels calm and true, even if it's small.",
    ],
  },
  {
    id: "observe",
    module: "mindfulness",
    name: "Observe",
    tagline: "Notice the world, awaken your senses, live fully.",
    what: "Just notice what is happening, inside and around you, without trying to change it.",
    steps: [
      "Pause and pick one sense, like sound.",
      "Notice what you hear for 30 seconds without labeling it good or bad.",
      "Notice thoughts and feelings come and go, like clouds passing.",
    ],
  },
  {
    id: "describe",
    module: "mindfulness",
    name: "Describe",
    tagline: "Clarify your experiences, foster understanding, build empathy.",
    what: "Put words to what you noticed. Stick to the facts, not opinions.",
    steps: [
      "Say what you notice: \"I'm having the thought that...\" or \"I feel tightness in my chest.\"",
      "Separate facts from interpretations.",
      "Use simple, specific words.",
    ],
  },
  {
    id: "participate",
    module: "mindfulness",
    name: "Participate",
    tagline: "Engage wholeheartedly, enhance joy, lessen life's pressures.",
    what: "Throw yourself fully into what you're doing right now.",
    steps: [
      "Pick an activity: music, a game, cooking, a walk.",
      "Let go of self-consciousness and dive in.",
      "When your mind drifts, gently bring it back to the activity.",
    ],
  },
  {
    id: "non-judgmental",
    module: "mindfulness",
    name: "Non-Judgmental Stance",
    tagline: "Acceptance opens doors, fostering peace and understanding.",
    what: "Notice without labeling things as good or bad, right or wrong.",
    steps: [
      "Catch a judgment, like \"this is stupid\" or \"I'm terrible.\"",
      "Restate it as a fact: \"I made a mistake on the test.\"",
      "Don't judge yourself for judging. Just notice and let it go.",
    ],
  },
  {
    id: "one-mindfully",
    module: "mindfulness",
    name: "One-Mindfully",
    tagline: "Focus, embrace the moment, increase satisfaction.",
    what: "Do one thing at a time, with your full attention.",
    steps: [
      "Choose one task and put other things away.",
      "When you notice your mind on something else, gently return.",
      "Repeat as many times as needed. That's the practice.",
    ],
  },
  {
    id: "effectively",
    module: "mindfulness",
    name: "Effectively",
    tagline: "Meet goals, create harmony, unlock potential.",
    what: "Focus on what works, instead of what's \"fair\" or \"right.\"",
    steps: [
      "Ask: what is my goal in this situation?",
      "Ask: what would actually help me reach it?",
      "Do that, even if part of you wants to prove a point.",
    ],
  },

  // ---------- Distress Tolerance ----------
  {
    id: "accepts",
    module: "distress-tolerance",
    name: "Distract (ACCEPTS)",
    tagline: "Create distance from intense emotions for relief.",
    what: "Shift your attention for a while so a big feeling can cool down.",
    steps: [
      "Activities: do something that takes focus, like a puzzle or a walk.",
      "Contributing: help someone else.",
      "Comparisons: remember a time you got through something hard.",
      "Emotions: watch or listen to something that brings a different feeling.",
      "Pushing away: put the problem on a mental shelf for now.",
      "Thoughts: count, name colors, recite lyrics.",
      "Sensations: hold ice, take a cool shower, eat something sour.",
    ],
  },
  {
    id: "self-soothe",
    module: "distress-tolerance",
    name: "Self-Soothe with Five Senses",
    tagline: "Engage your senses to create calm and peace.",
    what: "Be kind to yourself through sight, sound, smell, taste and touch.",
    steps: [
      "Sight: look at something beautiful or calming.",
      "Sound: put on soothing music or nature sounds.",
      "Smell: breathe in a scent you love.",
      "Taste: slowly savor a favorite drink or snack.",
      "Touch: wrap up in something soft or hold a pet.",
    ],
  },
  {
    id: "improve",
    module: "distress-tolerance",
    name: "Improve the Moment (IMPROVE)",
    tagline: "Make a hard moment a little more bearable.",
    what: "Small mental moves that make right now easier to get through.",
    steps: [
      "Imagery: picture a safe, peaceful place.",
      "Meaning: find a purpose or lesson in the pain.",
      "Prayer or connection: open to something bigger than you.",
      "Relaxation: loosen your shoulders, slow your breath.",
      "One thing in the moment: focus only on now.",
      "Vacation: take a short, healthy break.",
      "Encouragement: tell yourself, \"I can get through this.\"",
    ],
  },
  {
    id: "pros-cons",
    module: "distress-tolerance",
    name: "Pros and Cons",
    tagline: "Think it through before acting on an urge.",
    what: "Compare what happens if you act on an urge versus if you ride it out.",
    steps: [
      "Write the pros and cons of acting on the urge.",
      "Write the pros and cons of resisting it.",
      "Look at short-term and long-term results.",
      "Choose what your Wise Mind says.",
    ],
  },
  {
    id: "comparisons",
    module: "distress-tolerance",
    name: "Comparisons",
    tagline: "Find perspective in others' experiences.",
    what: "Gain perspective by comparing now to harder times you've survived.",
    steps: [
      "Remember a time you felt worse and got through it.",
      "Notice what helped you then.",
      "Remind yourself: this feeling will pass too.",
    ],
  },
  {
    id: "opposite-action-dt",
    module: "distress-tolerance",
    name: "Opposite Action",
    tagline: "Do the opposite of an urge that won't help.",
    what: "When an emotion pushes you toward something unhelpful, act the opposite way.",
    steps: [
      "Name the emotion and the urge.",
      "Ask: does acting on this urge help me?",
      "If not, do the opposite, all the way. Face your face, posture and voice the opposite way too.",
    ],
  },
  {
    id: "radical-acceptance",
    module: "distress-tolerance",
    name: "Radical Acceptance",
    tagline: "Fully accept reality to reduce suffering.",
    what: "Accept what you can't change, completely. Accepting is not the same as approving.",
    steps: [
      "Notice you're fighting reality (\"This shouldn't be happening!\").",
      "Remind yourself: this is what is happening right now.",
      "Let your body accept too: relax your hands, soften your face.",
      "Acknowledge you can still choose what to do next.",
    ],
  },
  {
    id: "turning-the-mind",
    module: "distress-tolerance",
    name: "Turning the Mind",
    tagline: "Choose acceptance again and again.",
    what: "Acceptance is a choice you make over and over, like turning down a path.",
    steps: [
      "Notice when you're not accepting.",
      "Make an inner commitment to accept.",
      "Do it again each time you drift. That's normal.",
    ],
  },
  {
    id: "willingness",
    module: "distress-tolerance",
    name: "Willingness",
    tagline: "Be open to the moment as it is.",
    what: "Willingness means doing what the situation needs. Willfulness is refusing, sitting on your hands, or insisting.",
    steps: [
      "Notice willfulness (\"No way!\", crossed arms).",
      "Name it without judging.",
      "Try a willing posture: open hands, half-smile.",
      "Ask: what's needed right now?",
    ],
  },

  // ---------- Emotion Regulation ----------
  {
    id: "name-emotions",
    module: "emotion-regulation",
    name: "Identify and Label Emotions",
    tagline: "Learn to identify and express feelings.",
    what: "Naming a feeling helps tame it.",
    steps: [
      "What happened just before the feeling?",
      "What do you notice in your body?",
      "What do you want to do or say?",
      "Pick a name: sad, angry, scared, ashamed, jealous, happy, love...",
    ],
  },
  {
    id: "obstacles",
    module: "emotion-regulation",
    name: "Identify Obstacles to Changing Emotions",
    tagline: "Recognize emotions as guides.",
    what: "Emotions have jobs: they warn us, motivate us and communicate. Knowing why a feeling sticks around helps you change it.",
    steps: [
      "Ask: what is this emotion trying to do for me?",
      "Ask: is something rewarding this feeling, or keeping it going?",
      "Check the facts: does the feeling fit what's really happening?",
    ],
  },
  {
    id: "please",
    module: "emotion-regulation",
    name: "Reduce Vulnerability (PLEASE)",
    tagline: "Care for your body to balance emotions.",
    what: "Taking care of your body makes big emotions less likely to take over.",
    steps: [
      "PL: treat Physical iLlness. Rest and get help when you're sick.",
      "E: Eat balanced meals, not too much or too little.",
      "A: Avoid mood-altering drugs and alcohol.",
      "S: get enough Sleep.",
      "E: get some Exercise each day.",
      "Bonus, build mastery: do one thing each day that makes you feel capable.",
    ],
  },
  {
    id: "positive-events",
    module: "emotion-regulation",
    name: "Increase Positive Emotional Events",
    tagline: "Seek joy and fulfillment.",
    what: "Add small pleasant moments every day, and work toward things you care about.",
    steps: [
      "Pick one pleasant activity for today. (Try the Joy Finder for ideas!)",
      "Be fully present for it.",
      "Notice the good feeling, and let worries wait.",
    ],
  },
  {
    id: "mindful-emotions",
    module: "emotion-regulation",
    name: "Mindfulness of Current Emotions",
    tagline: "Observe emotions without judgment.",
    what: "Let a feeling be there, like a wave, without pushing it away or holding on.",
    steps: [
      "Notice where the emotion is in your body.",
      "Breathe and watch it rise and fall.",
      "Remind yourself: \"I am not my emotion.\"",
      "Notice it changing over time.",
    ],
  },
  {
    id: "opposite-action-er",
    module: "emotion-regulation",
    name: "Take Opposite Action",
    tagline: "Challenge overpowering emotions with opposite actions.",
    what: "If an emotion doesn't fit the facts, acting opposite to it can shrink it.",
    steps: [
      "Fear: approach what's safe but scary.",
      "Anger: be gently kind, or step away.",
      "Sadness: get active, reach out.",
      "Shame: hold your head up, if you haven't broken your values.",
    ],
  },
  {
    id: "apply-dt",
    module: "emotion-regulation",
    name: "Apply Distress Tolerance",
    tagline: "When it's too much, get through it first.",
    what: "When an emotion is too intense to work on, use distress tolerance skills to get through the moment first.",
    steps: [
      "Rate the emotion from 0 to 100.",
      "If it's very high, pick a Distress Tolerance skill (Distract, Self-Soothe, IMPROVE).",
      "Come back to problem-solving when it's lower.",
    ],
  },

  // ---------- Interpersonal Effectiveness ----------
  {
    id: "dear-man",
    module: "interpersonal",
    name: "DEAR MAN",
    tagline: "Clearly ask for what you need.",
    what: "A script for asking for something or saying no, so you're more likely to get what you need.",
    steps: [
      "Describe the situation with facts.",
      "Express how you feel (\"I feel...\").",
      "Assert: ask clearly, or say no clearly.",
      "Reinforce: explain how it helps them too.",
      "Mindful: stay on topic, like a broken record if needed.",
      "Appear confident: steady voice, eye contact.",
      "Negotiate: be willing to give to get.",
    ],
  },
  {
    id: "give",
    module: "interpersonal",
    name: "GIVE",
    tagline: "Keep the relationship strong.",
    what: "How to talk so the other person feels respected and the relationship stays good.",
    steps: [
      "Gentle: no attacks, threats or judging.",
      "Interested: listen and don't interrupt.",
      "Validate: show you understand their side.",
      "Easy manner: smile, use a little humor, stay light.",
    ],
  },
  {
    id: "fast",
    module: "interpersonal",
    name: "FAST",
    tagline: "Keep your self-respect.",
    what: "How to stay true to yourself in a conversation.",
    steps: [
      "Fair: be fair to yourself and the other person.",
      "Apologies: no over-apologizing for things that aren't wrong.",
      "Stick to your values.",
      "Truthful: no lying, exaggerating or acting helpless.",
    ],
  },
];

export function getSkill(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}

export function getModule(id: ModuleId): SkillModule {
  return MODULES.find((m) => m.id === id)!;
}
