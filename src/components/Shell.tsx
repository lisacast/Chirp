"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CardsIcon, ChatIcon, ExitIcon, HomeIcon, LeafIcon, LifebuoyIcon, WindIcon } from "./Icons";
import { hasAgreed, loadProfile } from "@/lib/profile";
import { trackPage } from "@/lib/track";

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

const TABS = [
  { href: "/lobby", label: "Today", Icon: HomeIcon },
  { href: "/tools", label: "Tools", Icon: WindIcon },
  { href: "/chat", label: "Chat", Icon: ChatIcon },
  { href: "/skills", label: "Skills", Icon: CardsIcon },
  { href: "/meditate", label: "Meditate", Icon: LeafIcon },
];
const DESKTOP = [...TABS, { href: "/learn", label: "Learn" }, { href: "/progress", label: "Progress" }];

const WIDTHS = { narrow: "max-w-2xl", medium: "max-w-4xl", wide: "max-w-6xl" };

// Quick exit: clears this visit's chat and leaves the site, for privacy.
function quickExit() {
  try {
    sessionStorage.clear();
  } catch {}
  window.location.replace("https://www.google.com");
}

export default function Shell({ children, gated = true, fill = false, hideNav = false, width = "narrow" }: ShellProps) {
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

  useEffect(() => {
    trackPage(path);
  }, [path]);

  const showNav = !hideNav && signedIn;
  const showTabs = showNav && !fill;
  const active = (href: string) =>
    path === href || path === `${href}/` || (href !== "/lobby" && path.startsWith(`${href}/`));

  return (
    <div className={`flex w-full flex-col bg-paper ${fill ? "h-dvh" : "min-h-dvh"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-sun focus:px-3 focus:py-2 focus:font-bold focus:text-oxford">
        Skip to content
      </a>

      {/* App bar */}
      <header className="sticky top-0 z-40 bg-oxford pt-[env(safe-area-inset-top)] text-white shadow-md">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-3 sm:px-6">
          <Link href={showNav ? "/lobby" : "/"} aria-label="Chirp home" className="flex shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
              <Image src="/chirp-bird.png" alt="" width={30} height={30} priority />
            </span>
            <span className="text-xl font-bold tracking-tight">Chirp</span>
          </Link>

          {showNav && (
            <nav aria-label="Main" className="ml-4 hidden h-full items-stretch md:flex lg:ml-8">
              {DESKTOP.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active(n.href) ? "page" : undefined}
                  className={`flex items-center border-b-4 px-2 text-sm font-bold lg:px-3 ${
                    active(n.href) ? "border-sun text-white" : "border-transparent text-white/85 hover:text-white"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="ml-auto flex items-center gap-1.5">
            {showNav && fill && (
              <Link href="/lobby" aria-label="Home" className="rounded-lg p-2 hover:bg-white/10 md:hidden">
                <HomeIcon className="h-6 w-6" />
              </Link>
            )}
            <Link
              href="/help"
              className="flex items-center gap-1.5 rounded-lg bg-sun px-2.5 py-1.5 text-sm font-extrabold text-oxford hover:brightness-95"
            >
              <LifebuoyIcon className="h-6 w-6" />
              <span>Help</span>
              <span className="hidden sm:inline">now</span>
            </Link>
            <button
              onClick={quickExit}
              aria-label="Quick exit"
              title="Quick exit: leave this site fast"
              className="flex items-center gap-1 rounded-lg border border-white/40 px-2.5 py-1.5 text-sm font-bold hover:bg-white/10"
            >
              <ExitIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </header>

      <main
        id="main"
        className={`mx-auto flex w-full flex-1 flex-col px-4 sm:px-6 ${
          fill ? "min-h-0 max-w-3xl pt-3" : `${WIDTHS[width]} pt-5 pb-8 sm:pt-8`
        } ${showTabs ? "pb-24 md:pb-8" : ""}`}
      >
        {ready ? children : null}
      </main>

      {!fill && (
        <footer className={`bg-oxford text-white ${showTabs ? "pb-20 md:pb-0" : ""}`}>
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-white/10 px-4 py-3">
              <p className="text-sm font-bold">
                <span className="text-sun">In crisis?</span> Call or text{" "}
                <a href="tel:988" className="underline">988</a>
                <span className="hidden sm:inline">, or call 911 in an emergency</span>
              </p>
              <Link href="/help" className="shrink-0 rounded-lg bg-sun px-3 py-1.5 text-sm font-extrabold text-oxford">
                Get help
              </Link>
            </div>
            <nav aria-label="Footer" className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm font-semibold text-white/90 sm:grid-cols-4">
              {[
                ["/tools", "Tools"],
                ["/learn", "Learn"],
                ["/meditate", "Meditate"],
                ["/faq", "FAQ"],
                ["/practice", "Tips"],
                ["/progress", "Progress"],
                ["/terms", "Terms of Use"],
                ["/privacy", "Privacy Policy"],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="hover:text-sun hover:underline">
                  {label}
                </Link>
              ))}
            </nav>
            <p className="mt-5 border-t border-white/15 pt-4 text-xs text-white/70">
              <span className="font-bold text-white">Chirp</span> · Ages 13+ · An educational skills app, not a medical service. © {new Date().getFullYear()} NewPath.
            </p>
          </div>
        </footer>
      )}

      {/* Bottom tab bar (phones and tablets) */}
      {showTabs && (
        <nav
          aria-label="Tabs"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-oxford pb-[env(safe-area-inset-bottom)] md:hidden"
        >
          <ul className="mx-auto grid max-w-lg grid-cols-5">
            {TABS.map(({ href, label, Icon }) => {
              const on = active(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={on ? "page" : undefined}
                    className={`flex h-16 flex-col items-center justify-center gap-0.5 text-xs font-bold ${
                      on ? "text-sun" : "text-white/80"
                    }`}
                  >
                    <span className={`flex h-7 w-12 items-center justify-center rounded-full ${on ? "bg-white/15" : ""}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}
