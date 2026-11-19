# ARCHITECTURE — dotfiles

## 1. Gambaran

Repo ini bukan aplikasi — ini sumber kebenaran konfigurasi satu mesin.
Pola intinya: **symlink terpusat**. File tinggal di repo; yang dipakai
sistem adalah symlink dari `~/.config` dan `~/.local/share` ke file repo.
Sistem dasar tetap bersih: tidak ada file config yang di-copy lalu
dilupakan — satu perubahan di repo, satu `git pull`, semua tempat ikut.

Diagram: `docs/diagrams/architecture.html` (HTML + SVG, bukan Mermaid).

## 2. Lapisan

```
pengguna (keyboard — Super + huruf)
  └─ Hyprland (compositor Wayland, .local/share/caelestia/hypr/)
       ├─ UWSM — session manager: yang menyalakan lingkungan
       ├─ Ax-Shell — bar, launcher, dashboard, notifikasi (fabric)
       │    ├─ modul/    — 36 modul (bar, launcher, player, mixer, ...)
       │    ├─ styles/   — 24 stylesheet
       │    ├─ services/ — brightness, mpris, network, ...
       │    └─ scripts/  — screenshot, screenrecord, ocr, pomodoro, ...
       ├─ Caelestia (user configs)
       │    ├─ hypr/     — keybinds, rules, animasi, dekorasi
       │    ├─ fish/     — shell + greeting
       │    ├─ foot/     — terminal
       │    ├─ starship  — prompt
       │    ├─ btop      — monitor sistem
       │    └─ fastfetch — info sistem
       └─ estetika: matugen (warna dari wallpaper) → Hyprland, foot,
          fuzzel; cava (visualizer audio + shader); spicetify (Spotify)
```

## 3. Dua mesin, dua upstream

Repo ini menggabungkan dua proyek upstream yang masing-masing punya
install script sendiri — keduanya dibaca, tidak dijalankan, selama PR ini:

| Proyek | Lokasi di repo | Install script | Upstream |
|---|---|---|---|
| Caelestia | `.local/share/caelestia/` | `install.fish` (311 baris) | caelestia-dots/caelestia |
| Ax-Shell | `.config/Ax-Shell/` | `install.sh` (157 baris) + `uninstall.sh` | Axenide/Ax-Shell |

Catatan penting dari README Caelestia: install script membuat symlink ke
semua config — **repo tidak boleh dipindah/dihapus setelah install**,
kalau tidak Hyprland bisa gagal start.

## 4. Aliran install (ringkas — lengkap di `docs/INSTALL.md`)

1. Clone repo ke `~/.local/share/caelestia` (posisi yang direkomendasikan
   upstream) atau ke mana pun, lalu jalankan `install.fish` dengan opsi
   yang diinginkan (`--spotify`, `--vscode`, `--discord`, `--zen`,
   `--aur-helper=yay|paru`).
2. `install.fish` memasang paket (pacman/AUR) lalu symlink config Caelestia
   ke tempatnya.
3. `install.sh` Ax-Shell memasang paketnya lalu menaruh Ax-Shell di
   `~/.config/Ax-Shell`.
4. Login manager (mis. greetd + tuigreet) dipasang terpisah — dotfiles ini
   tidak menyertakannya.

## 5. File yang dicek CI (tanpa install)

| Jenis | Cek | Alat |
|---|---|---|
| Shell `.sh` | lint + `bash -n` | shellcheck |
| Fish `.fish` | `fish --no-execute` | fish |
| Python `.py` (66 file) | kompilasi sintaks | `python -m py_compile` |
| JSON/JSONC | valid (ketat dulu, fallback strip komentar — 4 file `.json` upstream memang JSONC: VS Code `.vscode/launch.json`, `tsconfig.json`, Zed `keymap.json` + `settings.json`) | `python -m json.tool` |
| TOML | valid | `python -m tomllib` (3.11+) |
| Riwayat git | secret scan | gitleaks (fetch-depth 0) |
| Dependensi | advisory OSV | `scripts/advisory-sweep.py` |
| Landing | HTML valid + gate P0 + tag OG | html-validate + `scripts/check-static.mjs` |
| Landing | e2e desktop + mobile | Playwright (CI saja) |

## 6. Batas yang disadari

- Tidak ada test runtime untuk Hyprland/fish/foot — validasi di CI hanya
  sintaks + lint. Uji jalan sesungguhnya butuh mesin EndeavourOS.
- Ekstensi VS Code `caelestia-vscode-integration` (1.2.0, dari upstream
  soramanew) dibundel sebagai `.vsix`; dependensi produksinya satu:
  `tinycolor2@1.6.0` (ter-pin di `package-lock.json`) — itu yang di-sweep
  OSV.
