import { SKILLS } from "@/data/skills";
import SkillView from "./SkillView";

// Pre-render one page per skill for the static export.
export function generateStaticParams() {
  return SKILLS.map((s) => ({ id: s.id }));
}

export default async function SkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SkillView id={id} />;
}
