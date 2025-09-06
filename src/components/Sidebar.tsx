'use client';

import { Country } from '@/lib/types';
import Image from 'next/image';
import { SearchIcon, XIcon } from './Icons';

interface SidebarProps {
  countries: Country[];
  onSelectCountry: (country: Country) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  countries,
  onSelectCountry,
  searchTerm,
  setSearchTerm,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-slate-800/95 backdrop-blur-sm z-40
                   transform transition-transform duration-300 ease-in-out md:translate-x-0
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Países</h2>
            <button onClick={onClose} className="md:hidden p-1 text-slate-400 hover:text-white">
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Buscar país..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>

          <ul className="flex-1 overflow-y-auto custom-scrollbar pr-1">
            {countries.map((country) => (
              <li key={country.cca3}>
                <button
                  onClick={() => onSelectCountry(country)}
                  className="w-full text-left p-2.5 flex items-center gap-3 rounded-md hover:bg-sky-500/20 transition-colors duration-200"
                >
                  <div className="relative w-8 h-6 rounded-sm overflow-hidden shadow-md">
                    <Image
                      src={country.flags.svg}
                      alt={`Bandera de ${country.name.common}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span className="font-medium">{country.name.common}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
