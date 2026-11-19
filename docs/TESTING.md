# TESTING — dotfiles

## Yang diuji CI (otomatis, di setiap push & PR)

| Job | Yang dicek | Perintah |
|---|---|---|
| `shellcheck` | Semua `.sh` lolos shellcheck + `bash -n` | `shellcheck` |
| `fish-syntax` | Semua `.fish` lolos `fish --no-execute` | `fish` |
| `python-syntax` | 66 file `.py` lolos `py_compile` | `python -m py_compile` |
| `config-syntax` | JSON valid, JSONC valid (komentar di-strip), TOML valid — 4 file `.json` upstream memang JSONC (VS Code `launch.json`, `tsconfig.json`, Zed `keymap.json` + `settings.json`); divalidasi dengan parser lenient setelah gagal ketat | Python stdlib |
| `gitleaks` | Secret scan riwayat penuh (`fetch-depth: 0`) | gitleaks 8.x + `.gitleaks.toml` |
| `advisory-sweep` | 1 dependensi produksi (`tinycolor2@1.6.0`, npm) di OSV | `scripts/advisory-sweep.py` |
| `static-checks` | HTML valid, gate P0 anti-slop, tag OG/Twitter lengkap | html-validate + `scripts/check-static.mjs` |
| `playwright-e2e` | Landing desktop 1280px + mobile 390px | `npm run e2e` |
| `smoke` | File deploy ada & tidak kosong | `test -s` |

Tidak ada `npm audit` sebagai gate (keputusan program P1: audit
melaporkan advisory dev-only sebagai temuan produksi).

## Yang TIDAK bisa diuji di CI

- Menjalankan Hyprland, fish, foot, atau `install.fish` / `install.sh`
  butuh mesin EndeavourOS sungguhan. CI hanya memvalidasi sintaks — ini
  dicatat jujur di sini, bukan diklaim sebagai "teruji jalan".
- Screenshot desktop + video demo: **follow-up** — butuh browser live /
  mesin EndeavourOS. Screenshot lama (`assets/dekstop.png`, nama file
  memang begitu di repo) tetap dipakai README sampai ada retake.

## Uji lokal (sebelum push)

```bash
# Shell + fish + python + config (butuh shellcheck & fish terpasang)
bash -n .config/Ax-Shell/install.sh
shellcheck .config/Ax-Shell/install.sh .config/Ax-Shell/uninstall.sh \
  .config/Ax-Shell/scripts/*.sh
fish --no-execute .local/share/caelestia/install.fish
python3 -m py_compile $(git ls-files '*.py')

# Gitleaks (riwayat penuh)
gitleaks git --no-banner

# Landing (butuh Node; JANGAN npm install di VM sandbox — andalkan CI)
npm install
npm run validate
npm run e2e
```

## Hasil audit keamanan (19 Nov 2026)

- Audit nama path seluruh tree (192 file) + riwayat (4 commit): **nol**
  nama file yang mengindikasikan kredensial (`.env`, `*secret*`, `*token*`,
  `.ssh`, `.aws`, `*.pem`, `*.key`, dsb). Isi file kredensial tidak pernah
  dibuka — audit hanya nama path.
- Gitleaks 8.28.0, riwayat penuh: **2 temuan, keduanya false positive**
  rule `generic-api-key` pada `.local/share/caelestia/vscode/keybindings.json`
  — yang di-flag adalah shortcut keyboard VS Code (nilai properti `key`:
  `ctrl+shift+down` dan `shift+alt+down`). Ditutup allowlist sempit
  di `.gitleaks.toml` (file keybindings + 3 file docs yang mengutipnya
  saat menjelaskan audit; hanya rule itu).
