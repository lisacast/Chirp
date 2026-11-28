"use client";

import Link from "next/link";
import { useState } from "react";
import type { Theme } from "@/data/art";

// Behavior chain analysis: a guided, step-by-step worksheet.
// Nothing typed here is saved or sent. "Talk it through" hands the summary to chat via this tab's memory only.

type LinkType = "Thought" | "Feeling" | "Body" | "Urge" | "Action";
interface ChainLink {
  type: LinkType;
  text: string;
}

const VULN = [
  "Tired",
  "Hungry",
  "Sick or in pain",
  "Stressed",
  "Lonely",
  "Already upset",
  "Conflict earlier",
  "Up late on my phone",
  "Alcohol or drugs",
];
const TYPES: LinkType[] = ["Thought", "Feeling", "Body", "Urge", "Action"];
const BREAKERS: Record<LinkType, [string, string][]> = {
  Thought: [
    ["Check the facts", "/tools/check-facts"],
    ["Wise mind", "/tools/wise-mind-slider"],
    ["Judgment flip", "/tools/judgment-flip"],
  ],
  Feeling: [
    ["Name it to tame it", "/tools/name-it"],
    ["Opposite action", "/tools/opposite-action"],
    ["Ride the wave", "/tools/emotion-wave"],
  ],
  Body: [
    ["TIPP: cold reset", "/tools/tipp-cold"],
    ["Paced breathing", "/tools/tipp-pace"],
    ["Tense and release", "/tools/tense-release"],
  ],
  Urge: [
    ["Urge surfing", "/tools/urge-surf"],
    ["Pros and cons", "/tools/pros-cons"],
    ["15-minute delay", "/tools/urge-delay"],
  ],
  Action: [
    ["STOP", "/tools/stop-skill"],
    ["Opposite action", "/tools/opposite-action"],
    ["Before you reply", "/tools/cool-reply"],
  ],
};
const TYPE_HINT: Record<LinkType, string> = {
  Thought: "e.g. They're ignoring me on purpose",
  Feeling: "e.g. Embarrassed, then angry",
  Body: "e.g. Hot face, tight chest",
  Urge: "e.g. To text something mean",
  Action: "e.g. I typed it out",
};

const STEPS = [
  "The behavior",
  "What set it off",
  "What made me vulnerable",
  "The links in the chain",
  "What happened after",
  "Where a skill could help",
  "Repair",
  "Next time",
];

