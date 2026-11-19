# PRD — dotfiles (Commander's Dotfiles)

Versi 1.0 — 19 Nov 2026. Repo #48 program P1.

## 1. Produk

Dotfiles pribadi Nabil untuk mesin EndeavourOS (Arch Linux) di Lenovo
ThinkPad T490s (32 GB RAM, hostname `supercomputer`). Arsitektur symlink
terpusat: repo ini adalah sumber kebenaran, file-nya di-symlink ke
`~/.config` dan `~/.local/share`, sehingga sistem dasar tetap bersih dan
mudah diskalakan. Sesi Wayland diatur UWSM (Universal Wayland Session
Manager), bukan oleh compositor itu sendiri.

Filosofi (dari README): *"Perfection is achieved, not when there is nothing
more to add, but when there is nothing left to take away."* — Saint-Exupéry.
Ultra-minimalis, keyboard-driven.

## 2. Pengguna

- Pemilik: Nabil, di ThinkPad T490s.
- Pengguna lain: siapa pun yang memakai EndeavourOS/Arch + Hyprland dan mau
  meniru sebagian setup ini (cherry-pick, bukan salin mentah — lihat
  `docs/INSTALL.md`).

## 3. Isi repo (angka dihitung dari `git ls-files`, 19 Nov 2026)

| Kategori | Isi | File |
|---|---|---|
| Mesin utama | Caelestia — Hyprland (19 file), fish, foot, starship, btop, fastfetch, uwsm | 50 |
| Bar & shell UI | Ax-Shell — 36 modul, 24 stylesheet, 10 script, 5 service, 12 util | 127 |
| Audio visual | cava (9 file: config + 6 shader + 2 tema) | 9 |
| Warna dinamis | matugen + tema Spicetify Caelestia | 3 |
| Launcher | fuzzel | 1 |
| Lainnya | README, gambar desktop | 2 |
| **Total** | | **192** |

Bahasa di repo: 66 Python, 8 shell, 5 fish, 27 CSS, 29 file conf/ini/toml.

## 4. Ruang lingkup PR ini (proper P1)

Masuk:
- `.gitignore` ketat (KRUSIAL — repo sebelumnya tanpa `.gitignore`).
- LICENSE MIT di root (sebelumnya hanya LICENSE upstream Ax-Shell di dalam
  `.config/Ax-Shell/`).
- Audit path + gitleaks riwayat penuh; 2 temuan = false positive keybinding
  VS Code, ditutup dengan allowlist sempit di `.gitleaks.toml`.
- CI: shellcheck + `bash -n` + `fish --no-execute` + `py_compile` +
  validasi JSON/TOML + gitleaks + advisory-sweep OSV + validasi landing
  (html-validate + gate P0) + Playwright e2e + smoke.
- Docs: PRD ini, arsitektur + diagram, install, testing, deploy, DESIGN.md.
- Landing statis di root sebagai etalase (katalog + cara install), deploy
  Cloudflare Pages. Staging deploy hanya berisi file landing, bukan seluruh
  repo — file config pribadi tidak ikut publik.

Tidak masuk:
- Mengubah satu pun konfigurasi yang ada (keybind, tema, modul Ax-Shell).
- Menjalankan install script di mesin mana pun sebagai bagian PR ini.
- Screenshot desktop baru & video demo — follow-up (butuh browser live /
  mesin EndeavourOS; lihat `docs/TESTING.md`).

## 5. Persyaratan fungsional

1. Instalasi Caelestia via `install.fish` (opsi `--spotify --vscode
   --discord --zen --aur-helper`) tetap seperti yang didokumentasikan
   upstream Caelestia di `.local/share/caelestia/README.md`.
2. Instalasi Ax-Shell via `install.sh` tetap seperti upstream Axenide.
3. Semua script shell lolos shellcheck; semua Python lolos `py_compile`;
   semua JSON/TOML valid.
4. Landing menampilkan angka repo yang benar dan jujur menyebut dirinya
   etalase, bukan pengganti repo.
5. Gitleaks hijau (riwayat penuh, fetch-depth 0).

## 6. Persyaratan non-fungsional

- Keamanan: tidak ada kredensial di repo (terverifikasi audit + gitleaks);
  `.gitignore` menutup pola sensitif umum.
- Keterbacaan: README standar P1 — penjelasan setup, isi per kategori,
  cara install + prasyarat, keybind, screenshot.
- Landing: lolos gate 7 sumbu (lihat `docs/DESIGN.md`), mobile 390px tanpa
  scroll horizontal, `prefers-reduced-motion` dihormati.

## 7. Risiko & keputusan

- Dotfiles itu personal: README dan landing sama-sama memperingatkan untuk
  cherry-pick, bukan salin mentah.
- `install.fish` membuat symlink — repo tidak boleh dipindah setelah
  install (peringatan upstream, dipertahankan di `docs/INSTALL.md`).
- File `.config/matugen/config.toml.bak` ikut terlacak di repo; dibiarkan
  apa adanya (bukan bagian PR ini untuk menghapus riwayat).
