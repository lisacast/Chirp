// Builds siteground/playchirp-siteground.zip from the static export in /out,
// adding the PHP chat backend's dependencies (Composer vendor folder).
// Usage: npm run build:siteground   (needs php + composer on this machine)
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const run = (cmd, cwd = ".") => execSync(cmd, { stdio: "inherit", cwd });

if (!existsSync("out/index.html")) throw new Error("Run `next build` first: out/ is missing.");
if (!existsSync("out/api/chirp-config.json")) throw new Error("out/api/chirp-config.json missing.");

run("composer install --no-dev --optimize-autoloader --no-interaction", "php");
rmSync("out/api/vendor", { recursive: true, force: true });
// Copy only what PHP needs at runtime: skip tests, docs, examples and dot-folders.
const SKIP = /\/(tests?|docs?|examples?|scripts|\.[^/]+)(\/|$)/;
cpSync("php/vendor", "out/api/vendor", {
  recursive: true,
  filter: (src) => !SKIP.test(src.slice("php/vendor".length)),
});
rmSync("out/api/playchirp-config.example.php", { force: true });

// Serve the chat settings as PHP, not JSON, so the web server never hands them out as a file.
const cfg = readFileSync("out/api/chirp-config.json");
JSON.parse(cfg.toString());
writeFileSync(
  "out/api/chirp-config.php",
  `<?php\nreturn json_decode(base64_decode('${cfg.toString("base64")}'), true);\n`,
);
rmSync("out/api/chirp-config.json");

mkdirSync("siteground", { recursive: true });
rmSync("siteground/playchirp-siteground.zip", { force: true });
run("zip -qr ../siteground/playchirp-siteground.zip .", "out");
cpSync("public/api/playchirp-config.example.php", "siteground/playchirp-config.php");
console.log("\nCreated siteground/playchirp-siteground.zip and siteground/playchirp-config.php");
