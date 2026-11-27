import Link from "next/link";
import Shell from "@/components/Shell";
import PageHeader from "@/components/PageHeader";
import { ARTICLES, readMinutes, SECTIONS } from "@/data/articles";

export const metadata = {
  title: "Learn DBT skills · Chirp",
  description: "Plain-language articles about DBT skills: mindfulness, distress tolerance, emotion regulation and relationships.",
};

export default function LearnPage() {
  const lead = ARTICLES[0];
  const picks = [ARTICLES[9], ARTICLES[17], ARTICLES[13]];
  return (
    <Shell gated={false} width="wide">
      <PageHeader kicker="The Chirp journal" title="Learn" dek={`${ARTICLES.length} plain-language guides to DBT skills, written for real life.`} />

      {/* Lead + side picks */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Link href={`/learn/${lead.slug}`} className="group block rounded-2xl bg-oxford p-6 text-white sm:p-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">Start here · {readMinutes(lead)} min</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] group-hover:underline sm:text-6xl">{lead.title}</h2>
          <p className="mt-4 max-w-xl text-lg text-white/90">{lead.dek}</p>
        </Link>
        <ol className="flex flex-col divide-y-2 divide-oxford border-y-4 border-oxford">
          {picks.map((a, n) => (
            <li key={a.slug}>
              <Link href={`/learn/${a.slug}`} className="flex gap-4 py-4 hover:underline">
                <span className="font-display text-4xl font-extrabold text-red">{n + 1}</span>
                <span>
                  <span className="kicker">{a.section}</span>
                  <span className="block font-display text-xl font-extrabold leading-tight text-oxford">{a.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {SECTIONS.map((s) => {
        const items = ARTICLES.filter((a) => a.section === s.name);
        return (
          <section key={s.name} className="mt-12">
            <div className="flex items-baseline justify-between gap-4 border-t-4 pt-3" style={{ borderColor: s.color }}>
              <h2 className="display text-3xl sm:text-4xl">{s.name}</h2>
              <span className="hidden text-sm font-bold text-muted sm:block">{s.blurb}</span>
            </div>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => (
                <li key={a.slug}>
                  <Link href={`/learn/${a.slug}`} className="card flex h-full flex-col p-5 hover:border-oxford hover:shadow-md">
                    <span className="font-display text-xl font-extrabold leading-tight text-oxford">{a.title}</span>
                    <span className="mt-2 flex-1 text-sm text-muted">{a.dek}</span>
                    <span className="mt-3 text-xs font-extrabold uppercase tracking-wider text-red">{readMinutes(a)} min read</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </Shell>
  );
}
