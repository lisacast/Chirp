// Editorial page header: small red kicker, big serif headline, a short dek and a heavy rule.
export default function PageHeader({
  kicker,
  title,
  dek,
  children,
}: {
  kicker?: string;
  title: React.ReactNode;
  dek?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-6 sm:mb-8">
      {kicker && <p className="kicker">{kicker}</p>}
      <h1 className="display mt-1 text-[2.25rem] sm:text-6xl">{title}</h1>
      {dek && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{dek}</p>}
      {children}
      <div className="rule mt-5" />
    </header>
  );
}
