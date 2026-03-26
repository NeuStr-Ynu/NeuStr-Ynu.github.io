(function () {
  function getPreferredTheme() {
    var saved = localStorage.getItem("theme-preference");
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    var button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    var isDark = theme === "dark";
    button.setAttribute("aria-label", isDark ? "切换到浅色模式" : "切换到深色模式");
    button.setAttribute("title", isDark ? "切换到浅色模式" : "切换到深色模式");
    button.textContent = isDark ? "浅色" : "深色";
  }

  function ensureButton() {
    if (document.querySelector("[data-theme-toggle]")) return;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.setAttribute("data-theme-toggle", "");
    document.body.appendChild(button);
    button.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || getPreferredTheme();
      var next = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme-preference", next);
      applyTheme(next);
    });
    applyTheme(document.documentElement.getAttribute("data-theme") || getPreferredTheme());
  }

  document.documentElement.setAttribute("data-theme", getPreferredTheme());
  document.documentElement.style.colorScheme = document.documentElement.getAttribute("data-theme");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureButton);
  } else {
    ensureButton();
  }
})();
