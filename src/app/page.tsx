"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Shell from "@/components/Shell";
import { loadProfile, updateProfile } from "@/lib/profile";

export default function Welcome() {
  const router = useRouter();
  const [age, setAge] = useState(false);
  const [terms, setTerms] = useState(false);
  const [nickname, setNickname] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loadProfile().agreedAt) router.replace("/lobby");
    else setChecked(true);
  }, [router]);

  if (!checked) return null;

  function start(e: React.FormEvent) {
    e.preventDefault();
    if (!age || !terms) return;
    updateProfile({ agreedAt: new Date().toISOString(), nickname: nickname.trim().slice(0, 30) || undefined });
    router.push("/mood");
  }

  return (
    <Shell gated={false} hideNav>
      <div className="flex flex-1 flex-col rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-4xl font-bold text-navy">Welcome!</h1>
        <p className="mt-3 text-ink/80">
          Meet Chirp, your friendly guide with helpful skills for feelings, stress and relationships.
        </p>

        <form onSubmit={start} className="mt-6 flex flex-1 flex-col gap-4">
          <label className="block">
            <span className="font-semibold">What should Chirp call you? (optional)</span>
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={30}
              placeholder="A nickname is perfect"
              className="mt-2 w-full rounded-xl border border-navy/30 px-4 py-3 outline-none focus:border-navy"
            />
            <span className="mt-1 block text-xs text-ink/60">Please don&apos;t use your full name.</span>
          </label>

          <label className="flex items-start gap-3">
            <input type="checkbox" checked={age} onChange={(e) => setAge(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-coral" />
            <span>I am 13 years of age or older.</span>
          </label>

          <label className="flex items-start gap-3">
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-coral" />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="font-semibold text-coral underline">
                terms of use and medical disclaimer
              </Link>
              . I understand Chirp is not a therapist or emergency service.
            </span>
          </label>

          <div className="mt-auto space-y-3 pt-4">
            <button type="submit" disabled={!age || !terms} className="btn btn-navy">
              Let&apos;s go
            </button>
            <Link href="/faq" className="btn btn-outline">
              Read the FAQ first
            </Link>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-ink/70">
          In crisis? Call or text <a href="tel:988" className="font-bold text-brick">988</a> or text HOME to{" "}
          <a href="sms:741741?&body=HOME" className="font-bold text-brick">741741</a>.
        </p>
      </div>
    </Shell>
  );
}
