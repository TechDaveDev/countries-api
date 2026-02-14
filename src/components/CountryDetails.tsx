'use client';

import { Users, Globe, Languages, Banknote, MapPin, ExternalLink } from 'lucide-react';

import { Country } from '@/lib/types';

interface CountryDetailsProps {
  country: Country | null;
  allCountries: Country[];
  onSelectBorder: (code: string) => void;
}

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex lg:justify-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
    <div className="flex lg:flex-col justify-center items-center gap-4">
      <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-indigo-500">
        {icon}
      </div>
      <div className='flex flex-col lg:items-center mb-auto'>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
        <p className="text-lg text-center font-bold text-slate-900 dark:text-white mt-0.5">{value}</p>
      </div>
    </div>
  </div>
);

export default function CountryDetails({ country, allCountries, onSelectBorder }: CountryDetailsProps) {
  if (!country) return null;

  const borders = country.borders?.map(code => allCountries.find(c => c.cca3 === code)).filter(Boolean) as Country[];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-10">
        <img
          src={country.flags.svg}
          alt={country.flags.alt}
          className="w-full max-h-[40rem] object-fill rounded-[1rem] shadow-2xl border border-slate-200 dark:border-slate-700"
        />
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            {country.region}
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">{country.name.common}</h2>
          <p className="text-lg text-slate-500 italic">{country.name.official}</p>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 w-fit">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-medium">{country.capital?.[0] || 'Sin capital'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
        <StatCard icon={<Users />} label="Población" value={country.population.toLocaleString()} />
        <StatCard icon={<Globe />} label="Subregión" value={country.subregion || 'N/A'} />
        <StatCard icon={<Languages />} label="Idiomas" value={Object.values(country.languages || {}).slice(0, 2).join(', ')} />
        <StatCard icon={<Banknote />} label="Moneda" value={Object.values(country.currencies || {})[0]?.name || 'N/A'} />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-indigo-500" /> Países Fronterizos
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {borders?.length > 0 ?
            (
              borders.map(border => (
                <button
                  key={border.cca3}
                  onClick={() => onSelectBorder(border.cca3)}
                  className="flex flex-col items-center gap-2 max-h-40 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <div className="w-full rounded-xl my-auto overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
                    <img
                      src={border.flags.svg}
                      alt=""
                      className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-center uppercase tracking-tighter truncate w-full">{border.name.common}</span>
                </button>
              ))
            ) : (
              <p className="text-slate-500 text-sm">Sin fronteras terrestres.</p>
            )}
        </div>
      </div>
    </div>
  );
}