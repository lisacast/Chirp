import Link from "next/link";
import Shell from "@/components/Shell";

export const metadata = { title: "FAQ · PlayChirp" };

const FAQ = [
  {
    q: "What is Chirp?",
    a: "Chirp is a friendly AI guide that helps you practice skills for handling emotions, stress and relationships. The skills come from Dialectical Behavior Therapy (DBT), a well-researched approach developed by Dr. Marsha Linehan.",
  },
  {
    q: "Is Chirp a therapist?",
    a: "No. PlayChirp is not a medical app. Chirp is a practice buddy, not a therapist, doctor or emergency service. It can't diagnose anything or give medical advice. If you're working with a counselor, Chirp can help you practice between sessions.",
  },
  {
    q: "Who is PlayChirp for?",
    a: "PlayChirp is for anyone 13 or older who wants to get better at handling big feelings, tough moments and tricky conversations. It isn't available to children under 13. If you're under 18, please use it with a parent or guardian's permission.",
  },
  {
    q: "Is my chat private?",
    a: "There's no account, no ads and no trackers. Your chat stays in this browser tab and is cleared when you close it or tap Start over. Messages are sent securely to our AI service provider only to create Chirp's reply, and we don't keep them. We don't ask for your name, school or contact details, and you shouldn't share them. See our Privacy Policy for details.",
  },
  {
    q: "What if I'm in crisis?",
    a: "Tap the red life ring at the top of any page. You can call or text 988, text HOME to 741741, or call 911 if you're in immediate danger. If you mention being unsafe, Chirp will show these contacts too.",
  },
  {
    q: "What are the flashcards?",
    a: "When Chirp suggests a skill, tap it to open a flashcard. Tap to flip it over for the steps. Use ← Chat to go back to the conversation, or Next → to see another skill.",
  },
  {
    q: "What does the exit button do?",
    a: "The exit button at the bottom of the page clears this visit's chat and quickly takes you to a different website.",
  },
];

export default function FaqPage() {
  return (
    <Shell gated={false}>
      <h1 className="text-3xl font-bold text-navy sm:text-4xl">FAQ</h1>
      <p className="mt-1 text-ink/80">
        The most frequently asked questions about Chirp.
      </p>
      <div className="mt-5 space-y-2">
        {FAQ.map((f) => (
          <details
            key={f.q}
            className="rounded-2xl bg-white px-4 py-3 shadow-sm open:shadow"
          >
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="mt-2 text-ink/85">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-ink/80">
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
