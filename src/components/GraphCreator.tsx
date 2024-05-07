"use client";

import { ChangeEvent, useState, useEffect } from "react";

type GraphCreatorProps = {
  onCountrySelect: (country: string) => void;
};
const exclude: string[] = [];

export default function GraphCreator({ onCountrySelect }: GraphCreatorProps) {
  const [showCountrySelect, setShowCountrySelect] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCountrySelect(event.target.value);
    setShowCountrySelect(false);
  };

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/graphs/countries?exclude=${exclude.join(",")}`
    )
      .then((res) => res.json())
      .then((res) => {
        setOptions(res);
      });
  }, []);

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
