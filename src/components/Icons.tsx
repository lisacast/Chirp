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
    <circle cx="12" cy="12" r="10" fill="#e25945" />
    <circle cx="12" cy="12" r="4.5" fill="#b8cdd2" />
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
      stroke="#16202a"
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
