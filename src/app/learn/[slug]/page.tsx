import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/data/articles";
import ArticleView from "./ArticleView";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  return a ? { title: `${a.title} · Chirp`, description: a.dek } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getArticle(slug)) notFound();
  return <ArticleView slug={slug} />;
}
