
import React, { useState, useEffect, useMemo } from 'react';
import { fetchLatestRates } from '../services/swopService';
import type { Rate } from '../types';
import RatesTable from './RatesTable';
import CurrencySelector from './CurrencySelector';
import LoadingSpinner from './LoadingSpinner';
import { SwapIcon } from './IconComponents';

const CurrencyConverter: React.FC = () => {
  const [allRatesData, setAllRatesData] = useState<{ date: string; rates: Rate[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [baseCurrency, setBaseCurrency] = useState<string>('GBP');
  const [amount, setAmount] = useState<string>('420');
  const [fromCurrency, setFromCurrency] = useState<string>('GBP');
  const [toCurrency, setToCurrency] = useState<string>('EUR');

  useEffect(() => {
    const loadInitialRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchLatestRates();
        setAllRatesData({ date: data.date, rates: data.rates });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch currency data.');
      } finally {
        setLoading(false);
      }
    };
    loadInitialRates();
  }, []);

  const { rates, currencies, date } = useMemo(() => {
    if (!allRatesData) {
      return { rates: [], currencies: [], date: '' };
    }
    const selectedBaseRate = allRatesData.rates.find(r => r.currency === baseCurrency)?.value;
    
    if (!selectedBaseRate) {
      const currencyList = allRatesData.rates.map(r => r.currency);
      return { rates: allRatesData.rates, currencies: currencyList, date: allRatesData.date };
    }

    // FIX: Added the missing 'name' property to the mapped rate object.
    const rebasedRates = allRatesData.rates.map(rate => ({
      currency: rate.currency,
      name: rate.name,
      value: rate.value / selectedBaseRate,
    }));
    
    const currencyList = allRatesData.rates.map(r => r.currency);

    return { rates: rebasedRates, currencies: currencyList, date: allRatesData.date };
  }, [allRatesData, baseCurrency]);

  const convertedAmount = useMemo(() => {
    if (!allRatesData) return null;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return null;
    }
    
    const fromRate = allRatesData.rates.find(r => r.currency === fromCurrency)?.value;
    const toRate = allRatesData.rates.find(r => r.currency === toCurrency)?.value;

    if (fromRate && toRate) {
      return (numericAmount / fromRate) * toRate;
    }
    
    return null;
  }, [amount, fromCurrency, toCurrency, allRatesData]);

  useEffect(() => {
    if (currencies.length > 0) {
        if (!currencies.includes(baseCurrency)) {
            setBaseCurrency(currencies.includes('GBP') ? 'GBP' : currencies[0]);
        }
        if (!currencies.includes(fromCurrency)) {
            setFromCurrency(currencies.includes('GBP') ? 'GBP' : currencies[0]);
        }
        if (!currencies.includes(toCurrency)) {
            setToCurrency(currencies.includes('EUR') ? 'EUR' : currencies[1] || currencies[0]);
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies]);
  
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };


  if (loading && !allRatesData) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-center" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline ml-2">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Convert Amount</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="1.00"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
            <CurrencySelector
              id="fromCurrency"
              currencies={currencies}
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
                onClick={handleSwapCurrencies}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-600 dark:text-gray-300 transition-colors duration-200"
                aria-label="Swap currencies"
            >
                <SwapIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1">
            <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
            <CurrencySelector
              id="toCurrency"
              currencies={currencies}
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            />
          </div>
        </div>
        {convertedAmount !== null && (
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {amount} {fromCurrency} =
            </p>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {convertedAmount.toFixed(4)} {toCurrency}
            </p>
          </div>
        )}
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Exchange Rates</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {date}</p>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="baseCurrency" className="text-sm font-medium text-gray-700 dark:text-gray-300">Base:</label>
                <CurrencySelector
                    id="baseCurrency"
                    currencies={currencies}
                    value={baseCurrency}
                    onChange={(e) => setBaseCurrency(e.target.value)}
                    className="w-32"
                />
            </div>
        </div>
        <RatesTable rates={rates} baseCurrency={baseCurrency} />
      </section>
    </div>
  );
};

export default CurrencyConverter;
