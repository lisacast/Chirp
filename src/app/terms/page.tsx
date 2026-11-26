import Shell from "@/components/Shell";

export const metadata = { title: "Terms & disclaimer · PlayChirp" };

// DRAFT: placeholder terms for review by the PlayChirp team and legal counsel.
export default function TermsPage() {
  return (
    <Shell gated={false}>
      <h1 className="text-3xl font-bold">Terms of use &amp; medical disclaimer</h1>
      <div className="prose mt-4 space-y-4 rounded-3xl bg-white p-5 text-[0.95rem] leading-relaxed shadow-sm">
        <section>
          <h2 className="font-bold">Medical disclaimer</h2>
          <p>
            PlayChirp and Chirp provide educational skills practice based on Dialectical Behavior Therapy (DBT). PlayChirp is
            not therapy, medical care, diagnosis or an emergency service, and it does not replace a licensed professional. If
            you are in crisis, call or text 988, text HOME to 741741, or call 911.
          </p>
        </section>
        <section>
          <h2 className="font-bold">Who can use PlayChirp</h2>
          <p>You must be 13 years of age or older to use PlayChirp.</p>
        </section>
        <section>
          <h2 className="font-bold">AI responses</h2>
          <p>
            Chirp is powered by artificial intelligence. Its replies can be wrong or incomplete. Use your own judgment and talk
            with a trusted adult or professional about important decisions.
          </p>
        </section>
        <section>
          <h2 className="font-bold">Privacy</h2>
          <p>
            We don&apos;t ask for your name or contact details. Your chat is stored only in your browser tab and is sent to our
            AI provider to generate replies. Your mood check-in and practiced skills are saved on this device only. Please
            don&apos;t share personal information in the chat.
          </p>
        </section>
        <section>
          <h2 className="font-bold">Acceptable use</h2>
          <p>Please use PlayChirp kindly and lawfully. Don&apos;t try to misuse Chirp or use it to harm others.</p>
        </section>
        <p className="text-xs text-ink/60">Draft, last updated November 2026.</p>
      </div>
    </Shell>
  );
}
