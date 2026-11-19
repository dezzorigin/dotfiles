# DEPLOY — dotfiles

Repo ini bukan aplikasi — yang di-deploy hanya **landing statis** di root
repo (`index.html`, `styles.css`, `app.js`, `favicon.svg`, `og-image.png`)
sebagai etalase katalog + cara install.

## Target

Cloudflare Pages. Nama proyek pilihan pertama: `dotfiles`, fallback
`dezz-dotfiles`, lalu `dotfiles-dezz`. (Nama Pages bersifat global — kalau
nama sudah dipakai akun lain, pindah ke fallback berikutnya.)

## Cara deploy

Via `~/workspace/github-actions/cf_pages.py` (API Cloudflare, token dari
vault — jangan minta kredensial di chat):

```bash
# 1. Siapkan staging — HANYA file landing, BUKAN seluruh repo.
#    Pelajaran repo #46: file config pribadi tidak boleh ikut publik.
mkdir -p /tmp/dotfiles-stage
cp index.html styles.css app.js favicon.svg og-image.png /tmp/dotfiles-stage/

# 2. Buat proyek (sekali saja)
python3 ~/workspace/github-actions/cf_pages.py create-project dotfiles

# 3. Deploy
python3 ~/workspace/github-actions/cf_pages.py deploy dotfiles /tmp/dotfiles-stage
```

## Verifikasi live (sebelum merge)

```bash
python3 scripts/verify-live.py https://dotfiles.pages.dev
```

Yang dicek: root 200 + marker landing + semua tag `og:`/`twitter:` ada +
`og-image.png` 200 dengan `content-type: image/*` (bukan `text/html` —
fallback Pages menipu). Cek memakai Python `urllib` dengan User-Agent
browser (UA default Python kena 403 Cloudflare).

## Homepage repo

Setelah live terverifikasi, set About → homepage repo ke URL Pages:

```bash
python3 ~/workspace/github-actions/gh_set_homepage.py dezzorigin/dotfiles https://dotfiles.pages.dev
```
