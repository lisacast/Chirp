import Link from "next/link";
import Shell from "@/components/Shell";
import Art from "@/components/Art";
import { ART } from "@/data/art";

export const metadata = { title: "FAQ · Chirp" };

const FAQ = [
  {
    q: "What is Chirp?",
    a: "Chirp is a friendly AI guide that helps you practice skills for handling emotions, stress and relationships. The skills come from Dialectical Behavior Therapy (DBT), a well-researched approach developed by Dr. Marsha Linehan.",
  },
  {
    q: "Is Chirp a therapist?",
    a: "No. Chirp is not a medical app. Chirp is a practice buddy, not a therapist, doctor or emergency service. It can't diagnose anything or give medical advice. If you're working with a counselor, Chirp can help you practice between sessions.",
  },
  {
    q: "Who is Chirp for?",
    a: "Chirp is for anyone 13 or older who wants to get better at handling big feelings, tough moments and tricky conversations. It isn't available to children under 13. If you're under 18, please use it with a parent or guardian's permission.",
  },
  {
    q: "Is my chat private?",
    a: "There's no account, no ads and no third-party trackers. Your chat stays in this browser tab and is cleared when you close it or tap Start over. Messages are sent securely to our AI service provider only to create Chirp's reply, and we don't keep them. We don't ask for your name, school or contact details, and you shouldn't share them. See our Privacy Policy for details.",
  },
  {
    q: "What if I'm in crisis?",
    a: "Tap the yellow Help button at the top of any page. It has crisis lines and a \"right now\" finder with quick steps for what you're feeling. You can call or text 988, text HOME to 741741, or call 911 if you're in immediate danger. If you mention being unsafe, Chirp will show these contacts too.",
  },
  {
    q: "What are the flashcards?",
    a: "When Chirp suggests a skill, tap it to open a flashcard. Tap to flip it over for the steps. Use ← Chat to go back to the conversation, or Next → to see another skill.",
  },
  {
    q: "What does the exit button do?",
    a: "The Exit button at the top of every page clears this visit's chat and quickly takes you to a different website.",
  },
  {
    q: "How do the meditations work?",
    a: "Open Meditate and tap a meditation, then Begin. Each one shows one gentle line at a time, with quiet time in between. The next line appears on its own, or you can tap Next or Pause to go at your own pace.",
  },
  {
    q: "What is skills bingo?",
    a: "Your Progress page has a 5 by 5 bingo card of DBT skills. Each time you mark a skill as practiced (on the back of its flashcard, or by finishing a matching meditation), its square fills in. Get five in a row, in any direction, for a bingo.",
  },
  {
    q: "What is my coping kit?",
    a: "Tap the heart on any skill card to save it to your coping kit. Your saved skills show up on your Progress page so your go-to skills are always one tap away.",
  },
  {
    q: "Where are my progress and moods saved?",
    a: "Only on your device, in this browser. Chirp never sees them. If you clear your browser data or switch devices, they start fresh.",
  },
  {
    q: "Does Chirp count visitors?",
    a: "Yes, but anonymously. Our own server keeps simple daily totals, like how many devices visited or how many meditations were finished, so we can improve Chirp. These counts never include your name, messages, IP address or any ID, and no third-party analytics are used. If your browser sends a Global Privacy Control signal, nothing is counted.",
  },
];

export default function FaqPage() {
  return (
    <Shell gated={false}>
      <Art theme={ART.faq} seed="faq" className="mb-5 h-32 w-full rounded-2xl sm:h-48" />
      <h1 className="display text-2xl sm:text-3xl">FAQ</h1>
      <p className="mt-1 text-muted">
        The most frequently asked questions about Chirp.
      </p>
      <div className="mt-5 space-y-2">
        {FAQ.map((f) => (
          <details
            key={f.q}
            className="card px-4 py-3"
          >
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="mt-2 text-ink">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-muted">
        Other questions? Email{" "}
        <a
          className="font-semibold underline"
          href="mailto:support@playchirp.com"
        >
          support@playchirp.com
        </a>
        . Read our{" "}
        <Link className="font-semibold underline" href="/terms">
          Terms of Use
        </Link>{" "}
        and{" "}
        <Link className="font-semibold underline" href="/privacy">
          Privacy Policy
        </Link>
        .
      </p>
      <Link href="/lobby" className="btn btn-coral mt-6">
        I&apos;m ready now
      </Link>
    </Shell>
  );
}
