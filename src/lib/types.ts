export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  flags: {
    svg: string;
    alt: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  languages: { [key: string]: string };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  borders: string[];
}
