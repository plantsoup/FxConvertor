import { API_URL, API_KEY } from '../constants';
import type { GraphQLResponse, LatestRatesData, Rate } from '../types';

export const fetchLatestRates = async (): Promise<LatestRatesData> => {
  const query = `
    query GetLatestRatesAndCurrencies {
      latest {
        date
        baseCurrency
        quoteCurrency
        quote
      }
      currencies {
        code
        name
      }
    }
  `;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `ApiKey ${API_KEY}`,
      },
      body: JSON.stringify({
        query,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GraphQLResponse = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL error: ${result.errors.map(e => e.message).join(', ')}`);
    }

    if (!result.data || !result.data.latest || !result.data.currencies || result.data.latest.length === 0) {
        throw new Error('Invalid or empty data structure received from API.');
    }

    // Create a map of currency codes to names for easy lookup
    const currencyNames = new Map<string, string>();
    result.data.currencies.forEach(c => {
        currencyNames.set(c.code, c.name);
    });

    // Transform the API response array into the structure the app uses
    const rawRates = result.data.latest;
    const baseCurrency = rawRates[0].baseCurrency;
    const date = rawRates[0].date;

    const transformedRates: Rate[] = rawRates.map(rate => ({
      currency: rate.quoteCurrency,
      name: currencyNames.get(rate.quoteCurrency) || 'Unknown Currency',
      value: rate.quote,
    }));

    // Add the base currency to the rates list with a value of 1 for easier conversion
    transformedRates.push({
        currency: baseCurrency,
        name: currencyNames.get(baseCurrency) || 'Unknown Currency',
        value: 1
    });
    
    // Sort rates alphabetically by currency code
    transformedRates.sort((a, b) => a.currency.localeCompare(b.currency));

    return {
        base: baseCurrency,
        date: date,
        rates: transformedRates,
    };

  } catch (error) {
    console.error('Failed to fetch latest rates:', error);
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error('An unknown error occurred while fetching rates.');
  }
};
