"use client";

// Free text-to-speech using the browser's built-in voices (no service, no cost).

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function pickVoice(): SpeechSynthesisVoice | undefined {
  if (!speechSupported()) return;
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  const prefs = [/natural/i, /neural/i, /samantha/i, /aria/i, /jenny/i, /google us english/i, /serena/i, /karen/i, /moira/i, /daniel/i, /zira/i];
  for (const p of prefs) {
    const v = voices.find((x) => p.test(x.name));
    if (v) return v;
  }
  return voices.find((v) => v.lang === "en-US") ?? voices[0];
}

/** Speak text; resolves when finished or cancelled. */
export function say(text: string, rate = 0.88): Promise<void> {
  return new Promise((resolve) => {
    if (!speechSupported()) return resolve();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice();
    if (v) u.voice = v;
    u.rate = rate;
    u.pitch = 1;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    speechSynthesis.speak(u);
  });
}

export function stopSpeech() {
  if (speechSupported()) speechSynthesis.cancel();
}

/** Soft background sound made on the device: gentle brown noise ("ocean") or a low drone ("hum"). */
export function startAmbient(kind: "ocean" | "hum"): () => void {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return () => {};
  const ctx = new AC();
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(ctx.destination);
  const nodes: AudioNode[] = [];
  if (kind === "ocean") {
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      data[i] = last * 3.5;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 0.05;
    const wave = ctx.createGain();
    wave.gain.value = 0.12;
    lfo.connect(lfoGain).connect(wave.gain);
    src.connect(wave).connect(gain);
    src.start();
    lfo.start();
    nodes.push(src, lfo);
  } else {
    for (const f of [110, 164.8, 220]) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = f === 110 ? 0.05 : 0.02;
      o.connect(g).connect(gain);
      o.start();
      nodes.push(o);
    }
  }
  gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 3);
  return () => {
    try {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      setTimeout(() => ctx.close(), 1200);
    } catch {}
  };
}
