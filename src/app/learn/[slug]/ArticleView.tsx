"use client";

import Link from "next/link";
import { useEffect } from "react";
import Shell from "@/components/Shell";
import ArticleBody from "@/components/ArticleBody";
import Art from "@/components/Art";
import { articleArt } from "@/data/art";
import { ARTICLES, getArticle, readMinutes, SECTIONS } from "@/data/articles";
import { getSkill, MODULES } from "@/data/skills";
import { markRead } from "@/lib/profile";
import { track } from "@/lib/track";

export default function ArticleView({ slug }: { slug: string }) {
  const a = getArticle(slug)!;
  const sec = SECTIONS.find((s) => s.name === a.section)!;
  const i = ARTICLES.findIndex((x) => x.slug === slug);
  const next = ARTICLES[(i + 1) % ARTICLES.length];
  const more = ARTICLES.filter((x) => x.section === a.section && x.slug !== slug).slice(0, 3);
  const skills = (a.skills ?? []).map(getSkill).filter(Boolean);

  useEffect(() => {
    const t = setTimeout(() => {
      markRead(slug);
      track("article", slug);
    }, 15000);
    return () => {
      clearTimeout(t);
    };
  }, [slug]);


  return (
    <Shell gated={false} width="medium">
      <article className="mx-auto w-full max-w-[42rem]">
        <nav className="text-sm font-bold">
          <Link href="/learn" className="text-red hover:underline">
            Learn
          </Link>
          <span className="text-muted"> / {a.section}</span>
        </nav>
        <Art n={articleArt(a.section, a.slug, ARTICLES)} priority sizes="(min-width: 768px) 672px, 100vw" className="mt-3 aspect-[16/9] w-full rounded-2xl" />
        <h1 className="display mt-5 text-3xl sm:text-[2.5rem]">{a.title}</h1>
        <p className="mt-4 text-lg leading-snug text-muted sm:text-xl">{a.dek}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3 border-y-4 border-oxford py-3 text-sm font-bold text-oxford">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: sec.color }} />
          <span>{a.section}</span>
          <span className="text-muted">·</span>
          <span>{readMinutes(a)} min read</span>
        </div>

        <div className="mt-7">
          <ArticleBody body={a.body} />
        </div>

        {skills.length > 0 && (
          <section className="mt-10">
            <p className="kicker">Practice these skills</p>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {skills.map((s) => {
                const m = MODULES.find((x) => x.id === s!.module)!;
                return (
                  <li key={s!.id}>
                    <Link href={`/skills/${s!.id}`} className="card block border-l-8 p-4 hover:border-oxford" style={{ borderLeftColor: m.color }}>
                      <span className="block font-extrabold text-oxford">{s!.name}</span>
                      <span className="block text-sm text-muted">{s!.tagline}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <p className="mt-10 rounded-2xl border-2 border-oxford bg-white p-4 text-sm text-ink">
          Chirp articles are for learning and practice. They are not medical advice, therapy or a diagnosis. In a crisis, call or text{" "}
          <a href="tel:988" className="font-bold text-red underline">
            988
          </a>{" "}
          or call 911.
        </p>

        <section className="mt-10">
          <div className="rule" />
          <p className="kicker mt-4">Up next</p>
          <Link href={`/learn/${next.slug}`} className="mt-1 block text-2xl font-bold leading-tight text-oxford hover:underline">
            {next.title} →
          </Link>
          {more.length > 0 && (
            <>
              <p className="kicker mt-8">More in {a.section}</p>
              <ul className="mt-2 divide-y divide-line">
                {more.map((m) => (
                  <li key={m.slug}>
                    <Link href={`/learn/${m.slug}`} className="block py-3 font-bold text-oxford hover:underline">
                      {m.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </article>
    </Shell>
  );
}
