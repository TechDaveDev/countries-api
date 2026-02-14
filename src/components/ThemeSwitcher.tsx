'use client';

import { useEffect } from 'react'

import { Moon, Sun } from 'lucide-react';

export const ThemeSwitcher = () => {

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
  }, [])

  const handleDarkMode = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  }

  return (
    <button
      onClick={handleDarkMode}
      className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:scale-105 transition-transform shadow-sm"
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5 text-yellow-400 hidden dark:block" />
      <Moon className="w-5 h-5 text-indigo-600 dark:hidden" />
    </button>
  )
}
