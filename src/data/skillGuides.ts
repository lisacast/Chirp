// In-depth guide for every Chirp skill: what it is, why it works, a real-life example,
// how to practice it, where people get stuck, and which Chirp tools to use.
import type { Article } from "./articles";
import { getSkill } from "./skills";
import { TOOLS } from "./tools";

interface Guide {
  id: string; // skill id
  dek: string;
  why: string[];
  example: string[];
  practice: string[];
  stuck: string[];
  tip: string;
}

const G: Guide[] = [
  {
    id: "wise-mind",
    dek: "The calm, knowing place inside you where feelings and facts meet.",
    why: [
      "DBT describes three states of mind. Emotion mind is when feelings are driving: everything feels urgent and you act fast. Reasonable mind is when you're all logic and ignore how you feel. Wise mind is the overlap, where you can feel your emotions fully and still see the facts clearly.",
      "Most regretted decisions happen in emotion mind. Most stuck, joyless decisions happen in reasonable mind. Wise mind gives you a third option, and everyone has one, even if it's hard to hear sometimes.",
    ],
    example: [
      "Maya, 16, sees a group photo from a party she wasn't invited to. Emotion mind says: text the group something sharp, right now. Reasonable mind says: it doesn't matter, ignore it. Neither feels right.",
      "She takes three slow breaths and asks, \"What does my wise mind know?\" The answer is quieter: she's hurt, she misses these friends, and she wants to know if something's wrong. She decides to message the one friend she trusts most tomorrow, when she's calmer.",
    ],
    practice: [
      "Breathe in and silently say \"wise\". Breathe out and say \"mind\". Repeat for a minute.",
      "Before a decision, ask two questions: What is my emotion telling me? What do the facts say? Then ask: what's the wise move that respects both?",
      "Imagine dropping a stone into a still lake and following it down to the calm at the bottom. Notice what you know from there.",
      "Use the wise mind slider in Chirp to notice where you are right now.",
    ],
    stuck: [
      "\"I can't hear my wise mind.\" That's normal when feelings are big. Use a calming skill first, then ask again.",
      "Wise mind isn't always the \"nice\" answer. Sometimes it says: set a boundary, or leave.",
      "If the answer feels frantic or harsh, it's probably emotion mind dressed up. Wise mind usually feels steady.",
    ],
    tip: "Wise mind answers are often short and quiet. If you need a long speech to convince yourself, check again.",
  },
  {
    id: "observe",
    dek: "Notice what's happening, inside and around you, without grabbing on or pushing away.",
    why: [
      "Observing is the first mindfulness \"what\" skill. It means paying attention on purpose: to sounds, sensations, thoughts and feelings, as they are.",
      "When you can observe a feeling, you're not completely inside it anymore. That small gap is where choice lives. Observing also slows racing thoughts, because your attention has somewhere concrete to land.",
    ],
    example: [
      "Jordan is lying awake before a big exam, mind spinning. Instead of fighting the thoughts, he observes: the hum of the fridge, the weight of the blanket, his heart beating fast, the thought \"I'm going to fail\" passing through.",
      "He doesn't argue with the thought. He notices it like a car driving by. After a few minutes, his body is a little calmer, and the thought has less grip.",
    ],
    practice: [
      "Pick one sense for 60 seconds. Just notice: sounds near, sounds far, sounds inside you.",
      "Do 5-4-3-2-1 grounding: five things you see, four you can touch, three you hear, two you smell, one you taste.",
      "Watch your thoughts like clouds or leaves on a stream. Notice them arrive and leave.",
      "Hold an ice cube or a warm mug and notice every sensation as it changes.",
    ],
    stuck: [
      "Your mind will wander, over and over. Noticing that it wandered is the skill working.",
      "Observing isn't the same as liking. You can observe something uncomfortable.",
      "If observing your body feels overwhelming, observe something outside you instead.",
    ],
    tip: "Start with your senses. They are always in the present moment, even when your thoughts aren't.",
  },
  {
    id: "describe",
    dek: "Put plain words to what you notice, and separate facts from the stories your mind adds.",
    why: [
      "Describing means labeling your experience in words: \"I notice my chest is tight\", \"I'm having the thought that nobody likes me\", \"I feel embarrassed\".",
      "Words create distance. When you say \"I'm having the thought that I'm a failure\" instead of \"I'm a failure\", you remember it's a thought, not a fact. Describing also helps other people understand you, because you're telling them what's actually happening.",
    ],
    example: [
      "Priya's friend didn't reply for six hours. Her mind says: she's mad at me. Priya describes instead: \"Fact: she hasn't replied. Thought: she's mad. Feeling: anxious. Body: stomach in knots.\"",
      "Seeing it written out, Priya notices there are other explanations. Her friend posted from a family dinner an hour ago. The anxiety drops from an 8 to a 4.",
    ],
    practice: [
      "Use the phrase \"I'm having the thought that…\" before worries.",
      "Describe an object near you using only facts: color, shape, texture, temperature.",
      "When a strong feeling shows up, name three things: the feeling, where it is in your body, and the urge it brings.",
      "Try the Judgment flip cards in Chirp to practice turning opinions into descriptions.",
    ],
    stuck: [
      "Interpretations sneak in. \"She ignored me\" is an interpretation. \"She didn't say hi\" is a description.",
      "You don't need perfect words. \"Bad, heavy, buzzy\" counts.",
      "Describing a feeling doesn't mean you have to share it with anyone.",
    ],
    tip: "If you couldn't film it with a camera, it's probably an interpretation, not a fact.",
  },
  {
    id: "participate",
    dek: "Throw yourself fully into what you're doing, and let self-consciousness go.",
    why: [
      "Participating means becoming one with an activity: dancing, playing, talking, working, without standing outside yourself judging how it looks.",
      "A lot of suffering comes from watching ourselves from the outside. Participating is the opposite. It's where flow, fun and real connection happen. It also builds confidence, because you learn you can be fully yourself in the moment.",
    ],
    example: [
      "Sam always hangs back at team practice, worried about looking awkward. One week Sam tries to just play: eyes on the ball, listening to teammates, moving without second-guessing.",
      "Sam still makes mistakes, but notices the game is more fun and the time flies. Afterward, a teammate says it was the best Sam has played.",
    ],
    practice: [
      "Put on one song and dance or move to it with your whole body.",
      "Pick a daily activity, like cooking or a walk, and give it 100% of your attention.",
      "In a conversation, focus fully on the other person instead of planning what to say.",
      "When you catch yourself watching yourself, gently turn your attention back to the activity.",
    ],
    stuck: [
      "Participating isn't reckless. Use wise mind to choose what to throw yourself into.",
      "It's okay to start small: one song, one game, one conversation.",
      "Self-conscious thoughts will come. Let them pass and come back to the action.",
    ],
    tip: "Pretend for a minute that nobody's watching. Usually, they aren't.",
  },
  {
    id: "non-judgmental",
    dek: "See things as they are, without labeling them good or bad, right or wrong.",
    why: [
      "Judgments are shortcuts: stupid, gross, terrible, perfect. They pile extra emotion on top of the facts. Calling yourself an idiot after a mistake adds shame on top of disappointment.",
      "Taking a non-judgmental stance doesn't mean pretending everything is fine. It means describing the facts and the consequences. That keeps you clear-headed enough to actually fix things.",
    ],
    example: [
      "Leo fails a quiz and thinks, \"I'm so stupid, I'll never get this.\" He tries again, without the judgment: \"I got 4 out of 10. I didn't understand the second half. I feel disappointed. I want to do better next time.\"",
      "The second version still stings, but it points to something he can do: ask the teacher about the second half.",
    ],
    practice: [
      "Catch one judgment a day and rewrite it as a fact plus a feeling.",
      "Notice judgments about other people, too, and describe instead.",
      "Don't judge yourself for judging. Just notice: \"There's a judgment,\" and let it go.",
      "Use the Judgment flip deck in Chirp for practice.",
    ],
    stuck: [
      "Non-judgmental isn't approving. You can be non-judgmental and still say something was harmful.",
      "Preferences are fine. \"I don't like this\" is a description of you, not a judgment of it.",
      "It takes lots of repetition. Judgments are habits built over years.",
    ],
    tip: "Swap \"should\" for \"I wish\" or \"I want\". It turns a judgment into a preference.",
  },
  {
    id: "one-mindfully",
    dek: "Do one thing at a time, with your whole attention.",
    why: [
      "Multitasking splits attention and raises stress. Doing one thing mindfully means focusing on just this: this conversation, this homework question, this bite of food.",
      "It also helps with worry. If you're washing dishes while rehearsing tomorrow's argument, you're suffering twice. One-mindfully brings you back to the only moment you can act in.",
    ],
    example: [
      "Aisha studies with her phone buzzing and a video playing. Two hours pass and she's done twenty minutes of work.",
      "She tries one-mindfully: phone in another room, a 25-minute timer, one subject. When her mind drifts, she gently returns to the page. She finishes in an hour and feels less drained.",
    ],
    practice: [
      "Choose one daily task, like brushing your teeth, and do only that.",
      "When you notice your mind somewhere else, say \"back\" and return. Repeat as often as needed.",
      "Use a short timer for one focused block of work.",
      "Try the \"One thing, one minute\" tool in Chirp.",
    ],
    stuck: [
      "Your mind leaving isn't failure. Coming back is the whole practice.",
      "Start with short blocks. Five focused minutes beat an hour of half-attention.",
      "Remove the easiest distractions first, like notifications.",
    ],
    tip: "When you're worried about tomorrow, ask: what is the one thing I'm doing right now?",
  },
  {
    id: "effectively",
    dek: "Focus on what works, not on being right.",
    why: [
      "Sometimes we'd rather win the argument than get what we actually want. Acting effectively means keeping your goal in mind and doing what will help reach it, even when the situation isn't fair.",
      "It protects you from cutting off your nose to spite your face. It's not about giving up your values. It's about not letting pride or anger block your goals.",
    ],
    example: [
      "Noah's teacher marked an answer wrong that he thinks was right. He wants to say, \"This is so unfair, you never listen.\" His goal, though, is to get the points back.",
      "He asks to talk after class, calmly shows his reasoning and asks if she'd reconsider. She gives him half credit. Not perfect, but more than an argument would have gotten him.",
    ],
    practice: [
      "Before reacting, ask: what is my goal here?",
      "Ask: what would actually help me get there? Do that.",
      "Notice when \"but it's not fair!\" is blocking you, and choose your goal anyway.",
      "Use the \"Do what works\" tool in Chirp to walk through it.",
    ],
    stuck: [
      "Effective doesn't mean letting people walk all over you. Sometimes the effective move is a firm no.",
      "It's okay to feel the unfairness. You can feel it and still act effectively.",
      "If you have several goals, pick the most important one for this moment.",
    ],
    tip: "Ask yourself: do I want to be right, or do I want this to work out?",
  },
  {
    id: "accepts",
    dek: "Seven ways to shift your attention so a big feeling can cool down.",
    why: [
      "ACCEPTS is a distraction skill for crisis moments, when an emotion is too intense to think straight. It stands for Activities, Contributing, Comparisons, Emotions, Pushing away, Thoughts and Sensations.",
      "Distraction isn't avoiding forever. It's buying time so the wave of emotion can pass and you don't act on urges you'll regret. Once the intensity drops, you can deal with the problem more wisely.",
    ],
    example: [
      "After a fight with her mum, Zoe is shaking and wants to send a cruel text. She uses ACCEPTS: a fast walk around the block (Activities), then she texts her little brother a funny meme (Contributing), then watches a comedy clip (Emotions).",
      "Forty minutes later, she still feels hurt, but the urge to send the text is gone. She writes down what she wants to say for later.",
    ],
    practice: [
      "Write your own ACCEPTS list now, while you're calm, so it's ready when you need it.",
      "Activities: something that takes focus, like a puzzle, drawing or cleaning a drawer.",
      "Contributing: help someone, even in a small way.",
      "Thoughts and Sensations: count backwards by 7s, or hold ice in your hand.",
      "Use the ACCEPTS shuffle decks in Chirp for ideas.",
    ],
    stuck: [
      "Distraction works best for short-term crises. If you're distracting all day, every day, it may be avoidance.",
      "Pick distractions that don't create new problems. Scrolling for three hours can backfire.",
      "Come back to the problem later. Set a time if it helps.",
    ],
    tip: "Make your ACCEPTS list before you need it. In a crisis, it's hard to think of ideas.",
  },
  {
    id: "self-soothe",
    dek: "Comfort yourself through sight, sound, smell, taste and touch.",
    why: [
      "Self-soothing means being kind to yourself through your five senses. It calms your nervous system directly, through your body, which is often faster than trying to think your way calm.",
      "Many people find it hard to comfort themselves, especially if they were taught to push feelings away. Self-soothing is a skill, and it gets easier with practice.",
    ],
    example: [
      "After a hard day, Ethan feels raw and restless. He makes a warm drink (taste), puts on a calm playlist (sound), lights a candle with a smell he likes (smell), wraps up in a heavy blanket (touch), and looks at photos from a trip (sight).",
      "Nothing about the day has changed, but his body feels safer, and he can think about what happened without spiraling.",
    ],
    practice: [
      "Make a soothe kit: something soft, something that smells good, a comfort snack, a calming playlist.",
      "Pick one sense when you're stressed and give it something gentle.",
      "Try the Soothe your five senses checklist in Chirp.",
      "Practice when you're calm, so your body learns the routine.",
    ],
    stuck: [
      "\"I don't deserve it.\" Everyone deserves comfort, especially when they're struggling.",
      "If one sense doesn't help, try another.",
      "Self-soothing works best alongside other skills, not instead of solving real problems.",
    ],
    tip: "Cold water, a warm drink and a slow out-breath are three of the fastest soothers there are.",
  },
  {
    id: "improve",
    dek: "Seven ways to make a hard moment a little more bearable.",
    why: [
      "IMPROVE stands for Imagery, Meaning, Prayer, Relaxation, One thing in the moment, Vacation and Encouragement. These are mental moves that change how you experience a moment you can't change right now.",
      "When you can't fix a situation, like waiting for news or sitting through something painful, IMPROVE helps you get through it without making it worse.",
    ],
    example: [
      "Lily is waiting in hospital while her grandad has surgery. She can't do anything to change the outcome. She uses IMPROVE: imagines a calm beach (Imagery), reminds herself she's here because she loves him (Meaning), relaxes her shoulders and breathes slowly (Relaxation), and tells herself, \"I can get through these hours\" (Encouragement).",
      "The waiting is still hard, but she isn't drowning in it.",
    ],
    practice: [
      "Imagery: build a safe place in your mind, detail by detail.",
      "Meaning: ask, what is this teaching me, or who could I help because of it?",
      "Vacation: take a short, healthy break, like 15 minutes outside.",
      "Encouragement: say a coping phrase, like \"This is hard, and I can do hard things.\"",
      "Try the Picture a safe place and Coping words tools in Chirp.",
    ],
    stuck: [
      "Prayer doesn't have to be religious. It can be connecting with nature, your values or something bigger than you.",
      "A \"vacation\" should be short. A whole day away from responsibilities can make things worse.",
      "Pick one or two parts that work for you. You don't need all seven.",
    ],
    tip: "Write three coping phrases on your phone's lock screen for hard days.",
  },
  {
    id: "pros-cons",
    dek: "Think it through before you act on an urge.",
    why: [
      "When an urge is strong, your brain shows you only the short-term reward. Pros and cons forces the full picture into view: the pros and cons of acting on the urge, and the pros and cons of not acting on it.",
      "Seeing the long-term consequences written down makes it easier for wise mind to win. It's especially useful for urges you've acted on before and regretted.",
    ],
    example: [
      "Marcus wants to skip school tomorrow because he's anxious about a presentation. Pros of skipping: relief now. Cons: the presentation gets rescheduled, he falls behind, the anxiety grows. Pros of going: it's over, he might do okay. Cons: it'll feel scary.",
      "Written out, the choice is clearer. He goes, uses paced breathing beforehand, and it's over in five minutes.",
    ],
    practice: [
      "Do pros and cons when you're calm, for urges you know will come back.",
      "Fill all four boxes: acting and not acting, pros and cons.",
      "Circle the long-term consequences. They matter most.",
      "Use the Pros and cons worksheet in Chirp.",
    ],
    stuck: [
      "In a crisis, you may not have time. Use TIPP or ACCEPTS first, then pros and cons.",
      "Be honest about the pros of the urge. Pretending there are none makes the list less believable.",
      "Keep your list and reread it when the urge returns.",
    ],
    tip: "Save your pros and cons list as a note. Reading it in the moment is faster than writing a new one.",
  },
  {
    id: "comparisons",
    dek: "Find perspective by remembering harder times you've already survived.",
    why: [
      "Comparisons is part of ACCEPTS. It means comparing how you feel now to a time you coped with something harder, or to how far you've come.",
      "Done kindly, it reminds you that you have survived before and you have skills. It is not about telling yourself your pain doesn't count because others have it worse.",
    ],
    example: [
      "Ava is devastated after a breakup. She remembers her first year at a new school, when she knew nobody and felt completely alone. She got through that, made friends and grew.",
      "Remembering this doesn't erase the heartbreak, but it reminds her: I've been through hard things, and I've come out the other side.",
    ],
    practice: [
      "Write down three hard things you've already got through.",
      "Next to each, note what helped you then.",
      "When things feel unbearable, read the list.",
    ],
    stuck: [
      "Avoid comparisons that make you feel worse, like comparing yourself to people on social media.",
      "Your pain is valid even if someone else's is bigger.",
      "If comparisons bring up guilt or shame, try a different ACCEPTS skill.",
    ],
    tip: "Compare yourself to past you, not to other people.",
  },
  {
    id: "opposite-action-dt",
    dek: "When an urge would make things worse, do the opposite, all the way.",
    why: [
      "In a crisis, emotions push you toward actions: hide, attack, run. When acting on that urge would make things worse, doing the opposite helps you get through the moment without damage.",
      "Your body and mind are linked. Changing what you do, how you stand and what you say can change how you feel.",
    ],
    example: [
      "Kai is furious at a teammate and wants to storm off the court, yelling. Instead, he does the opposite: he stays, takes a slow breath, unclenches his hands, and speaks quietly.",
      "The anger is still there, but it doesn't take over, and he doesn't get benched.",
    ],
    practice: [
      "Name the emotion and the urge: I feel angry and want to yell.",
      "Ask: will acting on this help? If not, choose the opposite action.",
      "Do it fully: posture, face and voice too.",
      "See the full Opposite Action guide in Emotion Regulation for more.",
    ],
    stuck: [
      "Half-hearted opposite action doesn't work as well. Commit with your whole body.",
      "Opposite action isn't for when the emotion fits the facts and helps you, like fear of real danger.",
      "It feels fake at first. That's okay.",
    ],
    tip: "Unclenched hands and a relaxed jaw are the fastest opposite actions to anger.",
  },
  {
    id: "radical-acceptance",
    dek: "Fully accept what you can't change, so you can stop suffering over it and start dealing with it.",
    why: [
      "Pain is part of life. Suffering, DBT says, is pain plus non-acceptance: refusing to accept reality as it is. Radical acceptance means accepting reality completely, with your mind, heart and body.",
      "Accepting is not approving, giving up or saying something was okay. It's acknowledging what is, so your energy can go to what you can do next.",
    ],
    example: [
      "Ruby's parents are divorcing. For months she has replayed \"This shouldn't be happening\" every night. Nothing changes except that she feels worse.",
      "She practices radical acceptance: \"My parents are divorcing. I can't change it. I'm allowed to be sad.\" She notices her shoulders drop. The sadness is still there, but the exhausting fight against reality starts to ease, and she can focus on what she needs.",
    ],
    practice: [
      "Notice when you're fighting reality: \"It's not fair\", \"This can't be happening\".",
      "Say what is true: \"This is what happened.\"",
      "Let your body accept too: open hands, half-smile, relaxed shoulders.",
      "Use acceptance phrases, and repeat them as often as needed.",
      "Try the Acceptance words and Half-smile tools in Chirp.",
    ],
    stuck: [
      "Acceptance comes and goes. You may need to accept the same thing many times. That's Turning the Mind.",
      "Accepting a painful reality can bring grief. That's a sign it's working.",
      "Radical acceptance doesn't mean staying in an unsafe situation. Accept the reality, then act to protect yourself.",
    ],
    tip: "\"I don't like it, and it's true\" is a great place to start.",
  },
  {
    id: "turning-the-mind",
    dek: "Acceptance is a choice you make again and again.",
    why: [
      "Turning the mind is like standing at a fork in the road: one path is acceptance, the other is rejecting reality. Each time you notice yourself on the rejecting path, you turn back toward acceptance.",
      "Hardly anyone accepts something painful once and for all. Turning the mind makes acceptance a practice, not a single moment.",
    ],
    example: [
      "Dev didn't make the team. Each time he walks past the gym, the thought \"It's so unfair\" flares. Each time, he notices it and turns: \"I didn't make it. That's what happened. What do I want to do now?\"",
      "Over a few weeks, the turning gets easier, and he signs up for a different sport.",
    ],
    practice: [
      "Notice the moment you start fighting reality.",
      "Make an inner commitment: I choose to accept this.",
      "Repeat it every time. Count your turns if it helps.",
      "Use the Turn the mind tap counter in Chirp.",
    ],
    stuck: [
      "Turning a hundred times a day is normal at first.",
      "Be gentle. Each turn is a success, not a sign you're failing.",
      "Pair it with willing hands or a half-smile.",
    ],
    tip: "Each turn counts. It's reps, like training a muscle.",
  },
  {
    id: "willingness",
    dek: "Do what the situation needs, instead of refusing or sitting on your hands.",
    why: [
      "Willfulness is refusing to do what's needed: giving up, insisting on your way, or crossing your arms against reality. Willingness is doing what's needed, even when you don't want to.",
      "Everyone gets willful sometimes. The skill is noticing it, without judgment, and turning toward willingness.",
    ],
    example: [
      "Isla's family is moving and she refuses to pack, telling herself she isn't going. The moving day comes anyway, and her things aren't ready.",
      "Next time something like this comes up, she notices her willfulness: \"No way. I'm not doing this.\" She opens her hands, breathes and asks, \"What does this situation need from me?\"",
    ],
    practice: [
      "Notice willfulness in your body: crossed arms, a clenched jaw, \"No!\".",
      "Name it without judging: there's willfulness.",
      "Try willing hands: palms up, fingers relaxed.",
      "Ask: what's needed right now? Do one small part of it.",
    ],
    stuck: [
      "Willingness isn't the same as agreeing. You can be willing and still dislike it.",
      "Sometimes willfulness is protecting you from something unsafe. Check with wise mind.",
      "Small steps count.",
    ],
    tip: "Open your hands, palms up. Your body can lead your mind toward willingness.",
  },
  {
    id: "name-emotions",
    dek: "Learn to spot and name your feelings, so they're easier to manage.",
    why: [
      "Emotions often show up as a blur: bad, stressed, off. Naming them more precisely, as hurt, embarrassed, lonely or jealous, gives you a clearer map of what's going on and what might help.",
      "Putting feelings into words can make them feel less overwhelming. It's sometimes called \"name it to tame it\".",
    ],
    example: [
      "Tom feels \"just angry\" all week. When he slows down, he notices what happened before: his best friend made a new friend and has less time for him. In his body: a heavy chest, not hot hands. The urge: to withdraw, not to fight.",
      "He realizes he's not mainly angry. He's sad and a bit scared of losing the friendship. That points to a different skill: telling his friend he misses him.",
    ],
    practice: [
      "Ask: what happened just before the feeling?",
      "Notice: where is it in my body?",
      "Notice: what do I want to do or say?",
      "Pick a name. Use the Name it to tame it tool in Chirp if you're stuck.",
    ],
    stuck: [
      "You can feel more than one emotion at once.",
      "Body clues help: tight chest, hot face, heavy limbs.",
      "There's no wrong answer. Your best guess is enough.",
    ],
    tip: "Check in twice a day, morning and night. Naming gets faster with practice.",
  },
  {
    id: "obstacles",
    dek: "Understand why an emotion is sticking around, and check whether it fits the facts.",
    why: [
      "Emotions have jobs: they warn us, motivate us and communicate to others. Sometimes an emotion keeps going because it's being reinforced, or because of how we're interpreting things.",
      "Checking the facts asks: does my emotion, and its intensity, fit what's really happening? If it does, solve the problem. If it doesn't, opposite action can help.",
    ],
    example: [
      "Hana feels anxious every time her phone buzzes, sure it's bad news about her grades. She checks the facts: What happened? She got one low grade. What's she assuming? That she'll fail the year. Is that likely? Not really. Her other grades are fine.",
      "The worry doesn't vanish, but it shrinks to a size that fits. She emails her teacher to ask how to improve, which is problem-solving.",
    ],
    practice: [
      "Ask: what event set this off? Stick to the facts.",
      "Ask: what am I telling myself about it? Is there another explanation?",
      "Ask: does my emotion fit the facts, and does the intensity fit?",
      "Use the Check the facts and Cope ahead worksheets in Chirp.",
    ],
    stuck: [
      "Checking the facts isn't about proving your feelings wrong. Sometimes they fit perfectly.",
      "If the emotion fits, the next step is problem-solving, not talking yourself out of it.",
      "Do this when you're a bit calmer. In crisis, use distress tolerance first.",
    ],
    tip: "Write the facts in one column and your interpretations in another. The difference is often surprising.",
  },
  {
    id: "please",
    dek: "Look after your body so big emotions are less likely to take over.",
    why: [
      "PLEASE stands for treat Physical iLlness, balanced Eating, Avoid mood-altering substances, balanced Sleep and Exercise. When your body is run down, hungry or exhausted, emotions hit harder and faster.",
      "PLEASE doesn't solve problems, but it lowers your vulnerability, so you have more capacity to cope with them.",
    ],
    example: [
      "Mia notices she snaps at everyone on the days she skips breakfast and stays up past 2 a.m. scrolling. She tries one week of a set bedtime and a real breakfast.",
      "She still has hard days, but she cries less over small things and has more patience with her brother.",
    ],
    practice: [
      "Pick one PLEASE area to improve this week, not all five.",
      "Keep a steady sleep and wake time, even on weekends if you can.",
      "Move for 10 minutes a day: a walk counts.",
      "Use the PLEASE check-in and Wind-down checklist in Chirp.",
    ],
    stuck: [
      "Perfect isn't the goal. Small improvements add up.",
      "If you're dealing with illness, pain or problems with eating or substances, talk to a doctor or trusted adult.",
      "Notice the link: rate your mood on days you sleep well versus days you don't.",
    ],
    tip: "Ask \"Am I hungry, tired or sick?\" before trusting a big feeling completely.",
  },
  {
    id: "positive-events",
    dek: "Add small good moments every day, and build toward a life that feels worth living.",
    why: [
      "Positive emotions don't just happen. You can make them more likely by planning pleasant activities in the short term and working toward things you care about in the long term.",
      "When your days include some joy and meaning, painful emotions have less room to take over. DBT calls this building a life worth living.",
    ],
    example: [
      "Luca realizes his days are just school, homework and his phone. He adds one small pleasant thing a day: shooting hoops, cooking a snack, calling his cousin.",
      "He also picks one longer-term goal: learning guitar. A month later, he says his mood isn't perfect, but there's more to look forward to.",
    ],
    practice: [
      "Plan one pleasant activity every day, and pay full attention while it happens.",
      "Do one thing that's a little hard each day to build mastery.",
      "Write three good things each night.",
      "Use the Pleasant thing picker, Build mastery and Savor it tools in Chirp.",
    ],
    stuck: [
      "Worrying during a pleasant moment steals it. Gently bring your attention back.",
      "Start tiny. Five minutes of something you enjoy counts.",
      "If nothing feels enjoyable for a long time, talk to a trusted adult or counselor.",
    ],
    tip: "Plan the good thing ahead of time. Waiting to feel like it rarely works.",
  },
  {
    id: "mindful-emotions",
    dek: "Let a feeling be there, like a wave, without pushing it away or holding on.",
    why: [
      "Trying to block an emotion often makes it stronger and last longer. Mindfulness of current emotions means noticing the feeling, where it lives in your body, and letting it rise and fall.",
      "Emotions are temporary. When you stop fighting them, they usually pass faster than you expect.",
    ],
    example: [
      "Grace feels a wave of sadness when she sees her old friend's post. Usually she'd scroll faster to escape it. This time she pauses, notices the heaviness in her chest and the lump in her throat, and breathes with it.",
      "She says to herself, \"This is sadness. It makes sense. It will pass.\" A few minutes later, it softens.",
    ],
    practice: [
      "Name the feeling and where it is in your body.",
      "Breathe and imagine it as a wave: rising, peaking and falling.",
      "Remind yourself: I am not my emotion. I'm the one noticing it.",
      "Use the Ride the emotion wave and Feeling meter tools in Chirp.",
    ],
    stuck: [
      "If a feeling is overwhelming, use a distress tolerance skill first.",
      "You don't have to act on the urge that comes with the feeling.",
      "Noticing emotions can feel uncomfortable at first. That's normal.",
    ],
    tip: "Rate your feeling before and after. Watching the number drop teaches your brain that feelings pass.",
  },
  {
    id: "opposite-action-er",
    dek: "When an emotion doesn't fit the facts, act opposite to its urge to shrink it.",
    why: [
      "Every emotion comes with an urge: fear says avoid, anger says attack, sadness says withdraw, shame says hide. When the emotion fits the facts, the urge can be useful. When it doesn't, acting on it keeps the emotion going.",
      "Opposite action means doing the opposite of the urge, fully, until the emotion changes. It's one of the most researched skills in DBT for changing emotions.",
    ],
    example: [
      "Ben is anxious about speaking in class, though nothing bad has happened before. Fear says avoid: stay silent. Opposite action: raise his hand once a lesson.",
      "The first times are scary. By week three, his anxiety is noticeably lower, because his brain has learned that speaking up is safe.",
    ],
    practice: [
      "Name the emotion and its urge.",
      "Check the facts: does the emotion fit the situation?",
      "If not, identify the opposite action, and do it all the way, with posture, face and voice.",
      "Repeat until the emotion shifts. Use the Opposite action tool in Chirp.",
    ],
    stuck: [
      "Partial opposite action, like approaching with your eyes closed, doesn't work as well.",
      "Don't use opposite action on emotions that fit the facts, like fear of a real danger.",
      "It usually takes repeated practice, not one try.",
    ],
    tip: "Sadness says stay in bed. Opposite action: get up, open the curtains, text one person.",
  },
  {
    id: "apply-dt",
    dek: "When an emotion is too intense to work with, get through the moment first.",
    why: [
      "Emotion regulation skills need a bit of headspace. When you're at 90 out of 100, you can't check the facts or plan opposite action. That's when you switch to distress tolerance skills, to bring the intensity down first.",
      "This skill is about knowing which tool fits which moment.",
    ],
    example: [
      "Ella's anger is off the charts after an argument. She tries to check the facts but can't think. She switches: cold water on her face (TIPP), then a fast walk.",
      "Twenty minutes later she's at a 5 out of 10, and now she can work out what actually upset her.",
    ],
    practice: [
      "Rate your emotion from 0 to 10.",
      "If it's 7 or above, pick a distress tolerance skill: TIPP, ACCEPTS, self-soothe or IMPROVE.",
      "When it's lower, come back to emotion regulation skills.",
      "Use the Feeling meter and Before and after tools in Chirp.",
    ],
    stuck: [
      "There's no shame in needing distress tolerance first. It's the smart move.",
      "Plan ahead: know your go-to crisis skill before you need it.",
      "Come back to the problem later, or it will return.",
    ],
    tip: "High intensity, use your body. Lower intensity, use your mind.",
  },
  {
    id: "dear-man",
    dek: "A clear, respectful way to ask for what you need or say no.",
    why: [
      "DEAR MAN is a script for objective effectiveness: getting what you want or need. It stands for Describe, Express, Assert, Reinforce, stay Mindful, Appear confident and Negotiate.",
      "Having a structure stops you from rambling, apologizing too much or getting pulled off topic. It also makes you easier to say yes to.",
    ],
    example: [
      "Ari wants a later curfew. Describe: \"I've been home on time every weekend this term.\" Express: \"I feel left out when I have to leave before everyone else.\" Assert: \"I'd like my curfew to be 11 instead of 10.\" Reinforce: \"You'd worry less because I'd text you when I leave.\"",
      "Her dad says no at first. She stays mindful (calmly repeats her ask) and negotiates: \"Could we try 10:30 for a month?\" He agrees.",
    ],
    practice: [
      "Write your DEAR MAN before a hard conversation.",
      "Keep each part short: one or two sentences.",
      "Practice it out loud, then in real life.",
      "Use the DEAR MAN builder and Rehearse it tools in Chirp.",
    ],
    stuck: [
      "You won't always get what you want. DEAR MAN raises your chances, it doesn't guarantee them.",
      "Pick a good time, when the other person isn't rushed or upset.",
      "Combine with GIVE to protect the relationship.",
    ],
    tip: "The broken record works: calmly repeat your request, same words, same tone.",
  },
  {
    id: "give",
    dek: "Keep the relationship strong while you talk through something hard.",
    why: [
      "GIVE is about relationship effectiveness: how to talk so the other person feels respected and wants to keep the connection. It stands for Gentle, Interested, Validate and Easy manner.",
      "When people feel heard and safe, they're more open to what you're saying.",
    ],
    example: [
      "Jade's friend cancelled plans again. Jade is annoyed but values the friendship. She's gentle (no attacks), interested (\"What's been going on?\"), validating (\"Sounds like you've had a lot on\") and easy (a smile, light tone).",
      "Her friend opens up about stress at home. They make a new plan, and the friendship feels stronger.",
    ],
    practice: [
      "Gentle: no threats, judging or sarcasm.",
      "Interested: listen, don't interrupt, ask questions.",
      "Validate: \"I can see why you'd feel that way.\"",
      "Easy manner: smile, use a bit of humor if it fits.",
      "Try the GIVE practice and Ways to validate tools in Chirp.",
    ],
    stuck: [
      "Validating isn't agreeing. You can understand someone's feelings and still disagree.",
      "If you're too upset to be gentle, take a break first.",
      "GIVE works with DEAR MAN, not instead of it.",
    ],
    tip: "Ask one curious question before you share your side.",
  },
  {
    id: "fast",
    dek: "Keep your self-respect when you ask, say no or stand up for yourself.",
    why: [
      "FAST is about self-respect effectiveness. It stands for be Fair, no unnecessary Apologies, Stick to your values and be Truthful.",
      "You can get what you want and keep the relationship, but if you lose your self-respect along the way, it doesn't feel like a win. FAST helps you walk away proud of how you acted.",
    ],
    example: [
      "Oscar's friends push him to help cheat on a test. He wants to keep the friendships, but cheating goes against his values. He's fair (\"I get why you're stressed\"), doesn't over-apologize, sticks to his values (\"I'm not going to do it\"), and is truthful (no fake excuse).",
      "His friends grumble but drop it. Oscar feels good about himself afterward.",
    ],
    practice: [
      "Before a hard conversation, name the value you want to protect.",
      "Notice extra apologies and drop them.",
      "Say the truth simply, without exaggerating.",
      "Use the FAST check and Self-respect check tools in Chirp.",
    ],
    stuck: [
      "Apologize when you've actually done something wrong. Just not for having needs.",
      "Being fair includes being fair to yourself.",
      "It's okay if the other person isn't happy with your answer.",
    ],
    tip: "One apology, when it fits, is plenty.",
  },
];

const toolsFor = (skillId: string) => TOOLS.filter((t) => t.skillId === skillId).slice(0, 4);

export const SKILL_GUIDES: Article[] = G.map((g) => {
  const s = getSkill(g.id)!;
  const tools = toolsFor(g.id);
  return {
    slug: `skill-${g.id}`,
    section: "Skill Guides",
    module: s.module,
    title: `${s.name}: a complete guide`,
    dek: g.dek,
    skills: [g.id],
    body: [
      `${s.what}`,
      "## What it is and why it works",
      ...g.why,
      "## A real-life example",
      ...g.example,
      "## How to practice it",
      ...g.practice.map((p, i) => `${i + 1}. ${p}`),
      "## Where people get stuck",
      ...g.stuck.map((x) => `- ${x}`),
      `> ${g.tip}`,
      "## Try it in Chirp",
      `- Open the [${s.name} flashcard](/skills/${s.id}) for the quick steps.`,
      ...tools.map((t) => `- Use the [${t.name}](/tools/${t.id}) tool: ${t.blurb}`),
      "- Not sure where to start? [Ask Chirp](/chat) and talk it through.",
    ],
  };
});
