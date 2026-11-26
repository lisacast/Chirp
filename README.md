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
Without a key the app runs, and chat shows a "not connected" message (crisis help still works). For local chat testing, serve `out/` with `php -S` and put `playchirp-config.php` one folder above it.

## Deploy to SiteGround
The app is a static export (`next build` writes `out/`) plus one PHP file, `api/chat.php`, that calls Claude.

Build the upload package (needs Node, PHP 8.1+ and Composer):
```
npm install
npm run build:siteground
```
This creates `siteground/playchirp-siteground.zip` and a `siteground/playchirp-config.php` template.

On SiteGround (Site Tools):
1. Back up the current WordPress site (Security > Backups).
2. In File Manager, empty `public_html` (or move the WordPress files to a folder outside it).
3. Upload `playchirp-siteground.zip` to `public_html` and extract it.
4. Upload `playchirp-config.php` to the folder **above** `public_html`, and paste in your Anthropic API key.
5. Make sure the site's PHP version is 8.1 or newer (Devs > PHP Manager).

The API key never sits inside `public_html`. `api/.htaccess` lets only `chat.php` be reached in that folder.
