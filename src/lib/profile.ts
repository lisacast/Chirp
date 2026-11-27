"use client";

import { track } from "./track";

// On-device profile. Nothing here leaves the person's browser.

export interface Profile {
  agreedAt?: string; // passed the age check and accepted the terms
  termsVersion?: number; // which version of the terms and age check was accepted
  ageBlocked?: boolean; // age check showed under 13: the Service stays closed on this device
  nickname?: string;
  mood?: string;
  moodDate?: string;
  practiced: string[]; // skill ids
  favorites?: string[]; // skill ids saved to the coping kit
  activeDays?: string[]; // YYYY-MM-DD dates with any practice (last 90)
  moods?: Record<string, string>; // YYYY-MM-DD -> mood (last 30)
  listened?: string[]; // meditation ids finished
  read?: string[]; // article slugs read
  bingoLines?: number; // lines already celebrated
}

export function dayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Record that the person did something today (for the streak). */
export function markActive(): Profile {
  const p = loadProfile();
  const today = dayKey();
  const days = p.activeDays ?? [];
  if (!days.includes(today)) p.activeDays = [...days, today].slice(-90);
  saveProfile(p);
  return p;
}

/** Consecutive days of practice ending today or yesterday. */
export function streak(p: Profile): number {
  const set = new Set(p.activeDays ?? []);
  const d = new Date();
  if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(dayKey(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

function addTo(list: string[] | undefined, id: string, max = 200): string[] {
  const l = list ?? [];
  return l.includes(id) ? l : [...l, id].slice(-max);
}

export function toggleFavorite(id: string): Profile {
  const p = loadProfile();
  const f = p.favorites ?? [];
  p.favorites = f.includes(id) ? f.filter((x) => x !== id) : [...f, id];
  saveProfile(p);
  return p;
}

export function markListened(id: string, skillId?: string): Profile {
  const p = loadProfile();
  p.listened = addTo(p.listened, id);
  if (skillId && !p.practiced.includes(skillId)) p.practiced = [...p.practiced, skillId];
  saveProfile(p);
  return markActive();
}

export function markRead(slug: string): Profile {
  const p = loadProfile();
  p.read = addTo(p.read, slug);
  saveProfile(p);
  return p;
}

const KEY = "playchirp.profile.v1";
export const TERMS_VERSION = 2;

export function hasAgreed(p: Profile): boolean {
  return !!p.agreedAt && p.termsVersion === TERMS_VERSION && !p.ageBlocked;
}

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { practiced: [], ...JSON.parse(raw) };
  } catch {}
  return { practiced: [] };
}

export function saveProfile(p: Profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
}

export function updateProfile(patch: Partial<Profile>): Profile {
  const next = { ...loadProfile(), ...patch };
  saveProfile(next);
  return next;
}

export function markPracticed(skillId: string): Profile {
  const p = loadProfile();
  if (!p.practiced.includes(skillId)) {
    p.practiced = [...p.practiced, skillId];
    track("practiced", skillId);
  }
  saveProfile(p);
  return markActive();
}

export function clearProfile() {
  try {
    localStorage.removeItem(KEY);
    sessionStorage.clear();
  } catch {}
}

export function todaysMood(p: Profile): string | undefined {
  return p.moodDate === new Date().toDateString() ? p.mood : undefined;
}
