import Art from "./Art";
import type { ThemeKey } from "@/data/art";

// Page header: optional illustration banner, small red kicker, headline and a short dek.
export default function PageHeader({
  kicker,
  title,
  dek,
  art,
  children,
}: {
  kicker?: string;
  title: React.ReactNode;
  dek?: React.ReactNode;
  art?: ThemeKey;
  children?: React.ReactNode;
}) {
  if (art)
    return (
      <header className="mb-5 sm:mb-6">
        <div className="relative overflow-hidden rounded-2xl bg-oxford">
          <Art theme={art} seed={String(title)} scrim className="h-24 w-full sm:h-28" />
          <div className="absolute inset-x-0 bottom-0 px-4 py-3 sm:px-6 sm:py-4">
            {kicker && <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.14em] text-sun">{kicker}</p>}
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">{title}</h1>
          </div>
        </div>
        {dek && <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{dek}</p>}
        {children}
      </header>
    );
  return (
    <header className="mb-6 sm:mb-8">
      {kicker && <p className="kicker">{kicker}</p>}
      <h1 className="display mt-1 text-3xl sm:text-4xl">{title}</h1>
      {dek && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{dek}</p>}
      {children}
      <div className="rule mt-5" />
    </header>
  );
}
