import Link from "next/link";
import Shell from "@/components/Shell";

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

export const EFFECTIVE_DATE = "November 26, 2026";
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
    <Shell gated={false}>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-1 text-sm text-ink/70">Effective {EFFECTIVE_DATE}</p>
      <div className="mt-4 space-y-5 rounded-3xl bg-white p-5 text-[0.95rem] leading-relaxed shadow-sm">
        <div className="space-y-3">{intro}</div>
        <nav aria-label="Contents" className="rounded-2xl bg-sky/30 p-4 text-sm">
          <p className="font-bold">Contents</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#s${i + 1}`} className="underline">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        {sections.map((s, i) => (
          <section key={s.heading} id={`s${i + 1}`} className="scroll-mt-4 space-y-2">
            <h2 className="text-lg font-bold">
              {i + 1}. {s.heading}
            </h2>
            {s.body}
          </section>
        ))}
        <p className="border-t border-ink/10 pt-4 text-sm text-ink/70">
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
    </Shell>
  );
}
