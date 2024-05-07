"use client";

import { fetchCountries } from "@/lib/graphs";
import { ChangeEvent, useState, useEffect } from "react";

type GraphCreatorProps = {
  onCountrySelect: (country: string) => void;
  exclude: string[];
};

export default function GraphCreator({
  onCountrySelect,
  exclude,
}: GraphCreatorProps) {
  const [showCountrySelect, setShowCountrySelect] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCountrySelect(event.target.value);
    setShowCountrySelect(false);
  };

  const filterOptions = (options: string[]) => {
    return options.filter((option) => !exclude.includes(option));
  };

  const fetchOptions = async () => {
    const options = await fetchCountries();
    setOptions(filterOptions(options));
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    setOptions(filterOptions(options));
  }, [exclude]);

  return (
    <div className="border p-2 m-2 w-[500px] h-[350px] flex flex-col justify-center items-center">
      <button
        className="font-bold"
        onClick={() => {
          setShowCountrySelect(true);
        }}
      >
        Add new graph
      </button>
      {showCountrySelect ? (
        <select onChange={handleSelectChange} defaultValue="">
          <option value="" disabled hidden>
            Select country
          </option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
}
