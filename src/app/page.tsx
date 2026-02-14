'use client';

import { useState, useEffect, useMemo } from 'react';

import { Country } from '@/lib/types';
import { getAllCountries } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import CountryDetails from '@/components/CountryDetails';
import Footer from '@/components/Footer';

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCountries().then(data => {
      setCountries(data);
      if (data.length > 0) setSelectedCode('ESP');
      setLoading(false);
    });
  }, []);

  const selectedCountry = useMemo(() =>
    countries.find(c => c.cca3 === selectedCode) || null
    , [countries, selectedCode]);

  const filteredCountries = useMemo(() =>
    countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
    , [countries, search]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        countries={filteredCountries}
        selectedCode={selectedCode}
        onSelectCountry={(code) => { setSelectedCode(code); setIsSidebarOpen(false); }}
        searchTerm={search}
        setSearchTerm={setSearch}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header
          onOpenMobileMenu={() => setIsSidebarOpen(true)}
          currentCountryName={selectedCountry?.name.common}
        />
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950/50">
          <CountryDetails
            country={selectedCountry}
            allCountries={countries}
            onSelectBorder={setSelectedCode}
          />
          <Footer />
        </main>
      </div>
    </div>
  );
}