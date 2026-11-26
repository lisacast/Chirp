"use client";

// On-device profile for v1. Nothing here leaves the person's browser.
// Accounts (Supabase) can replace this later without changing the pages.

export interface Profile {
  agreedAt?: string; // confirmed 13+ and accepted terms
  nickname?: string;
  mood?: string;
  moodDate?: string;
  practiced: string[]; // skill ids
}

const KEY = "playchirp.profile.v1";

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
  if (!p.practiced.includes(skillId)) p.practiced = [...p.practiced, skillId];
  saveProfile(p);
  return p;
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
