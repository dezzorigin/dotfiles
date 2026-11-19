// Tab install di landing dotfiles — tanpa dependensi.
// Satu aksi utama per viewport; tab adalah satu-satunya interaksi JS.
const tabs = document.querySelectorAll('[data-tab]');

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute("aria-selected", String(selected));
      t.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(t.dataset.tab);
      if (panel) panel.hidden = !selected;
    });
  });

  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const list = [...tabs];
    const i = list.indexOf(tab);
    const next = list[(i + (event.key === "ArrowRight" ? 1 : list.length - 1)) % list.length];
    next.focus();
    next.click();
  });
});
