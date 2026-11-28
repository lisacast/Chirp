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
      className={`rounded-2xl border-2 bg-white p-4 ${urgent ? "border-red" : "border-oxford"}`}
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
              className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-3 py-2 hover:border-oxford"
            >
              <span className="text-sm">
                <span className="block font-semibold">{r.name}</span>
                <span className="block text-muted">{r.detail}</span>
              </span>
              <span className="shrink-0 rounded-full bg-red px-3 py-1 text-sm font-bold text-white">
                {r.action}
              </span>
            </a>
          </li>
        ))}
      </ul>
      {compact && (
        <a
          href="/help"
          className="mt-3 block text-sm font-semibold text-oxford underline"
        >
          More places to get help
        </a>
      )}
    </div>
  );
}
