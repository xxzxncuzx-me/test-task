import React, { Suspense } from 'react';
import { use } from 'react';

const fetchVehicleModels = async (makeId: string, year: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data = await res.json();
  return data.Results?.map((model: { Model_Name: string }) => model.Model_Name);
};

const fetchParams = async (params: { makeId: string; year: string }) => {
  return params;
};
interface ResultPageProps {
  params: { makeId: string; year: string };
}

const ResultPage = ({ params }: ResultPageProps) => {
  const { makeId, year } = use(fetchParams(params));

  const vehicleModels = use(fetchVehicleModels(makeId, year));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-8">
      <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
          Vehicle Models for {makeId} - {year}
        </h1>

        {vehicleModels?.length === 0 ? (
          <p className="text-center text-lg text-red-500 dark:text-red-400">
            No models found for this make and year.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {vehicleModels?.map((model: string, index: number) => (
              <div
                key={index}
                className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-lg border border-blue-200 p-6 transition transform duration-300 hover:scale-105"
              >
                <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-200">
                  {model}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SuspenseWrapper = ({
  params,
}: {
  params: { makeId: string; year: string };
}) => {
  return (
    <Suspense fallback={<LoadingState />}>
      <ResultPage params={params} />
    </Suspense>
  );
};

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center text-xl text-gray-700 dark:text-gray-200">
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
      <span className="text-xl">Loading vehicle models...</span>
    </div>
  </div>
);

export default SuspenseWrapper;
