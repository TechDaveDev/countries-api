import { Country } from './types';

export async function getAllCountries(): Promise<Country[]> {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,cca3,flags,population,region,subregion,capital,languages,currencies,borders'
    );
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data: Country[] = await response.json();
    return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error(error);
    return [];
  }
}
