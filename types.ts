export interface Rate {
  currency: string;
  name: string;
  value: number;
}

export interface LatestRatesData {
  base: string;
  date: string;
  rates: Rate[];
}

