'use client';

import { useEffect, useMemo, useState } from 'react';
import { Country } from '@/lib/types';
import { getAllCountries } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import CountryDetails from '@/components/CountryDetails';
import { MenuIcon } from '@/components/Icons';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const data = await getAllCountries();
      setCountries(data);
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setSelectedCountry(data[randomIndex]);
      }
      setLoading(false);
    };
    fetchCountries();
  }, []);

  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsSidebarOpen(false);
  };

  const filteredCountries = useMemo(() =>
    countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    ), [countries, searchTerm]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-2xl font-semibold animate-pulse">Cargando países...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex h-screen overflow-hidden">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-slate-800 rounded-full text-white shadow-lg"
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      <Sidebar
        countries={filteredCountries}
        onSelectCountry={handleSelectCountry}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 md:ml-72">
        <CountryDetails country={selectedCountry} allCountries={countries} />
      </div>
    </main>
  );
}
