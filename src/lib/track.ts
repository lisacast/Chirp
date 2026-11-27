"use client";

// Anonymous, aggregate-only usage counts for the admin dashboard.
// No IDs, cookies, names, messages or IP addresses are sent or stored:
// each call adds 1 to a daily counter on our own server. Respects Global Privacy Control.

const ENDPOINT = "/api/track.php";
const SEEN = "chirp.seen.v1";

function allowed(): boolean {
  if (typeof window === "undefined") return false;
  const n = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (n.globalPrivacyControl) return false;
  return location.hostname !== "localhost" || location.port === "8765";
}

function send(events: string[]) {
  if (!allowed() || events.length === 0) return;
  const body = JSON.stringify({ e: events.slice(0, 12) });
  try {
    if (navigator.sendBeacon) navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
    else fetch(ENDPOINT, { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
  } catch {}
}

/** Count one event, e.g. track("listen_done", "body-scan"). */
export function track(name: string, detail?: string) {
  send([detail ? `${name}:${detail}` : name]);
}

function device(): string {
  const w = window.innerWidth;
  return w < 640 ? "phone" : w < 1024 ? "tablet" : "desktop";
}

function refHost(): string {
  try {
    if (!document.referrer) return "direct";
    const h = new URL(document.referrer).hostname.replace(/^www\./, "");
    return h === location.hostname.replace(/^www\./, "") ? "" : h.slice(0, 40);
  } catch {
    return "direct";
  }
}

const daysBetween = (a: string, b: Date) => Math.floor((b.getTime() - new Date(a).getTime()) / 86400000);

/** Page view plus once-a-day / once-a-week / once-a-month "active device" counts and retention. */
export function trackPage(path: string) {
  if (!allowed()) return;
  const events = [`pv:${path.replace(/\/+$/, "") || "/"}`];
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const week = `${now.getUTCFullYear()}-w${Math.ceil(((+now - +new Date(Date.UTC(now.getUTCFullYear(), 0, 1))) / 86400000 + 1) / 7)}`;
  const month = day.slice(0, 7);
  let seen: { first?: string; d?: string; w?: string; m?: string; ret?: string[] } = {};
  try {
    seen = JSON.parse(localStorage.getItem(SEEN) || "{}");
  } catch {}
  if (!seen.first) {
    seen.first = day;
    events.push("new_device", `device:${device()}`);
    const r = refHost();
    if (r) events.push(`ref:${r}`);
  }
  if (seen.d !== day) {
    seen.d = day;
    events.push("dau", `hour:${now.getHours()}`);
    if (seen.first !== day) events.push("returning");
    const age = daysBetween(seen.first, now);
    seen.ret = seen.ret ?? [];
    for (const n of [1, 7, 30]) {
      if (age >= n && !seen.ret.includes(`d${n}`)) {
        seen.ret.push(`d${n}`);
        events.push(`retained_d${n}`);
      }
    }
  }
  if (seen.w !== week) {
    seen.w = week;
    events.push("wau");
  }
  if (seen.m !== month) {
    seen.m = month;
    events.push("mau");
  }
  try {
    localStorage.setItem(SEEN, JSON.stringify(seen));
  } catch {}
  send(events);
}
