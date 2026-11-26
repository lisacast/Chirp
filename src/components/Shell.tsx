"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ExitIcon, HomeIcon, LifebuoyIcon } from "./Icons";
import { hasAgreed, loadProfile } from "@/lib/profile";

interface ShellProps {
  children: React.ReactNode;
  /** Require the age check and terms agreement before showing the page. */
  gated?: boolean;
  /** Fill the viewport height (used by chat). */
  fill?: boolean;
  hideNav?: boolean;
}

export default function Shell({ children, gated = true, fill = false, hideNav = false }: ShellProps) {
  const router = useRouter();
  const [ready, setReady] = useState(!gated);

  useEffect(() => {
    if (!gated) return;
    if (!hasAgreed(loadProfile())) router.replace("/");
    else setReady(true);
  }, [gated, router]);

  // Quick exit: clears this visit's chat and leaves the site, for privacy.
  function quickExit() {
    try {
      sessionStorage.clear();
    } catch {}
    window.location.replace("https://www.google.com");
  }

  return (
    <div className={`mx-auto flex w-full max-w-xl flex-col px-4 ${fill ? "h-dvh" : "min-h-dvh"}`}>
      <header className="flex items-center justify-between pt-[max(env(safe-area-inset-top),0.75rem)] pb-2">
        {hideNav ? (
          <span className="w-9" />
        ) : (
          <Link href="/lobby" aria-label="Home" className="rounded-full p-1 text-ink hover:bg-white/40">
            <HomeIcon />
          </Link>
        )}
        <Link href={ready && !hideNav ? "/lobby" : "/"} aria-label="PlayChirp home">
          <Image src="/chirp-bird.png" alt="Chirp" width={52} height={52} priority />
        </Link>
        <Link href="/help" aria-label="Get help now" className="rounded-full p-1 hover:bg-white/40">
          <LifebuoyIcon className="h-9 w-9" />
        </Link>
      </header>

      <main className={`flex flex-1 flex-col ${fill ? "min-h-0" : "pb-6"}`}>{ready ? children : null}</main>

      {!hideNav && !fill && (
        <footer className="flex items-center justify-center gap-6 pb-[max(env(safe-area-inset-bottom),1rem)] pt-2 text-white">
          <Link href="/lobby" aria-label="Home" className="drop-shadow">
            <HomeIcon className="h-8 w-8" />
          </Link>
          <button onClick={quickExit} aria-label="Quick exit" title="Quick exit" className="drop-shadow">
            <ExitIcon className="h-8 w-8" />
          </button>
        </footer>
      )}
    </div>
  );
}
