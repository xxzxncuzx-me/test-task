'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const FilterPage = () => {
  const [makes, setMakes] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const fetchMakes = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/GetMakesForVehicleType/car?format=json`
      );
      const data = await res.json();
      setMakes(data.Results.map((make: { MakeName: string }) => make.MakeName));
    };

    fetchMakes();
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2015; year <= currentYear; year++) {
      yearsArray.push(year.toString());
    }
    setYears(yearsArray);
  }, []);

  const isNextButtonEnabled = selectedMake && selectedYear;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-96">
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
          Vehicle Filter
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Vehicle Make
          </label>
          <select
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600 appearance-none relative"
          >
            <option value="" disabled className="text-gray-400">
              Select a make
            </option>
            {makes.map((make, index) => (
              <option
                key={index}
                value={make}
                className="hover:bg-indigo-100 dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-200"
              >
                {make}
              </option>
            ))}
          </select>
          <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none">
            ▼
          </span>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Model Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600 appearance-none relative"
          >
            <option value="" disabled className="text-gray-400">
              Select a year
            </option>
            {years.map((year) => (
              <option
                key={year}
                value={year}
                className="hover:bg-indigo-100 dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-200"
              >
                {year}
              </option>
            ))}
          </select>
          <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 pointer-events-none">
            ▼
          </span>
        </div>

        <div className="flex justify-center">
          <Link href={`/result/${selectedMake}/${selectedYear}`} passHref>
            <button
              disabled={!isNextButtonEnabled}
              className={`${
                isNextButtonEnabled
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } px-6 py-3 rounded-md text-lg font-semibold transition-all duration-200 ease-in-out focus:outline-none`}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
