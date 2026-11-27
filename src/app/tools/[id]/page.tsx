import { TOOLS } from "@/data/tools";
import ToolView from "./ToolView";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ id: t.id }));
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ToolView id={id} />;
}
