"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Shell from "@/components/Shell";
import Flashcard from "@/components/Flashcard";
import { getSkill, SKILLS } from "@/data/skills";

export default function SkillPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const skill = getSkill(id);

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
      <Flashcard
        skill={skill}
        backLabel="← Skills"
        onBack={() => router.push("/skills")}
        onNext={() => router.push(`/skills/${next.id}`)}
      />
      <Link href="/chat" className="btn btn-navy mt-3">
        Practice this with Chirp
      </Link>
    </Shell>
  );
}
