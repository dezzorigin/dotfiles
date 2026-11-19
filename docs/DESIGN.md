# DESIGN.md — Kontrak arah desain landing dotfiles

Ditulis SEBELUM coding, sesuai `~/workspace/github-actions/ui-anti-slop.md` §4.
Landing di root repo (`index.html` + `styles.css` + `app.js`) adalah **etalase**:
katalog konfigurasi + cara install. Produknya tetap dotfiles-nya — landing tidak
menggantikan repo, dan tidak menampilkan data yang bukan isi repo.

## Referensi (tour dulu, baru bangun)

Kandidat yang ditinjau (19 Nov 2026):
1. **Dots — Mac notch workspace landing page** (kage.design/designs/dots-landing-page)
   — PEMENANG. Halaman nyaris monokrom, headline dua baris diakhiri titik,
   eyebrow mono uppercase ber-spasi, hairline memisahkan tiap baris fitur,
   mockup produk dengan callout bernomor. Rasa "meja kerja" yang rapi.
2. PaneFlow — Websites Portfolio 3D (paneflow.com/templates/websites-portfolio)
   — mockup perangkat 3D bergantian; terlalu teatrikal untuk katalog config.
3. TheGogy/dotfiles (github.com/TheGogy/dotfiles) — README dotfiles Hyprland
   biasa: daftar isi + instalasi + showcase; strukturnya dipakai sebagai
   pembanding isi, bukan rasa.

Yang di-clone dari pemenang: struktur editorial satu kolom, headline besar dua
baris, hairline antar-baris fitur, mockup sebagai pusat visual. Yang diubah:
bukan Mac notch — mockup-nya desktop Hyprland (bar Caelestia + launcher +
jendela terminal) yang dibangun murni CSS; bukan monokrom penuh — satu aksen
teal Caelestia + satu aksen kuning keycap; copy-nya katalog dotfiles, bukan
produk SaaS.

## Palet (6 warna bernama, tiap warna punya tugas)

| Nama | Hex | Peran |
|---|---|---|
| Meja | `#F4F5F1` | Latar halaman — kertas meja kerja, dingin kehijauan |
| Tinta | `#1A1E22` | Teks utama + permukaan mockup desktop |
| Abu | `#5B6570` | Teks sekunder, keterangan, label kecil |
| Teal Caelestia | `#0E7C7B` | Satu-satunya aksen aksi: link, CTA, garis aktif |
| Kuning Tombol | `#B45309` | Aksen kedua: keycap keyboard, penanda nomor callout |
| Garis | `#DFE2DC` | Hairline pemisah baris, bingkai kartu |

Bukan gradient (P0), bukan satu hue doang, bukan krim + terracotta,
bukan near-black + lime, bukan dark blue/slate.

## Tipografi (≤2 keluarga)

- **Space Grotesk** — display/headline. Geometris, terasa seperti alat
  bengkel, bukan seperti template SaaS.
- **IBM Plex Mono** — data, keycap, potongan terminal, label kecil.
  Angka memakai tabular-nums.

Beda dari repo sebelumnya (#44 dezz-osint: Archivo + JetBrains Mono).

## Layout (satu kalimat + satu detail khas)

Satu kolom editorial: hero teks kiri di atas, lalu mockup desktop CSS penuh
lebar, lalu katalog konfigurasi sebagai baris-baris bergantian yang dipisah
hairline, lalu cara install tiga langkah, lalu keybind sebagai deret keycap.

Detail khas: **keycap keyboard** — setiap keybind dirender sebagai tombol
fisik (Super, T, W, C, S) — dan **mockup desktop CSS**: bar atas Caelestia,
launcher, dan jendela terminal berisi fastfetch, semuanya digambar dengan
HTML+CSS, bukan gambar.

## Beda dari #44 (minimal 3 dari 5 sumbu — ini beda di 5/5)

| Sumbu | #44 dezz-osint | #48 dotfiles |
|---|---|---|
| Palet | Kertas hangat `#EFE9DD` + sinyal merah | Meja dingin `#F4F5F1` + teal + kuning tombol |
| Tipografi | Archivo + JetBrains Mono | Space Grotesk + IBM Plex Mono |
| Layout | Dua kolom asimetris dossier | Satu kolom editorial + mockup penuh lebar |
| Radius/spacing | Radius 10px lembut | Radius 4px tajam, hairline 1px |
| Detail khas | Benang merah + cap verdict | Keycap keyboard + mockup desktop CSS |

## Larangan yang dijaga

P0: tanpa gradient, tanpa headline gradient, tanpa Inter/Roboto, tanpa hero
tengah + 3 kartu identik, tanpa emoji sebagai ikon fungsi (ikon = SVG stroke),
tanpa statistik vanity (angka yang tampil — 192 file, 127 file Ax-Shell,
50 file Caelestia — dihitung dari `git ls-files`, bukan karangan), tanpa
`rounded-2xl shadow-lg` di semua permukaan, tanpa footer 4 kolom, tanpa copy
generik ("Elevate your workflow" dkk).

Orde-kedua: tanpa krim + terracotta, tanpa lime, tanpa label mono all-caps di
mana-mana (satu kicker saja), tanpa hiasan 01/02/03, tanpa palet satu hue.

## Gate 7 sumbu (target ≥4/5 tiap sumbu, dinilai sebelum merge)

1. anti-slop purity — nol P0 + nol orde-kedua (dicek `scripts/check-static.mjs`)
2. UX speed & 1-to-3 — 1 aksi utama per viewport (Lihat cara install), maks 3 sekunder
3. tipografi — ≤2 font, tabular-nums, body ≤75ch
4. spacing & geometri — grid 8pt, radius dalam = radius luar − padding, padding kartu ≥16px
5. motion — <200ms ease-out, aksi 100x/hari = 0ms, active scale 0.97
6. a11y — focus ring, aria-label tombol ikon, tag semantik
7. mobile — stack vertikal rapi di 390px, tanpa scroll horizontal

## Tes siluet

Kecilkan landing ke thumbnail hitam-putih: yang ketahuan harus "meja kerja
Linux dengan bar atas + jendela terminal + deret tombol keyboard" — bukan
halaman produk generik. Kalau bisa jadi halaman produk lain mana pun, revisi.
