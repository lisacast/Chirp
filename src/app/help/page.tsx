import Shell from "@/components/Shell";
import CrisisCard from "@/components/CrisisCard";
import PageHeader from "@/components/PageHeader";
import SosFinder from "@/components/SosFinder";

export const metadata = { title: "Get help now · Chirp" };

export default function HelpPage() {
  return (
    <Shell gated={false} width="medium">
      <PageHeader kicker="Help" title="Get help now" dek="If you're thinking about hurting yourself, feel unsafe, or just need to talk to someone, real people are ready to help, any time, for free." />
      <CrisisCard risk="urgent" />
      <div className="mt-8">
        <SosFinder />
      </div>
      <p className="mt-6 text-sm text-muted">
        Outside the US? Find a local helpline at{" "}
        <a className="font-semibold underline" href="https://findahelpline.com" target="_blank" rel="noreferrer">
          findahelpline.com
        </a>
        . Chirp is an educational skills app, not a crisis or medical service.
      </p>
    </Shell>
  );
}
