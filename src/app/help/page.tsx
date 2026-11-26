import Shell from "@/components/Shell";
import CrisisCard from "@/components/CrisisCard";

export const metadata = { title: "Get help now · PlayChirp" };

export default function HelpPage() {
  return (
    <Shell gated={false}>
      <h1 className="text-3xl font-bold">Get help now</h1>
      <p className="mt-2 text-ink/85">
        If you&apos;re thinking about hurting yourself, feel unsafe, or just need to talk to someone, real people are ready to
        help, any time, for free.
      </p>
      <div className="mt-5">
        <CrisisCard risk="urgent" />
      </div>
      <p className="mt-5 text-sm text-ink/75">
        Outside the US? Find a local helpline at{" "}
        <a className="font-semibold underline" href="https://findahelpline.com" target="_blank" rel="noreferrer">
          findahelpline.com
        </a>
        .
      </p>
    </Shell>
  );
}
