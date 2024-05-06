"use client";

import { ChangeEvent, useState } from "react";

const options = ["Poland", "Denmark", "Germany", "Italy"];

type GraphCreatorProps = {
  onCountrySelect: (country: string) => void;
};

export default function GraphCreator({ onCountrySelect }: GraphCreatorProps) {
  const [showCountrySelect, setShowCountrySelect] = useState<boolean>(false);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCountrySelect(event.target.value);
    setShowCountrySelect(false);
  };
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
        <select onChange={handleSelectChange}>
          <option value="" disabled selected hidden>
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
