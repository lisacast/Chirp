/* eslint-disable @next/next/no-img-element */
import { artSrc } from "@/data/art";

// Responsive illustration. Decorative by default (alt="").
export default function Art({
  n,
  className = "",
  alt = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  n: number;
  className?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <img
      src={artSrc(n, true)}
      srcSet={`${artSrc(n, true)} 640w, ${artSrc(n)} 1200w`}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`object-cover ${className}`}
    />
  );
}
