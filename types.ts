// Represents a rate in the application's internal, processed format
export interface Rate {
  currency: string;
  name: string; // Full name of the currency
  value: number;
}

// Represents the processed data structure used by the app components.
// The service layer transforms the raw API response into this format.
export interface LatestRatesData {
  base: string;
  date: string;
  rates: Rate[];
}

// Represents a single rate object from the raw API response, as per documentation
export interface ApiLatestRate {
  date: string;
  baseCurrency: string;
  quoteCurrency: string;
  quote: number;
}

// Represents a single currency info object from the raw API response
export interface ApiCurrencyInfo {
    code: string;
    name: string;
}

// Represents the raw data structure for the combined query response from the API
export interface CombinedData {
    latest: ApiLatestRate[];
    currencies: ApiCurrencyInfo[];
}

export interface GraphQLError {
  message: string;
}

// Represents the full GraphQL response, which could have data or errors
export interface GraphQLResponse {
  data?: CombinedData;
  errors?: GraphQLError[];
}
