"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

export type BirdMood = "idle" | "listening" | "thinking" | "reply";

// Chirp, the bird, reacting in chat: breathes when idle, hops now and then,
// tilts its head while you type, bobs while thinking, ruffles its feathers on reply.
export default function LiveBird({ mood, size = 56, onTap }: { mood: BirdMood; size?: number; onTap?: () => void }) {
  const [burst, setBurst] = useState<"" | "hop" | "ruffle">("");
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  const play = (b: "hop" | "ruffle", ms: number) => {
    setBurst(b);
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => setBurst(""), ms);
  };

  useEffect(() => {
    if (mood === "reply") play("ruffle", 750);
  }, [mood]);

  useEffect(() => {
    if (mood !== "idle") return;
    const i = setInterval(() => play(Math.random() < 0.6 ? "hop" : "ruffle", 850), 5200 + Math.random() * 3000);
    return () => clearInterval(i);
  }, [mood]);

  useEffect(() => () => {
    if (t.current) clearTimeout(t.current);
  }, []);

  const cls = burst === "hop" ? "bird-hop" : burst === "ruffle" ? "bird-ruffle" : mood === "thinking" ? "bird-think" : mood === "listening" ? "bird-tilt" : "bird-idle";
  return (
    <button
      type="button"
      onClick={() => {
        play("hop", 850);
        onTap?.();
      }}
      aria-label="Chirp the bird"
      className="relative shrink-0 rounded-full bg-white shadow-sm ring-2 ring-sun"
      style={{ width: size, height: size }}
    >
      <img src="/chirp-bird.png" alt="" width={size} height={size} className={`h-full w-full p-1 ${cls}`} />
    </button>
  );
}
