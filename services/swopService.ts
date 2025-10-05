// src/api/fetchLatestRates.ts
import type { Rate, LatestRatesData } from '../types';

// Point to your Worker endpoint
export const API_URL = 'https://fxworker.gav-c8d.workers.dev/latest';

/**
 * Fetches the latest currency rates from the Worker.
 */
export const fetchLatestRates = async (): Promise<LatestRatesData> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: LatestRatesData = await response.json();

    if (!data || !data.rates || data.rates.length === 0) {
      throw new Error('Invalid or empty data structure received from API.');
    }

    // Optional: sort rates alphabetically by currency code
    data.rates.sort((a: Rate, b: Rate) => a.currency.localeCompare(b.currency));

    return data;
  } catch (error) {
    console.error('Failed to fetch latest rates:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unknown error occurred while fetching rates.');
  }
};

