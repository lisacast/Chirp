import Link from "next/link";
import ToolGlyph from "./ToolGlyph";
import Art from "./Art";
import { MODULE_THEME } from "@/data/art";
import { ENGINE_LABEL, type Tool } from "@/data/tools";

// Colour-coded tile for a tool. "wide" is used for horizontal scrollers.
export default function ToolCard({ tool, wide = false }: { tool: Tool; wide?: boolean }) {
  const key = MODULE_THEME[tool.module];
  return (
    <Link
      href={`/tools/${tool.id}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl p-4 text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${wide ? "h-44 w-40 shrink-0 snap-start sm:w-48" : "aspect-square"}`}
    >
      <Art theme={key} seed={tool.id} scrim sizes="200px" className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105" />
      <span className="absolute inset-0 bg-black/15" />
      <span className="relative flex items-start justify-between">
        <ToolGlyph kind={tool.engine.kind} className="h-9 w-9 drop-shadow" />
        <span className="rounded-full bg-black/25 px-2 py-0.5 text-[0.7rem] font-extrabold">{tool.minutes} min</span>
      </span>
      <span className="relative">
        <span className="block text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-white/85">{ENGINE_LABEL[tool.engine.kind]}</span>
        <span className="block text-lg font-bold leading-tight">{tool.name}</span>
      </span>
    </Link>
  );
}
