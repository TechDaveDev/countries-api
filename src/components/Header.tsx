'use client';

import { Menu } from 'lucide-react';

import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  currentCountryName?: string;
}

export default function Header({ onOpenMobileMenu, currentCountryName }: HeaderProps) {

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between p-4 md:p-6 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 lg:border-none">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg text-center truncate max-w-[150px]">
            {currentCountryName || '500?'}
          </h1>
        </div>
      </div>

      <ThemeSwitcher />
    </header>
  );
}