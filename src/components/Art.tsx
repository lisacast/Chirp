/* eslint-disable @next/next/no-img-element */
import { gradientCss, photoSrc, pickPhoto, scrimCss, THEMES, type ThemeKey } from "@/data/art";

// Theme imagery: one of the owner's photos, softly tinted in the theme colour so
// colour coding still reads. Pass scrim to darken the bottom for overlaid white text.
// Pass photo to force a specific photo number.
export default function Art({
  theme,
  seed = "",
  className = "",
  scrim = false,
  photo,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  theme: ThemeKey;
  seed?: string;
  className?: string;
  scrim?: boolean;
  motif?: boolean;
  photo?: number;
  priority?: boolean;
  sizes?: string;
}) {
  const n = photo ?? pickPhoto(theme, seed);
  const mid = THEMES[theme].stops[1];
  return (
    <span aria-hidden className={`${className.includes("absolute") ? "" : "relative "}block overflow-hidden ${className}`} style={{ background: gradientCss(theme, seed) }}>
      <img
        src={photoSrc(n, true)}
        srcSet={`${photoSrc(n, true)} 560w, ${photoSrc(n)} 1200w`}
        sizes={sizes}
        alt=""
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${mid}59, transparent 60%)` }} />
      {scrim && <span className="absolute inset-0" style={{ background: scrimCss(theme) }} />}
    </span>
  );
}
