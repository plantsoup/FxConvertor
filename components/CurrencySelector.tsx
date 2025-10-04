
import React from 'react';

interface CurrencySelectorProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  currencies: string[];
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currencies, className, ...props }) => {
  return (
    <select
      {...props}
      className={`mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md ${className || ''}`}
    >
      {currencies.map(currency => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
