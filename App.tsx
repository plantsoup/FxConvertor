
import React from 'react';
import CurrencyConverter from './components/CurrencyConverter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-600 dark:text-primary-400">
            Swop Currency Converter
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Real-time exchange rates at your fingertips.
          </p>
        </header>
        <CurrencyConverter />
        <footer className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>Powered by the <a href="https://swop.dev/documentation" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Swop GraphQL API</a>.</p>
          <p>&copy; {new Date().getFullYear()} - All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
