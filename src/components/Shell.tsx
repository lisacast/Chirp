"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ExitIcon, HomeIcon, LifebuoyIcon } from "./Icons";
import { hasAgreed, loadProfile } from "@/lib/profile";

interface ShellProps {
  children: React.ReactNode;
  /** Require the age check and terms agreement before showing the page. */
  gated?: boolean;
  /** Fill the viewport height (used by chat). */
  fill?: boolean;
  /** Hide the app navigation (welcome and age-check screens). */
  hideNav?: boolean;
  /** Content width: "narrow" is a single readable column, "wide" allows grids on big screens. */
  width?: "narrow" | "medium" | "wide";
}

const NAV = [
  { href: "/lobby", label: "Home" },
  { href: "/chat", label: "Chat" },
  { href: "/skills", label: "Skills" },
  { href: "/mindful", label: "Mindful" },
  { href: "/joy", label: "Joy finder" },
  { href: "/faq", label: "FAQ" },
];

const WIDTHS = { narrow: "max-w-2xl", medium: "max-w-4xl", wide: "max-w-6xl" };

// Quick exit: clears this visit's chat and leaves the site, for privacy.
function quickExit() {
  try {
    sessionStorage.clear();
  } catch {}
  window.location.replace("https://www.google.com");
}

export default function Shell({
  children,
  gated = true,
  fill = false,
  hideNav = false,
  width = "narrow",
}: ShellProps) {
  const router = useRouter();
  const path = usePathname();
  const [ready, setReady] = useState(!gated);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const ok = hasAgreed(loadProfile());
    setSignedIn(ok);
    if (!gated) return;
    if (!ok) router.replace("/");
    else setReady(true);
  }, [gated, router]);

  const showNav = !hideNav && signedIn;
  const active = (href: string) =>
    path === href ||
    path === `${href}/` ||
    (href !== "/lobby" && path.startsWith(`${href}/`));

  return (
    <div className={`flex w-full flex-col ${fill ? "h-dvh" : "min-h-dvh"}`}>
      <header className="sticky top-0 z-40 border-b border-white/40 bg-sky/85 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link
            href={showNav ? "/lobby" : "/"}
            aria-label="PlayChirp home"
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/chirp-bird.png"
              alt=""
              width={44}
              height={44}
              priority
            />
            <span className="text-lg font-bold tracking-tight text-navy">
              PlayChirp
            </span>
          </Link>

          {showNav && (
            <nav
              aria-label="Main"
              className="ml-4 hidden flex-1 items-center gap-1 lg:flex"
            >
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active(n.href) ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                    active(n.href)
                      ? "bg-white text-navy shadow-sm"
                      : "text-ink/80 hover:bg-white/60"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {showNav && fill && (
              <Link
                href="/lobby"
                aria-label="Home"
                className="rounded-full p-2 text-ink hover:bg-white/60 lg:hidden"
              >
                <HomeIcon className="h-6 w-6" />
              </Link>
            )}
            <Link
              href="/help"
              className="flex items-center gap-2 rounded-full bg-white px-2 py-1.5 text-sm font-bold text-brick shadow-sm hover:bg-white/90 sm:px-3"
            >
              <LifebuoyIcon className="h-7 w-7" />
              <span className="hidden sm:inline">Get help now</span>
            </Link>
            <button
              onClick={quickExit}
              aria-label="Quick exit"
              title="Quick exit: leave this site fast"
              className="flex items-center gap-1 rounded-full px-2 py-2 text-sm font-semibold text-ink hover:bg-white/60"
            >
              <ExitIcon className="h-6 w-6" />
              <span className="hidden md:inline">Exit</span>
            </button>
          </div>
        </div>

        {showNav && !fill && (
          <nav aria-label="Main" className="border-t border-white/40 lg:hidden">
            <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 py-2 [scrollbar-width:none]">
              {NAV.map((n) => (
                <li key={n.href} className="shrink-0">
                  <Link
                    href={n.href}
                    aria-current={active(n.href) ? "page" : undefined}
                    className={`block rounded-full px-3 py-1.5 text-sm font-semibold ${
                      active(n.href)
                        ? "bg-white text-navy shadow-sm"
                        : "text-ink/80"
                    }`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main
        className={`mx-auto flex w-full flex-1 flex-col px-4 sm:px-6 ${fill ? "min-h-0 max-w-3xl pt-3" : `${WIDTHS[width]} py-6 sm:py-10`}`}
      >
        {ready ? children : null}
      </main>

      {!fill && (
        <footer className="mt-auto border-t border-white/40 bg-slate text-white/85">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 text-sm sm:grid-cols-3 sm:px-6">
            <div>
              <p className="flex items-center gap-2 text-base font-bold text-white">
                <Image src="/chirp-bird.png" alt="" width={28} height={28} />{" "}
                PlayChirp
              </p>
              <p className="mt-2 max-w-xs">
                Skills for feelings, stress and relationships. For ages 13 and
                up.
              </p>
            </div>
            <div>
              <p className="font-bold text-white">In crisis?</p>
              <p className="mt-2">
                Call or text{" "}
                <a href="tel:988" className="font-bold text-sun underline">
                  988
                </a>
                , text HOME to{" "}
                <a
                  href="sms:741741?&body=HOME"
                  className="font-bold text-sun underline"
                >
                  741741
                </a>
                , or call 911 in an emergency.
              </p>
            </div>
            <nav
              aria-label="Footer"
              className="flex flex-wrap content-start gap-x-4 gap-y-2 sm:justify-end"
            >
              <Link href="/faq" className="underline-offset-2 hover:underline">
                FAQ
              </Link>
              <Link href="/help" className="underline-offset-2 hover:underline">
                Get help
              </Link>
              <Link
                href="/terms"
                className="underline-offset-2 hover:underline"
              >
                Terms of Use
              </Link>
              <Link
                href="/privacy"
                className="underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
          <p className="mx-auto max-w-6xl px-4 pb-[max(env(safe-area-inset-bottom),1.5rem)] text-xs text-white/60 sm:px-6">
            PlayChirp is an educational skills app, not a medical service. ©{" "}
            {new Date().getFullYear()} NewPath.
          </p>
        </footer>
      )}
    </div>
  );
}
