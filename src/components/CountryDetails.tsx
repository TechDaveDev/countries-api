import { Country } from '@/lib/types';
import Image from 'next/image';

interface CountryDetailsProps {
  country: Country | null;
  allCountries: Country[];
}

const InfoPill = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-slate-800/70 p-4 rounded-lg text-center shadow-md">
    <p className="text-sm text-slate-400">{label}</p>
    <p className="text-xl font-bold text-white">{value}</p>
  </div>
);

export default function CountryDetails({ country, allCountries }: CountryDetailsProps) {
  if (!country) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-400">Selecciona un país</h2>
          <p className="text-slate-500 mt-2">Elige un país de la lista para ver sus detalles.</p>
        </div>
      </div>
    );
  }

  const borderCountryNames = country.borders
    ? country.borders.map(borderCode => {
      const borderCountry = allCountries.find(c => c.cca3 === borderCode);
      return borderCountry ? borderCountry.name.common : borderCode;
    })
    : [];

  return (
    <div className="p-6 md:p-8 overflow-y-auto h-full custom-scrollbar">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative w-40 h-28 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt || `Bandera de ${country.name.common}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center md:text-left">{country.name.common}</h1>
          <p className="text-slate-400 text-lg text-center md:text-left">{country.name.official}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <InfoPill label="Población" value={country.population.toLocaleString('es-ES')} />
        <InfoPill label="Región" value={country.region} />
        <InfoPill label="Subregión" value={country.subregion} />
        <InfoPill label="Capital" value={country.capital?.[0] || 'N/A'} />
        <InfoPill label="Moneda" value={Object.values(country.currencies)[0].name} />
        <InfoPill label="Idiomas" value={Object.values(country.languages).join(', ')} />
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 text-white">Países Fronterizos</h3>
        {borderCountryNames.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {borderCountryNames.map(name => (
              <span key={name} className="bg-slate-700 px-4 py-2 rounded-full text-sm font-medium">
                {name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">Este país no tiene fronteras terrestres.</p>
        )}
      </div>
    </div>
  );
}
