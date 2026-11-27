// Renders an article body: "## " heading, "- " bullet, "1. " step, "> " tip, else paragraph.
export default function ArticleBody({ body }: { body: string[] }) {
  const out: React.ReactNode[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  const flush = () => {
    if (!list) return;
    const L = list;
    out.push(
      L.type === "ul" ? (
        <ul key={out.length}>{L.items.map((t, i) => <li key={i}>{t}</li>)}</ul>
      ) : (
        <ol key={out.length}>{L.items.map((t, i) => <li key={i}>{t}</li>)}</ol>
      ),
    );
    list = null;
  };
  for (const b of body) {
    const ul = b.startsWith("- ");
    const ol = /^\d+\. /.test(b);
    if (ul || ol) {
      const type = ul ? "ul" : "ol";
      if (!list || list.type !== type) {
        flush();
        list = { type, items: [] };
      }
      list.items.push(b.replace(/^(- |\d+\. )/, ""));
      continue;
    }
    flush();
    if (b.startsWith("## ")) out.push(<h2 key={out.length}>{b.slice(3)}</h2>);
    else if (b.startsWith("> "))
      out.push(
        <aside key={out.length} className="my-6 rounded-2xl border-l-8 border-sun bg-oxford p-5 text-white">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">Chirp tip</p>
          <p className="mt-1 !text-white">{b.slice(2)}</p>
        </aside>,
      );
    else out.push(<p key={out.length}>{b}</p>);
  }
  flush();
  return <div className="prose-chirp">{out}</div>;
}
