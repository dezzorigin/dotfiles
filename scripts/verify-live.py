#!/usr/bin/env python3
"""Verifikasi live landing dotfiles di Cloudflare Pages.

Usage: python3 scripts/verify-live.py https://dotfiles.pages.dev

Cek: root 200 + marker landing + semua tag og:/twitter: ada +
og-image.png 200 dengan content-type image/* (bukan text/html — fallback
Pages menipu). Memakai User-Agent browser: UA default Python kena 403
Cloudflare (pelajaran repo #40).
"""
import sys
import urllib.request
import urllib.error

UA = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    )
}

MARKER = "Satu meja kerja,"
OG_TAGS = [
    "og:title", "og:description", "og:type", "og:url", "og:image",
    "twitter:card", "twitter:title", "twitter:description", "twitter:image",
]


def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.build_opener().open(req, timeout=30) as r:
        return r.status, r.headers.get("Content-Type", ""), r.read()


def main():
    base = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "https://dotfiles.pages.dev"
    failures = []

    try:
        status, ctype, body = fetch(base + "/")
    except urllib.error.HTTPError as e:
        print(f"FAIL: root {base}/ -> HTTP {e.code}")
        return 1
    html = body.decode("utf-8", "replace")
    print(f"root: HTTP {status}, content-type {ctype}, {len(body)} byte")
    if status != 200:
        failures.append(f"root HTTP {status}")
    if MARKER not in html:
        failures.append(f"marker landing '{MARKER}' tidak ada")
    for tag in OG_TAGS:
        if tag not in html:
            failures.append(f"tag {tag} tidak ada")
    if "og-image.png" not in html:
        failures.append("og-image.png tidak dirujuk di HTML")

    try:
        status, ctype, body = fetch(base + "/og-image.png")
    except urllib.error.HTTPError as e:
        print(f"FAIL: og-image.png -> HTTP {e.code}")
        return 1
    print(f"og-image.png: HTTP {status}, content-type {ctype}, {len(body)} byte")
    if status != 200:
        failures.append(f"og-image.png HTTP {status}")
    if not ctype.startswith("image/"):
        failures.append(f"og-image.png content-type bukan image/*: {ctype}")
    if len(body) < 10_000:
        failures.append(f"og-image.png terlalu kecil: {len(body)} byte (<10KB)")

    if failures:
        print(f"verify-live: {len(failures)} kegagalan:")
        for f in failures:
            print(f"  - {f}")
        return 1
    print("verify-live: OK (live 200, marker, og tags, og-image image/*)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
