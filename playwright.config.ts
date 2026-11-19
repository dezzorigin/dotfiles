import { defineConfig, devices } from "@playwright/test";

// Landing dotfiles adalah etalase statis: yang diuji adalah konten +
// interaksi halamannya (tab install, keybind, katalog, mockup desktop).
// Konfigurasi Hyprland/fish-nya sendiri diuji di job CI lain (sintaks +
// lint) — bukan di browser, karena butuh mesin EndeavourOS.
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 0,
  use: { baseURL: "http://127.0.0.1:8480" },
  webServer: {
    command: "python3 -m http.server 8480 --bind 127.0.0.1",
    url: "http://127.0.0.1:8480/",
    reuseExistingServer: true,
    timeout: 15_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
  ],
});
