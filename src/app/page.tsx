"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import Art from "@/components/Art";
import { ART } from "@/data/art";
import { track } from "@/lib/track";
import {
  hasAgreed,
  loadProfile,
  TERMS_VERSION,
  updateProfile,
} from "@/lib/profile";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MIN_AGE = 13;

// Age from birth month and year. When the birth month is the current month we can't
// tell if the birthday has passed yet, so we count it as not yet reached.
function ageFrom(month: number, year: number, now = new Date()): number {
  const m = now.getMonth() + 1;
  return now.getFullYear() - year - (m <= month ? 1 : 0);
}

export default function Welcome() {
  const router = useRouter();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [terms, setTerms] = useState(false);
  const [nickname, setNickname] = useState("");
  const [state, setState] = useState<"loading" | "form" | "blocked">("loading");

  useEffect(() => {
    const p = loadProfile();
    if (p.ageBlocked) setState("blocked");
    else if (hasAgreed(p)) router.replace("/lobby");
    else setState("form");
  }, [router]);

  if (state === "loading") return null;

  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => thisYear - i);
  const ready = month !== "" && year !== "" && terms;

  function start(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;
    // The birth date is used only here, on the device, and is never saved or sent.
    if (ageFrom(Number(month), Number(year)) < MIN_AGE) {
      try {
        sessionStorage.clear();
      } catch {}
      updateProfile({
        ageBlocked: true,
        nickname: undefined,
        agreedAt: undefined,
      });
      track("age_block");
      setState("blocked");
      return;
    }
    updateProfile({
      agreedAt: new Date().toISOString(),
      termsVersion: TERMS_VERSION,
      nickname: nickname.trim().slice(0, 30) || undefined,
    });
    track("age_pass");
    router.push("/mood");
  }

  if (state === "blocked") {
    return (
      <Shell gated={false} hideNav>
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col card p-5 sm:p-8">
          <h1 className="text-3xl font-extrabold text-oxford">
            Thanks for stopping by!
          </h1>
          <p className="mt-3 text-ink">
            Chirp is made for people 13 and older, so it isn&apos;t
            available to you yet. We didn&apos;t save anything you entered.
          </p>
          <p className="mt-3 text-ink">
            If something is bothering you, a parent, teacher, school counselor
            or another trusted adult can help.
          </p>
          <p className="mt-6 rounded-2xl border-2 border-oxford bg-white p-4 text-sm">
            If you feel unsafe or need to talk to someone right now, call or
            text{" "}
            <a href="tel:988" className="font-bold text-brick">
              988
            </a>
            , text HOME to{" "}
            <a href="sms:741741?&body=HOME" className="font-bold text-brick">
              741741
            </a>
            , or call{" "}
            <a href="tel:911" className="font-bold text-brick">
              911
            </a>{" "}
            in an emergency.
          </p>
          <p className="mt-auto pt-6 text-center text-xs text-muted">
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="underline">
              Terms of Use
            </Link>
          </p>
        </div>
      </Shell>
    );
  }

  const select =
    "mt-2 w-full rounded-xl border border-muted bg-white px-3 py-3 outline-none focus:border-oxford";

  return (
    <Shell gated={false} hideNav width="wide">
      <div className="grid flex-1 items-start gap-4 lg:grid-cols-2 lg:gap-14">
        <section className="relative flex min-h-56 items-end gap-4 overflow-hidden rounded-2xl bg-oxford p-5 text-white lg:block lg:min-h-[36rem] lg:p-10">
          <Art theme={ART.welcome} seed="welcome" scrim className="absolute inset-0 h-full w-full" />
          <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white lg:h-32 lg:w-32">
            <Image src="/chirp-bird.png" alt="" width={120} height={120} priority className="h-12 w-12 lg:h-24 lg:w-24" />
          </span>
          <div className="relative">
          <h2 className="text-xl font-extrabold leading-tight lg:mt-6 lg:text-4xl">
            Skills for big feelings, any time.
          </h2>
          <p className="mt-1 max-w-md text-sm text-white/90 lg:mt-4 lg:text-lg">
            Chirp is a friendly guide that helps you practice coping skills for
            stress, emotions and relationships.
          </p>
          <ul className="mt-8 hidden space-y-3 font-semibold text-white lg:block">
            <li className="flex gap-3">
              <span aria-hidden>💬</span> A private chat that suggests skills
              that fit how you feel
            </li>
            <li className="flex gap-3">
              <span aria-hidden>🃏</span> Flashcards for 26 skills, plus articles and guided meditations
            </li>
            <li className="flex gap-3">
              <span aria-hidden>🧘</span> Short mindful exercises and a joy
              finder
            </li>
            <li className="flex gap-3">
              <span aria-hidden>🔒</span> No account, no ads and no third-party trackers
            </li>
          </ul>
          </div>
        </section>
        <div className="mx-auto flex w-full max-w-lg flex-col card p-5 sm:p-8 lg:mx-0">
          <h1 className="text-3xl font-extrabold text-oxford">Welcome!</h1>
          <p className="mt-2 text-muted">Let&apos;s get you started.</p>

          <form onSubmit={start} className="mt-6 flex flex-col gap-4">
            <fieldset>
              <legend className="font-semibold">When were you born?</legend>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="sr-only">Birth month</span>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className={select}
                    required
                  >
                    <option value="">Month</option>
                    {MONTHS.map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="sr-only">Birth year</span>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className={select}
                    required
                  >
                    <option value="">Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <span className="mt-1 block text-xs text-muted">
                This stays on your device. We don&apos;t save it.
              </span>
            </fieldset>

            <label className="block">
              <span className="font-semibold">
                What should Chirp call you? (optional)
              </span>
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={30}
                placeholder="A nickname is perfect"
                className="mt-2 w-full rounded-xl border border-muted px-4 py-3 outline-none focus:border-oxford"
              />
              <span className="mt-1 block text-xs text-muted">
                Please don&apos;t use your full name.
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-red"
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-red underline"
                >
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-red underline"
                >
                  Privacy Policy
                </Link>
                . I understand Chirp is not a medical app, therapy or an
                emergency service.
              </span>
            </label>

            <div className="space-y-3 pt-2">
              <button type="submit" disabled={!ready} className="btn btn-navy">
                Let&apos;s go
              </button>
              <Link href="/faq" className="btn btn-outline">
                Read the FAQ first
              </Link>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            In crisis? Call or text{" "}
            <a href="tel:988" className="font-bold text-brick">
              988
            </a>{" "}
            or text HOME to{" "}
            <a href="sms:741741?&body=HOME" className="font-bold text-brick">
              741741
            </a>
            .
          </p>
        </div>
      </div>
    </Shell>
  );
}
