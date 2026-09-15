"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}>
      <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
    </button>
  );
}
