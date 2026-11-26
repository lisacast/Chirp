"use client";

// On-device profile. Nothing here leaves the person's browser.

export interface Profile {
  agreedAt?: string; // passed the age check and accepted the terms
  termsVersion?: number; // which version of the terms and age check was accepted
  ageBlocked?: boolean; // age check showed under 13: the Service stays closed on this device
  nickname?: string;
  mood?: string;
  moodDate?: string;
  practiced: string[]; // skill ids
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
