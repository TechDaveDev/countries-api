'use client';

import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

export default function Footer() {

  return (
    <footer className="w-full bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-6 px-4 md:px-8 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

        <div className="flex order-2 md:order-1">
          <p>Hecho con Next.js, Tailwind y <span><a href='https://restcountries.com/' target='_blank' className='underline'>REST countries</a></span></p>
        </div>

        <div className="order-1 md:order-2">
          <a href="https://github.com/TechDaveDev" target="_blank" className="group flex items-center justify-center w-10 h-10 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:scale-110">
            <Github className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </a>
        </div>

        <div className="order-3">
          <a href="https://davidaliaga.vercel.app/" target="_blank" className="flex items-center gap-2 group">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Hecho por <span className="font-semibold text-slate-900 dark:text-white">David Aliaga</span>
            </span>
          </a>
        </div>

      </div>
    </footer>
  );
}