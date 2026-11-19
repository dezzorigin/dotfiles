import { test, expect } from "@playwright/test";

// Landing dotfiles adalah etalase: katalog konfigurasi + cara install.
// Yang diuji: konten + interaksi (tab install, keybind, mockup desktop).

test("landing tampil: judul, mockup desktop, katalog, keybind", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/dotfiles/i);
  await expect(page.locator("text=Satu meja kerja,").first()).toBeVisible();
  await expect(page.locator(".desktop-mock").first()).toBeVisible();
  await expect(page.locator("text=Katalog konfigurasi").first()).toBeVisible();
  await expect(page.locator(".catalog .row")).toHaveCount(6);
  await expect(page.locator("text=192 file").first()).toBeVisible();
  await expect(page.locator("text=127").first()).toBeVisible();
  // kejujuran isi: ini etalase, bukan pengganti repo
  await expect(page.locator("text=etalase").first()).toBeVisible();
  await expect(page.locator("text=cherry-pick").first()).toBeVisible();
  // keybind sebagai keycap
  await expect(page.locator(".keybinds kbd").first()).toBeVisible();
});

test("tab install berganti langkah", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#step-caelestia")).toBeVisible();
  await expect(page.locator("#step-caelestia")).toContainText("install.fish");
  await page.getByRole("tab", { name: "Ax-Shell" }).click();
  await expect(page.locator("#step-axshell")).toBeVisible();
  await expect(page.locator("#step-axshell")).toContainText("install.sh");
  await expect(page.locator("#step-caelestia")).toBeHidden();
  await page.getByRole("tab", { name: "Cara cepat" }).click();
  await expect(page.locator("#step-cepat")).toBeVisible();
  await expect(page.locator("#step-cepat")).toContainText("cp -r");
});

test("mobile 390px: tanpa scroll horizontal", async ({ page }) => {
  await page.goto("/");
  // Tunggu webfont selesai supaya pengukuran lebar deterministik — tanpa
  // ini, overflow bergantung pada balapan load font (flaky).
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await expect(page.locator("h1").first()).toBeVisible();
  await expect(page.locator(".desktop-mock").first()).toBeVisible();
});
