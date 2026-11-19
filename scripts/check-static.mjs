// Gate P0 anti-slop + kelengkapan tag OG/Twitter untuk landing dotfiles.
// Dijalankan CI (npm run validate) — gagal = PR tidak merge.
// Aturan dari ~/workspace/github-actions/ui-anti-slop.md §2-3.
// Kontrak desain: docs/DESIGN.md (Meja #F4F5F1, Tinta, Teal Caelestia,
// Space Grotesk + IBM Plex Mono, radius 4px, keycap + mockup desktop CSS).
import { readFileSync, existsSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const js = readFileSync("app.js", "utf8");
const failures = [];

function check(cond, msg) {
  if (!cond) failures.push(msg);
}

// ── P0: gradient ──────────────────────────────────────────────────────────
check(!/linear-gradient|radial-gradient|conic-gradient/i.test(css + html),
  "P0: gradient terlarang di hero/background");
check(!/bg-clip-text|background-clip:\s*text/i.test(css + html),
  "P0: teks headline gradient terlarang");
// ── P0: font Inter / Roboto / system font untuk semuanya ──────────────────
check(!/\bInter\b/i.test(css), "P0: font Inter terlarang");
check(!/\bRoboto\b/i.test(css), "P0: font Roboto terlarang");
check(/Space Grotesk/.test(css) && /IBM Plex Mono/.test(css),
  "font harus Space Grotesk (display) + IBM Plex Mono (data/keycap)");
// ── P0: emoji mentah sebagai ikon fungsi ──────────────────────────────────
const emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
check(!emojiRe.test(html), "P0: emoji mentah sebagai ikon terlarang");
// ── P0: copy generik ──────────────────────────────────────────────────────
for (const phrase of ["Elevate your workflow", "Unlock the power", "Supercharge"]) {
  check(!html.toLowerCase().includes(phrase.toLowerCase()),
    `P0: copy generik terlarang: "${phrase}"`);
}
// ── P0: rounded-2xl shadow-lg di semua permukaan ──────────────────────────
check(!/rounded-2xl/.test(html) && !/border-radius:\s*(1rem|16px)/.test(css),
  "P0: rounded-2xl di semua permukaan terlarang");
// ── P0: statistik vanity tanpa sumber ─────────────────────────────────────
for (const phrase of ["99.9% uptime", "10x faster", "50k+ users", "10x lebih cepat"]) {
  check(!html.includes(phrase), `P0: statistik vanity tanpa sumber: "${phrase}"`);
}

// ── Orde-kedua ────────────────────────────────────────────────────────────
check(!/#39d353|#4af626|lime/i.test(css), "orde-kedua: lime fosfor terlarang");
check(!/terracotta|#e2725b/i.test(css + html), "orde-kedua: terracotta terlarang");
check(!/#171310|#0B2540|dark blue/i.test(css + html), "orde-kedua: panggung gelap / dark blue repo lain terlarang");
check(!/#EFE9DD/i.test(css + html), "orde-kedua: kertas hangat #44 terlarang — palet harus beda");
check(!/Archivo|JetBrains Mono/i.test(css), "tipografi harus beda dari #44 (Archivo/JetBrains Mono terlarang di sini)");
// label mono all-caps di mana-mana: kicker boleh satu, selebihnya tidak
const allCapsLabels = (html.match(/class="kicker"/g) || []).length;
check(allCapsLabels <= 1, "orde-kedua: label mono all-caps di mana-mana");
// radius: kontrak 4px tajam, bukan 10px lembut repo #44
check(/--radius: 4px/.test(css), "radius harus 4px tajam sesuai DESIGN.md");

// ── Tag OG + Twitter wajib lengkap ────────────────────────────────────────
const ogRequired = [
  ["og:title", /<meta property="og:title" content="[^"]+"/],
  ["og:description", /<meta property="og:description" content="[^"]+"/],
  ["og:type", /<meta property="og:type" content="website"/],
  ["og:url", /<meta property="og:url" content="https:\/\/dezz-dotfiles\.pages\.dev\/"/],
  ["og:image", /<meta property="og:image" content="https:\/\/dezz-dotfiles\.pages\.dev\/og-image\.png"/],
  ["twitter:card", /<meta name="twitter:card" content="summary_large_image"/],
  ["twitter:title", /<meta name="twitter:title" content="[^"]+"/],
  ["twitter:description", /<meta name="twitter:description" content="[^"]+"/],
  ["twitter:image", /<meta name="twitter:image" content="https:\/\/dezz-dotfiles\.pages\.dev\/og-image\.png"/],
];
for (const [name, re] of ogRequired) {
  check(re.test(html), `tag ${name} tidak ada / tidak absolut ke dezz-dotfiles.pages.dev`);
}
check(existsSync("og-image.png"), "og-image.png tidak ada di root");
check(existsSync("favicon.svg"), "favicon.svg tidak ada di root");

// ── Kejujuran isi ─────────────────────────────────────────────────────────
check(/etalase/i.test(html), "landing harus jujur: ini etalase dotfiles, bukan pengganti repo");
check(/192 file/.test(html), "angka nyata repo (192 file) harus ada di landing");
check(/127/.test(html) && /50/.test(html),
  "angka nyata repo (127 file Ax-Shell, 50 file Caelestia) harus ada di landing");
check(/cherry-pick/i.test(html),
  "peringatan cherry-pick (dotfiles itu personal) harus ada di landing");
check(/keycap|tombol/i.test(html), "detail khas keycap keyboard harus ada di landing");

// ── Marker landing + logika ───────────────────────────────────────────────
check(html.includes("Satu meja kerja,") && html.includes("semua tombol di tempatnya."),
  "marker 'Satu meja kerja, semua tombol di tempatnya.' tidak ada");
check(/class="catalog"/.test(html), "katalog konfigurasi tidak ada");
check(/class="keybinds"/.test(html), "deret keybind tidak ada");
check(/class="desktop-mock"/.test(html), "mockup desktop CSS tidak ada");
check(/dataset\.tab/.test(js), "logika tab install hilang di app.js");
check(/prefers-reduced-motion/.test(css), "prefers-reduced-motion harus dihormati di CSS");

if (failures.length) {
  console.error(`check-static: ${failures.length} kegagalan:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("check-static: OK (P0 + orde-kedua + OG/Twitter + kejujuran isi)");
