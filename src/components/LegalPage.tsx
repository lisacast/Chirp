import Link from "next/link";
import Shell from "@/components/Shell";

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

export const EFFECTIVE_DATE = "November 27, 2026";
export const COMPANY = "NewPath";
export const SUPPORT_EMAIL = "support@playchirp.com";

export function Mail({ to }: { to: string }) {
  return (
    <a className="font-semibold underline" href={`mailto:${to}`}>
      {to}
    </a>
  );
}

export default function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}) {
  return (
    <Shell gated={false} width="wide">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h1 className="display text-[2.25rem] sm:text-6xl">{title}</h1>
        <p className="mt-1 text-sm text-muted">Effective {EFFECTIVE_DATE}</p>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
        <nav
          aria-label="Contents"
          className="mx-auto w-full max-w-2xl card p-4 text-sm lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto"
        >
          <p className="font-bold">Contents</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#s${i + 1}`} className="hover:underline">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mx-auto w-full max-w-2xl space-y-6 card p-5 text-[0.95rem] leading-relaxed sm:p-8 lg:mx-0">
          <div className="space-y-3 text-base">{intro}</div>
          {sections.map((s, i) => (
            <section
              key={s.heading}
              id={`s${i + 1}`}
              className="scroll-mt-24 space-y-2"
            >
              <h2 className="text-lg font-extrabold text-oxford">
                {i + 1}. {s.heading}
              </h2>
              {s.body}
            </section>
          ))}
          <p className="border-t border-ink/10 pt-4 text-sm text-muted">
            See also:{" "}
            <Link href="/terms" className="underline">
              Terms of Use
            </Link>{" "}
            ·{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link href="/help" className="underline">
              Get help now
            </Link>
          </p>
        </div>
      </div>
    </Shell>
  );
}
