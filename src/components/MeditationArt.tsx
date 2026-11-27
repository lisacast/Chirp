/* eslint-disable @next/next/no-img-element */
import { MEDITATION_PHOTO, photoSrc } from "@/data/art";

// Each meditation has its own photo that matches its theme (a sunrise field, a still lake,
// a forest stream, rain on water...). Bottom is darkened so white text stays readable.
export default function MeditationArt({ id, className = "", scrim = true }: { id: string; className?: string; scrim?: boolean }) {
  const n = MEDITATION_PHOTO[id] ?? 3;
  return (
    <span aria-hidden className={`${className.includes("absolute") ? "" : "relative "}block overflow-hidden bg-[#0E0B33] ${className}`}>
      <img src={photoSrc(n, true)} srcSet={`${photoSrc(n, true)} 560w, ${photoSrc(n)} 1200w`} sizes="(min-width: 1024px) 33vw, 100vw" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      {scrim && <span className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,10,30,0.9), rgba(8,10,30,0.35) 45%, transparent 75%)" }} />}
    </span>
  );
}
