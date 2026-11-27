"use client";

import Link from "next/link";
import Shell from "@/components/Shell";
import ToolPlayer from "@/components/ToolPlayer";
import ToolCard from "@/components/ToolCard";
import { moduleTheme } from "@/data/art";
import { getTool, TOOLS } from "@/data/tools";
import { getModule, getSkill } from "@/data/skills";

export default function ToolView({ id }: { id: string }) {
  const tool = getTool(id);
  if (!tool) return null;
  const th = moduleTheme(tool.module);
  const skill = getSkill(tool.skillId);
  const mod = getModule(tool.module);
  const same = TOOLS.filter((x) => x.module === tool.module && x.id !== tool.id);
  const start = TOOLS.indexOf(tool) % Math.max(1, same.length);
  const more = [...same.slice(start), ...same.slice(0, start)].slice(0, 6);
  return (
    <Shell width="medium">
      <nav className="text-sm font-bold">
        <Link href="/tools" className="text-red hover:underline">
          Tools
        </Link>
        <span className="text-muted"> / </span>
        <span style={{ color: th.solid }}>{mod.name}</span>
      </nav>
      <h1 className="mt-1 text-3xl font-bold text-oxford sm:text-4xl">{tool.name}</h1>
      <p className="mt-1 text-lg text-muted">{tool.blurb}</p>
      <div className="mt-4">
        <ToolPlayer key={tool.id} tool={tool} />
      </div>
      {skill && (
        <Link href={`/skills/${skill.id}`} className="card mt-5 flex items-center gap-3 border-l-8 p-4 hover:border-oxford" style={{ borderLeftColor: th.solid }}>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-extrabold uppercase tracking-[0.14em]" style={{ color: th.solid }}>
              Skill behind this tool
            </span>
            <span className="block font-bold text-oxford">{skill.name}</span>
            <span className="block text-sm text-muted">{skill.tagline}</span>
          </span>
          <span aria-hidden className="text-xl text-oxford">›</span>
        </Link>
      )}
      <h2 className="mt-8 text-xl font-bold text-oxford">More {mod.name} tools</h2>
      <div className="-mx-4 mt-3 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
        {more.map((x) => (
          <ToolCard key={x.id} tool={x} wide />
        ))}
      </div>
    </Shell>
  );
}