export default function ChainAnalysis({
  th,
  done,
}: {
  th: Theme;
  done: () => void;
}) {
  const [step, setStep] = useState(0);
  const [behavior, setBehavior] = useState("");
  const [trigger, setTrigger] = useState("");
  const [vuln, setVuln] = useState<string[]>([]);
  const [vulnOther, setVulnOther] = useState("");
  const [links, setLinks] = useState<ChainLink[]>([
    { type: "Thought", text: "" },
  ]);
  const [shortC, setShortC] = useState("");
  const [longC, setLongC] = useState("");
  const [skills, setSkills] = useState<Record<number, string>>({});
  const [repair, setRepair] = useState("");
  const [plan, setPlan] = useState("");
  const [copied, setCopied] = useState(false);
  const fin = step >= STEPS.length;

  const input =
    "mt-2 w-full rounded-xl border-0 bg-white p-3 text-base text-ink outline-none focus:ring-4 focus:ring-sun";
  const chip = (on: boolean) =>
    `rounded-full px-3 py-1.5 text-sm font-bold transition ${on ? "bg-white text-ink" : "bg-white/12 text-white"}`;
  const chipStyle = (on: boolean) =>
    on ? { color: th.stops[0] } : { background: "rgba(255,255,255,0.12)" };
  const filled = links.filter((l) => l.text.trim());

  const summary = [
    `Behavior: ${behavior || "-"}`,
    `Vulnerable because: ${[...vuln, vulnOther].filter(Boolean).join(", ") || "-"}`,
    `Prompting event: ${trigger || "-"}`,
    ...filled.map(
      (l, i) =>
        `Link ${i + 1} (${l.type}): ${l.text}${skills[links.indexOf(l)] ? ` -> skill: ${skills[links.indexOf(l)]}` : ""}`,
    ),
    `Short-term result: ${shortC || "-"}`,
    `Long-term result: ${longC || "-"}`,
    `Repair: ${repair || "-"}`,
    `Next time: ${plan || "-"}`,
  ].join("\n");

  const next = () => {
    const n = step + 1;
    setStep(n);
    if (n === STEPS.length) done();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <p className="text-sm text-white/85">
        Nothing you type here is saved or sent anywhere. Take your time.
      </p>

      {/* Stepper */}
      {!fin && (
        <ol className="mt-4 space-y-1.5">
          {STEPS.map((name, i) => {
            const state = i < step ? "done" : i === step ? "now" : "todo";
            return (
              <li key={name}>
                <button
                  onClick={() => i <= step && setStep(i)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left"
                  style={
                    state === "now"
                      ? { background: "rgba(255,255,255,0.14)" }
                      : {}
                  }
                  disabled={i > step}
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold"
                    style={
                      state === "done"
                        ? { background: th.stops[3], color: th.stops[0] }
                        : state === "now"
                          ? { background: "#fff", color: th.stops[0] }
                          : {
                              border: "2px solid rgba(255,255,255,0.4)",
                              color: "rgba(255,255,255,0.7)",
                            }
                    }
                  >
                    {state === "done" ? "✓" : i + 1}
                  </span>
                  <span
                    className={`text-sm font-bold ${state === "todo" ? "text-white/60" : ""}`}
                  >
                    {name}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      )}

      <div
        className="mt-5 rounded-2xl p-4"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        {step === 0 && (
          <label className="block">
            <span className="text-xl font-bold">
              What did you do, or almost do, that you want to understand?
            </span>
            <span className="mt-1 block text-sm text-white/80">
              Be specific. One behavior, one time.
            </span>
            <textarea
              rows={3}
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
              className={input}
              placeholder="e.g. I sent an angry message to my friend"
            />
          </label>
        )}
        {step === 1 && (
          <label className="block">
            <span className="text-xl font-bold">
              What happened right before it started?
            </span>
            <span className="mt-1 block text-sm text-white/80">
              The prompting event: something that happened outside or inside
              you.
            </span>
            <textarea
              rows={3}
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className={input}
              placeholder="e.g. I saw she'd posted with other friends and didn't reply to me"
            />
          </label>
        )}
        {step === 2 && (
          <div>
            <p className="text-xl font-bold">
              What made you more vulnerable that day?
            </p>
            <p className="mt-1 text-sm text-white/80">
              Things that made the feelings hit harder. Tap all that fit.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {VULN.map((v) => {
                const on = vuln.includes(v);
                return (
                  <button
                    key={v}
                    onClick={() =>
                      setVuln(on ? vuln.filter((x) => x !== v) : [...vuln, v])
                    }
                    aria-pressed={on}
                    className={chip(on)}
                    style={chipStyle(on)}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
            <input
              value={vulnOther}
              onChange={(e) => setVulnOther(e.target.value)}
              className={input}
              placeholder="Anything else?"
            />
          </div>
        )}
        {step === 3 && (
          <div>
            <p className="text-xl font-bold">Now the links, one at a time</p>
            <p className="mt-1 text-sm text-white/80">
              From the trigger to the behavior: each thought, feeling, body
              sensation, urge and action, in order.
            </p>
            <ol className="mt-3 space-y-3">
              {links.map((l, i) => (
                <li key={i} className="rounded-xl bg-black/15 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-[0.12em]">
                      Link {i + 1}
                    </span>
                    {links.length > 1 && (
                      <button
                        onClick={() =>
                          setLinks(links.filter((_, j) => j !== i))
                        }
                        className="text-xs font-bold text-white/80 underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() =>
                          setLinks(
                            links.map((x, j) =>
                              j === i ? { ...x, type: t } : x,
                            ),
                          )
                        }
                        aria-pressed={l.type === t}
                        className={chip(l.type === t)}
                        style={chipStyle(l.type === t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <input
                    value={l.text}
                    onChange={(e) =>
                      setLinks(
                        links.map((x, j) =>
                          j === i ? { ...x, text: e.target.value } : x,
                        ),
                      )
                    }
                    className={input}
                    placeholder={TYPE_HINT[l.type]}
                  />
                </li>
              ))}
            </ol>
            <button
              onClick={() =>
                setLinks([
                  ...links,
                  { type: TYPES[links.length % TYPES.length], text: "" },
                ])
              }
              className="mt-3 rounded-xl border-2 border-dashed border-white/60 px-4 py-2 text-sm font-extrabold"
            >
              + Add a link
            </button>
          </div>
        )}
        {step === 4 && (
          <div>
            <p className="text-xl font-bold">What happened after?</p>
            <label className="mt-3 block">
              <span className="text-sm font-extrabold">
                Right away (for me and others)
              </span>
              <textarea
                rows={2}
                value={shortC}
                onChange={(e) => setShortC(e.target.value)}
                className={input}
                placeholder="e.g. I felt relieved for a minute"
              />
            </label>
            <label className="mt-3 block">
              <span className="text-sm font-extrabold">Later on</span>
              <textarea
                rows={2}
                value={longC}
                onChange={(e) => setLongC(e.target.value)}
                className={input}
                placeholder="e.g. She's upset and I feel guilty"
              />
            </label>
          </div>
        )}
        {step === 5 && (
          <div>
            <p className="text-xl font-bold">
              Where could a skill break the chain?
            </p>
            <p className="mt-1 text-sm text-white/80">
              Pick one skill for any link. You only need to break one link to
              change the ending.
            </p>
            {filled.length === 0 && (
              <p className="mt-3 font-bold">
                Go back and add a few links first.
              </p>
            )}
            <ol className="mt-3 space-y-3">
              {links.map((l, i) =>
                l.text.trim() ? (
                  <li key={i}>
                    <p className="text-sm font-bold">
                      <span className="opacity-80">{l.type}:</span> {l.text}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {BREAKERS[l.type].map(([name]) => (
                        <button
                          key={name}
                          onClick={() =>
                            setSkills({
                              ...skills,
                              [i]: skills[i] === name ? "" : name,
                            })
                          }
                          aria-pressed={skills[i] === name}
                          className={chip(skills[i] === name)}
                          style={chipStyle(skills[i] === name)}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </li>
                ) : null,
              )}
            </ol>
          </div>
        )}
        {step === 6 && (
          <label className="block">
            <span className="text-xl font-bold">
              Is there anything to repair?
            </span>
            <span className="mt-1 block text-sm text-white/80">
              If someone was affected, what could you say or do? If not, write
              how you&apos;ll care for yourself.
            </span>
            <textarea
              rows={3}
              value={repair}
              onChange={(e) => setRepair(e.target.value)}
              className={input}
              placeholder="e.g. Apologize for the message and explain I was hurt"
            />
          </label>
        )}
        {step === 7 && (
          <label className="block">
            <span className="text-xl font-bold">Next time, I will…</span>
            <span className="mt-1 block text-sm text-white/80">
              One small, specific plan. Lowering a vulnerability counts too.
            </span>
            <textarea
              rows={3}
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className={input}
              placeholder="e.g. Put my phone down and do paced breathing before replying"
            />
          </label>
        )}
        {fin && (
          <div className="anim-pop">
            <p className="text-xl font-bold">Your chain</p>
            <ol className="mt-3 space-y-0">
              {(
                [
                  ...[...vuln, vulnOther]
                    .filter(Boolean)
                    .slice(0, 1)
                    .map(() => ({
                      k: "Vulnerable",
                      v: [...vuln, vulnOther].filter(Boolean).join(", "),
                    })),
                  { k: "Trigger", v: trigger },
                  ...filled.map((l) => ({
                    k: l.type,
                    v: l.text,
                    skill: skills[links.indexOf(l)],
                  })),
                  { k: "Behavior", v: behavior },
                  {
                    k: "After",
                    v: [shortC, longC].filter(Boolean).join(" · "),
                  },
                ] as { k: string; v: string; skill?: string }[]
              )
                .filter((x) => x.v)
                .map((x, i, arr) => (
                  <li key={i} className="relative pl-8">
                    <span
                      className="absolute left-2 top-2 h-3 w-3 rounded-full"
                      style={{ background: th.stops[3] }}
                    />
                    {i < arr.length - 1 && (
                      <span className="absolute left-[13px] top-5 h-full w-0.5 bg-white/30" />
                    )}
                    <div className="pb-3">
                      <p className="text-xs font-extrabold uppercase tracking-[0.12em] opacity-80">
                        {x.k}
                      </p>
                      <p className="font-semibold">{x.v}</p>
                      {x.skill && (
                        <p className="mt-1 inline-block rounded-full bg-sun px-2.5 py-0.5 text-xs font-extrabold text-oxford">
                          Break it with: {x.skill}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
            </ol>
            {plan && (
              <p
                className="mt-2 rounded-xl p-3 font-bold"
                style={{ background: th.stops[3], color: th.stops[0] }}
              >
                Next time: {plan}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(summary);
                    setCopied(true);
                  } catch {}
                }}
                className="rounded-xl bg-sun px-4 py-2.5 font-extrabold text-oxford"
              >
                {copied ? "Copied ✓" : "Copy my chain"}
              </button>
              <Link
                href="/chat"
                onClick={() => {
                  try {
                    sessionStorage.setItem(
                      "playchirp.prefill",
                      `I did a chain analysis and want to talk it through:\n${summary}`.slice(
                        0,
                        500,
                      ),
                    );
                  } catch {}
                }}
                className="rounded-xl border-2 border-white/70 px-4 py-2.5 font-extrabold"
              >
                Talk it through with Chirp
              </Link>
              <button
                onClick={() => setStep(0)}
                className="rounded-xl px-3 py-2.5 text-sm font-bold underline"
              >
                Edit
              </button>
            </div>
            {Object.values(skills).filter(Boolean).length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-extrabold">
                  Practice your chain-breakers now
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {links.map((l, i) => {
                    const name = skills[i];
                    const href = name
                      ? BREAKERS[l.type].find(([n]) => n === name)?.[1]
                      : undefined;
                    return href ? (
                      <Link
                        key={i}
                        href={href}
                        className="rounded-full bg-white px-3 py-1.5 text-sm font-bold"
                        style={{ color: th.stops[0] }}
                      >
                        {name} ›
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {!fin && (
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="min-h-12 rounded-xl border-2 border-white/60 px-5 font-extrabold disabled:opacity-40"
          >
            Back
          </button>
          <button
            onClick={next}
            className="min-h-12 flex-1 rounded-xl bg-sun px-5 font-extrabold text-oxford"
          >
            {step === STEPS.length - 1 ? "See my chain" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
