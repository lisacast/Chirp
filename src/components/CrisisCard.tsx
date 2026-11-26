import { CRISIS_RESOURCES, type RiskLevel } from "@/lib/crisis";

export default function CrisisCard({
  risk,
  compact = false,
}: {
  risk: RiskLevel;
  compact?: boolean;
}) {
  if (risk === "none") return null;
  const urgent = risk === "urgent";
  const core = [
    "988 Suicide & Crisis Lifeline",
    "988 by text",
    "Crisis Text Line",
    "Emergency",
  ];
  const list =
    urgent && !compact
      ? CRISIS_RESOURCES
      : CRISIS_RESOURCES.filter((r) =>
          (urgent ? core : core.slice(0, 3)).includes(r.name),
        );

  return (
    <div
      role="alert"
      className={`rounded-2xl border-2 p-4 shadow-sm ${urgent ? "border-brick bg-white" : "border-sky-deep bg-white/90"}`}
    >
      <p className="font-bold text-brick">
        {urgent
          ? "You don't have to go through this alone."
          : "Want to talk to a real person?"}
      </p>
      <p className="mt-1 text-sm">
        {urgent
          ? "Trained counselors are free and available 24/7. Reach out now, or tell a trusted adult."
          : "These free, confidential lines are always open if things feel like too much."}
      </p>
      <ul className="mt-3 space-y-2">
        {list.map((r) => (
          <li key={r.name}>
            <a
              href={r.href}
              className="flex items-center justify-between gap-3 rounded-xl bg-sky/40 px-3 py-2 hover:bg-sky/70"
            >
              <span className="text-sm">
                <span className="block font-semibold">{r.name}</span>
                <span className="block text-ink/80">{r.detail}</span>
              </span>
              <span className="shrink-0 rounded-full bg-coral px-3 py-1 text-sm font-bold text-white">
                {r.action}
              </span>
            </a>
          </li>
        ))}
      </ul>
      {compact && (
        <a
          href="/help"
          className="mt-3 block text-sm font-semibold text-navy underline"
        >
          More places to get help
        </a>
      )}
    </div>
  );
}
