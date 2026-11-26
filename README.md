# PlayChirp

A mobile-first web app where people 13+ practice DBT skills with Chirp, a friendly AI guide powered by Claude.

## Features (v1)
- Welcome with 13+ confirmation and terms, optional nickname
- Mood check-in
- Lobby (from the PlayChirp mockups)
- Chat with Chirp: suggests skills as flip flashcards (← Chat / Next →), quick replies
- Skills library: 26 skills across the four DBT modules
- Mindful exercises: 2-Minute Distraction, 3-Minute Grounding, 5-Minute Wise Mind (guided timers)
- Joy finder from the Joyous Activities list
- FAQ, terms and medical disclaimer, Get Help page, quick exit
- Installable on phones (web app manifest)

## Crisis safety layer
Every message is checked by a keyword layer (`src/lib/crisis.ts`, trigger words from the spec) before it reaches the AI, and Claude also rates risk on each reply. The higher of the two wins. Urgent risk always shows 988 (call/text), Crisis Text Line (text HOME to 741741) and 911, even if the AI is down.

## Privacy
No accounts in v1. Chat lives in the browser tab (sessionStorage); mood and practiced skills live on the device (localStorage).

## Run locally
```
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev
```
Without a key the app runs, and chat shows a "not connected" message (crisis help still works).

## Deploy
Vercel or Cloudflare Pages. Set `ANTHROPIC_API_KEY` in the project's environment variables.
