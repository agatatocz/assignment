"use client";

import { fetchCountries } from "@/lib/graphs";
import { ChangeEvent, useState, useEffect } from "react";

type GraphCreatorProps = {
  onCountrySelect: (country: string) => void;
  exclude: string[];
};

export function GraphCreator({ onCountrySelect, exclude }: GraphCreatorProps) {
  const [showCountrySelect, setShowCountrySelect] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCountrySelect(event.target.value);
    setShowCountrySelect(false);
  };

  const updateOptions = (countries: string[]) => {
    const filteredOptions = countries.filter(
      (country) => !exclude.includes(country)
    );
    setOptions(filteredOptions);
  };

  const fetchOptions = async () => {
    const countries = await fetchCountries();
    setCountries(countries);
    updateOptions(countries);
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    updateOptions(countries);
  }, [exclude]);

  return (
    <div className="border-2 p-2 m-2 w-[544px] h-[400px] max-w-full flex flex-col justify-center items-center">
      {showCountrySelect ? (
        <>
          <label className={`font-bold`} htmlFor="country-select">
            Add new graph
          </label>
          <select
            id="country-select"
            onChange={handleSelectChange}
            defaultValue=""
            className="hover:cursor-pointer"
          >
            <option value="" disabled hidden>
              Select country
            </option>
            {options.map((option) => (
              <option value={option} key={`option-${option}`}>
                {option}
              </option>
            ))}
          </select>
        </>
      ) : (
        <button
          className={`font-bold hover:text-blue-600 transition-colors ease-in-out`}
          onClick={() => {
            setShowCountrySelect(true);
          }}
        >
          Add new graph
        </button>
      )}
    </div>
  );
}
