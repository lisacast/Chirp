type P = { className?: string };

export const HomeIcon = ({ className = "w-7 h-7" }: P) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M12 3 2 11.5h3V21h5.5v-6h3v6H19v-9.5h3L12 3Z" />
  </svg>
);

export const LifebuoyIcon = ({ className = "w-7 h-7" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <circle cx="12" cy="12" r="10" fill="#C8321E" />
    <circle cx="12" cy="12" r="4.5" fill="#ffffff" />
    <path
      d="M5 5l4 4M19 5l-4 4M5 19l4-4M19 19l-4-4"
      stroke="white"
      strokeWidth="3.4"
    />
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="#001C38"
      strokeWidth="1"
    />
  </svg>
);

export const ExitIcon = ({ className = "w-7 h-7" }: P) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    className={className}
    aria-hidden
  >
    <path d="M14 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h8" strokeLinecap="round" />
    <path
      d="M11 12h10m-3.5-3.5L21 12l-3.5 3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SendIcon = ({ className = "w-6 h-6" }: P) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden
  >
    <path
      d="M21 3 3 10.5l7 2.5m11-10-8 18-3-8m11-10L10 13"
      strokeLinejoin="round"
    />
  </svg>
);

const line = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const ChatIcon = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...line}>
    <path d="M4 5h16v11H9l-5 4V5Z" />
  </svg>
);

export const CardsIcon = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...line}>
    <rect x="7" y="3" width="13" height="16" rx="2" />
    <path d="M4 7v12a2 2 0 0 0 2 2h10" />
  </svg>
);

export const LeafIcon = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...line}>
    <path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" />
    <path d="M5 19 13 11" />
  </svg>
);

export const SunIcon = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...line}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const ChevronIcon = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...line}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const HeadphonesIcon = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...line}>
    <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
    <rect x="3" y="14" width="5" height="7" rx="2" />
    <rect x="16" y="14" width="5" height="7" rx="2" />
  </svg>
);

export const BookIcon = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...line}>
    <path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2Z" />
    <path d="M12 6v14" />
  </svg>
);

export const GridIcon = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...line}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export const HeartIcon = ({ className = "w-6 h-6", filled = false }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...line} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
  </svg>
);

export const PlayIcon = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);

export const PauseIcon = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);

export const WindIcon = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden {...line}>
    <path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8" />
  </svg>
);
