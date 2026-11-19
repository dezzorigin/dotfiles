# INSTALL — dotfiles

> Peringatan dari README repo: **dotfiles itu sangat personal.** Baca dulu
> konfigurasinya dan ambil (cherry-pick) yang kamu butuhkan — jangan salin
> semuanya mentah-mentah ke mesinmu.

## Prasyarat

- **OS:** EndeavourOS (atau Arch Linux / turunannya). Script install memakai
  `pacman` dan AUR helper (`yay` atau `paru`).
- **Mesin referensi:** Lenovo ThinkPad T490s, 32 GB RAM, hostname
  `supercomputer`, kernel Linux 6.19.x. Bukan keharusan — tapi itu mesin
  yang setup ini diuji.
- **Login manager:** tidak disertakan. Pasang sendiri, mis. `greetd` +
  `tuigreet` (rekomendasi upstream Caelestia), atau login dari TTY.
- **Shell:** `fish` harus sudah terpasang sebelum menjalankan
  `install.fish`.

## Langkah 1 — Clone

Upstream Caelestia merekomendasikan repo di-clone ke
`~/.local/share/caelestia`, karena install script membuat symlink ke semua
config — **repo tidak boleh dipindah atau dihapus setelah install**,
kalau tidak sebagian besar aplikasi tidak jalan dan Hyprland bisa gagal
start total.

```bash
git clone https://github.com/dezzorigin/dotfiles.git ~/.local/share/caelestia
cd ~/.local/share/caelestia
```

## Langkah 2 — Install Caelestia (mesin utama)

```bash
./install.fish --help
```

Opsi yang tersedia:

| Opsi | Artinya |
|---|---|
| `--noconfirm` | Jangan minta konfirmasi saat memasang paket |
| `--spotify` | Pasang Spotify (Spicetify) |
| `--vscode=[codium\|code]` | Pasang VSCodium (atau VS Code) |
| `--discord` | Pasang Discord (OpenAsar + Equicord) |
| `--zen` | Pasang Zen browser |
| `--aur-helper=[yay\|paru]` | AUR helper yang dipakai |

Contoh:

```bash
~/.local/share/caelestia/install.fish --vscode=codium --aur-helper=yay
```

Script ini memasang dependensi (hyprland, xdg-desktop-portal-hyprland,
xdg-desktop-portal-gtk, hyprpicker, wl-clipboard, cliphist, inotify-tools,
app2unit, wireplumber, trash-cli, foot, fish, fastfetch, starship, btop,
jq, eza, adw-gtk-theme, papirus-icon-theme, qtengine-git,
ttf-jetbrains-mono-nerd, … — daftar lengkap di
`.local/share/caelestia/README.md`) lalu symlink config ke tempatnya.

Instalasi manual (tanpa script): salin/symlink folder `hypr`, `foot`,
`fish`, `fastfetch`, `uwsm`, `btop` ke `~/.config`, dan `starship.toml` ke
`~/.config/starship.toml`. Detail Spicetify / VS Code / Zen ada di
`.local/share/caelestia/README.md`.

## Langkah 3 — Install Ax-Shell (bar & launcher)

```bash
bash .config/Ax-Shell/install.sh
```

Script ini memasang paket Ax-Shell (fabric, matugen, cava, hypridle,
hyprlock, playerctl, ddcutil, gpu-screen-recorder, … — daftar lengkap di
`.config/Ax-Shell/install.sh`) dan menaruh Ax-Shell di
`~/.config/Ax-Shell`. Untuk mencopot: `bash .config/Ax-Shell/uninstall.sh`.

## Langkah 4 — Cara cepat ala README lama (tanpa script)

Kalau hanya mau meniru sebagian, cukup salin folder yang dibutuhkan:

```bash
git clone https://github.com/dezzorigin/dotfiles.git
cd dotfiles

# 1. Mesin utama (Caelestia)
cp -r .local/share/* ~/.local/share/

# 2. Modul estetika
cp -r .config/* ~/.config/
```

## Update

```bash
yay            # update paket AUR
cd ~/.local/share/caelestia && git pull
```

## Keybind utama

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
