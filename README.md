<div align="center">
  <h1>Commander's Dotfiles</h1>
  <p><b>Highly customized, ultra-minimalist, and keyboard-driven Linux environment.</b></p>

  [![OS - EndeavourOS](https://img.shields.io/badge/OS-EndeavourOS-1793d1?style=for-the-badge&logo=arch-linux&logoColor=white)](#)
  [![Engine - Caelestia](https://img.shields.io/badge/Engine-Caelestia-00b4b6?style=for-the-badge)](#)
  [![Hardware - ThinkPad T490s](https://img.shields.io/badge/Hardware-ThinkPad_T490s-E2231A?style=for-the-badge&logo=lenovo&logoColor=white)](#)
  [![CI](https://github.com/dezzorigin/dotfiles/actions/workflows/ci.yml/badge.svg)](https://github.com/dezzorigin/dotfiles/actions/workflows/ci.yml)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
</div>

<br>

> *"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."* — Antoine de Saint-Exupéry

**Etalase:** [dotfiles.pages.dev](https://dotfiles.pages.dev) — katalog konfigurasi + cara install. Produknya tetap repo ini.

## Overview

Welcome to my personal Linux workspace. This system is built on a centralized symlink architecture to keep the base system entirely clean and scalable. Unlike traditional monolithic configs, this setup utilizes **UWSM** (Universal Wayland Session Manager) to handle the environment startup independently, resulting in an ultra-lightweight compositor configuration.

## The Setup

![Desktop Preview](assets/dekstop.png)

## System Architecture

| Component | Specification |
|---|---|
| **OS** | EndeavourOS (Arch Linux based) |
| **Kernel** | Linux 6.19.x |
| **Hostname** | `supercomputer` |
| **Hardware** | Lenovo ThinkPad T490s (32GB RAM) |
| **Core Engine** | Caelestia (Managed via UWSM) |
| **Shell** | Fish + Ax-Shell Integration |
| **Aesthetics** | Matugen, Fuzzel, Cava, Spicetify |

## What's inside

192 file terlacak, dalam dua mesin utama plus estetika:

| Kategori | Isi | File |
|---|---|---|
| Caelestia | Hyprland (19 file), fish, foot, starship, btop, fastfetch, uwsm, VS Code, Zed, micro | 50 |
| Ax-Shell | Bar & launcher di atas Fabric — 36 modul, 24 stylesheet, 10 script, 5 service, 12 util | 127 |
| Audio visual | cava (config + 6 shader + 2 tema) | 9 |
| Warna dinamis | matugen + tema Spicetify Caelestia | 3 |
| Launcher | fuzzel | 1 |
| Lainnya | README, gambar desktop | 2 |

Detail arsitektur + diagram: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). PRD: [`docs/PRD.md`](docs/PRD.md). Kontrak desain landing: [`docs/DESIGN.md`](docs/DESIGN.md).

## Installation

> ⚠️ **Warning:** *Dotfiles are highly personal. It is recommended to read through the configurations and cherry-pick what you need rather than blindly copying everything to your machine.*

Prasyarat: EndeavourOS (atau Arch Linux / turunannya), `fish` terpasang, dan login manager sendiri (mis. greetd + tuigreet — tidak disertakan di repo ini). Panduan lengkap: [`docs/INSTALL.md`](docs/INSTALL.md).

```bash
# 1. Clone ke posisi yang direkomendasikan upstream Caelestia.
#    Install script membuat symlink — repo TIDAK BOLEH dipindah setelah install.
git clone https://github.com/dezzorigin/dotfiles.git ~/.local/share/caelestia
cd ~/.local/share/caelestia

# 2. Install Caelestia (mesin utama)
./install.fish --vscode=codium --aur-helper=yay

# 3. Install Ax-Shell (bar & launcher)
bash .config/Ax-Shell/install.sh
```

Cara cepat (hanya meniru sebagian):

```bash
git clone https://github.com/dezzorigin/dotfiles.git
cd dotfiles

# 1. Inject the Core Engine (Caelestia)
cp -r .local/share/* ~/.local/share/

# 2. Inject the Aesthetic Modules
cp -r .config/* ~/.config/
```

Update:

```bash
yay
cd ~/.local/share/caelestia && git pull
```

## Keybinds

| Tombol | Aksi |
|---|---|
| `Super` | Buka launcher |
| `Super` + angka | Pindah ke workspace |
| `Super` `Alt` + angka | Pindah jendela ke workspace |
| `Super` + `T` | Terminal (foot) |
| `Super` + `W` | Browser (Zen) |
| `Super` + `C` | IDE (VSCodium) |
| `Super` + `S` | Toggle special workspace |
| `Ctrl` `Alt` + `Delete` | Menu sesi |
| `Ctrl` `Super` + `Space` | Play/pause media |
| `Ctrl` `Super` `Alt` + `R` | Restart shell |

Daftar lengkap: `.local/share/caelestia/hypr/hyprland/keybinds.conf`.

## Docs

- [`docs/PRD.md`](docs/PRD.md) — produk, ruang lingkup, risiko
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — lapisan + diagram (`docs/diagrams/architecture.html`)
- [`docs/INSTALL.md`](docs/INSTALL.md) — install lengkap + prasyarat
- [`docs/TESTING.md`](docs/TESTING.md) — yang diuji CI + hasil audit keamanan
- [`docs/DEPLOY.md`](docs/DEPLOY.md) — deploy landing ke Cloudflare Pages
- [`docs/DESIGN.md`](docs/DESIGN.md) — kontrak arah desain landing

## Security

Repo ini pernah tanpa `.gitignore` — sekarang ada `.gitignore` ketat (kredensial, kunci, token, cache, hasil build). Audit 19 Nov 2026:

- Audit nama path seluruh tree (192 file) + riwayat (4 commit): nol nama file yang mengindikasikan kredensial.
- Gitleaks 8.28.0 riwayat penuh: 2 temuan, keduanya false positive — shortcut keyboard VS Code (`"key": "ctrl+shift+down"`) yang salah di-flag rule `generic-api-key`. Ditutup allowlist sempit di `.gitleaks.toml` (hanya file itu, hanya rule itu). CI menjalankan gitleaks di setiap push/PR dengan `fetch-depth: 0`.

## CI

`.github/workflows/ci.yml` — shellcheck + `bash -n`, `fish --no-execute`, `py_compile` (66 file Python), validasi JSON/JSONC/TOML, gitleaks, advisory-sweep OSV (1 dependensi produksi: `tinycolor2@1.6.0`), html-validate + gate P0 anti-slop, Playwright e2e (desktop + mobile), smoke.

## License

MIT — lihat [LICENSE](LICENSE). Lisensi upstream Ax-Shell tetap ada di `.config/Ax-Shell/LICENSE`.
