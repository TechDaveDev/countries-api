'use client';

import { Search, X, ChevronRight, Globe } from 'lucide-react';

import { Country } from '@/lib/types';

interface SidebarProps {
  countries: Country[];
  selectedCode: string | null;
  onSelectCountry: (code: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  countries,
  selectedCode,
  onSelectCountry,
  searchTerm,
  setSearchTerm,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`fixed inset-y-0 left-0 z-50 w-80 lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-dark dark:text-white" />
              <h1 className="text-xl font-bold">Países</h1>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 custom-scrollbar">
            {countries.map((country) => (
              <button
                key={country.cca3}
                onClick={() => onSelectCountry(country.cca3)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all group
                  ${selectedCode === country.cca3
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}
                `}
              >
                {
                  country.cca3 === 'NPL' ? (
                    <img src={country.flags.svg} alt="" className="w-8 h-5 object-fill rounded shadow-sm" />
                  ) : (
                    <img src={country.flags.svg} alt="" className="w-8 h-5 object-cover rounded shadow-sm" />
                  )
                }
                <span className="text-sm font-semibold truncate flex-1 text-left">{country.name.common}</span>
                <ChevronRight className={`w-4 h-4 ${selectedCode === country.cca3 ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            )
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}