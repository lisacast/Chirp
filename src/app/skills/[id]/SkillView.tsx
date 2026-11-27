"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Shell from "@/components/Shell";
import Flashcard from "@/components/Flashcard";
import { useEffect, useState } from "react";
import { HeartIcon } from "@/components/Icons";
import { ARTICLES } from "@/data/articles";
import { getSkill, SKILLS } from "@/data/skills";
import { loadProfile, toggleFavorite } from "@/lib/profile";

export default function SkillView({ id }: { id: string }) {
  const router = useRouter();
  const skill = getSkill(id);
  const [fav, setFav] = useState(false);
  useEffect(() => setFav(!!loadProfile().favorites?.includes(id)), [id]);
  const reads = ARTICLES.filter((a) => a.skills?.includes(id)).slice(0, 3);

  if (!skill) {
    return (
      <Shell>
        <p>That skill wasn&apos;t found.</p>
        <Link href="/skills" className="btn btn-coral mt-4">
          Back to skills
        </Link>
      </Shell>
    );
  }

  const i = SKILLS.findIndex((s) => s.id === skill.id);
  const next = SKILLS[(i + 1) % SKILLS.length];

  return (
    <Shell>
      <div className="mx-auto w-full max-w-lg">
        <Flashcard
          skill={skill}
          backLabel="← Skills"
          onBack={() => router.push("/skills")}
          onNext={() => router.push(`/skills/${next.id}`)}
        />
        <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
          <Link href="/chat" className="btn btn-navy">
            Practice this with Chirp
          </Link>
          <button
            onClick={() => setFav(!!toggleFavorite(skill.id).favorites?.includes(skill.id))}
            aria-pressed={fav}
            aria-label={fav ? "Remove from my coping kit" : "Save to my coping kit"}
            title={fav ? "In your coping kit" : "Save to your coping kit"}
            className={`btn w-14 border-2 border-oxford ${fav ? "bg-red text-white" : "bg-white text-oxford"}`}
          >
            <HeartIcon filled={fav} className="h-6 w-6" />
          </button>
        </div>
        {reads.length > 0 && (
          <section className="mt-8">
            <p className="kicker">Read more</p>
            <ul className="mt-2 divide-y divide-line border-y-4 border-oxford">
              {reads.map((a) => (
                <li key={a.slug}>
                  <Link href={`/learn/${a.slug}`} className="block py-3 font-display text-lg font-bold text-oxford hover:underline">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Shell>
  );
}
