import Link from "next/link";
import Shell from "@/components/Shell";
import Art from "@/components/Art";
import PageHeader from "@/components/PageHeader";
import { ART, SECTION_THEME, sectionTheme } from "@/data/art";
import { ARTICLES, readMinutes, SECTIONS } from "@/data/articles";

export const metadata = {
  title: "Learn DBT skills · Chirp",
  description: "Plain-language articles about DBT skills: mindfulness, distress tolerance, emotion regulation and relationships.",
};

const th = (a: (typeof ARTICLES)[number]) => SECTION_THEME[a.section] ?? "learn";

export default function LearnPage() {
  const lead = ARTICLES[0];
  const picks = [ARTICLES[9], ARTICLES[17], ARTICLES[13]];
  return (
    <Shell gated={false} width="wide">
      <PageHeader art={ART.learn} kicker={`${ARTICLES.length} guides to DBT skills`} title="Learn" />

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Link href={`/learn/${lead.slug}`} className="group relative block overflow-hidden rounded-2xl text-white">
          <Art theme={th(lead)} seed={lead.slug} scrim className="h-64 w-full transition group-hover:scale-105 sm:h-96" />
          <span className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">Start here · {readMinutes(lead)} min</span>
            <span className="mt-2 block text-2xl font-bold leading-tight sm:text-4xl">{lead.title}</span>
          </span>
        </Link>
        <ul className="grid gap-3">
          {picks.map((a) => (
            <li key={a.slug}>
              <Link href={`/learn/${a.slug}`} className="card flex h-full items-center gap-3 overflow-hidden hover:border-oxford">
                <Art theme={th(a)} seed={a.slug} motif={false} className="h-full min-h-24 w-24 shrink-0 self-stretch" />
                <span className="py-3 pr-3">
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em]" style={{ color: sectionTheme(a.section).solid }}>{a.section}</span>
                  <span className="block font-bold leading-snug text-oxford">{a.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {SECTIONS.map((s) => (
        <section key={s.name} className="mt-10">
          <div className="flex items-center gap-3">
            <span className="h-8 w-2 rounded-full" style={{ background: sectionTheme(s.name).solid }} />
            <h2 className="text-2xl font-bold text-oxford sm:text-3xl">{s.name}</h2>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {ARTICLES.filter((a) => a.section === s.name).map((a) => (
              <li key={a.slug}>
                <Link href={`/learn/${a.slug}`} className="card group block h-full overflow-hidden hover:border-oxford hover:shadow-md">
                  <Art theme={th(a)} seed={a.slug} className="aspect-[4/3] w-full transition group-hover:scale-105" />
                  <span className="block p-3">
                    <span className="block font-bold leading-snug text-oxford">{a.title}</span>
                    <span className="mt-1 block text-xs font-extrabold uppercase tracking-wider" style={{ color: sectionTheme(a.section).solid }}>{readMinutes(a)} min</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Shell>
  );
}
