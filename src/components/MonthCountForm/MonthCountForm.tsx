"use client";
import { MonthCount } from "@/types/Graph";
import { FormEvent } from "react";

type MonthCountFormProps = {
  onSubmit: (monthsCount: MonthCount) => void;
  defaultValues: { data: number; forecast: number };
};

export function MonthCountForm({
  onSubmit,
  defaultValues,
}: MonthCountFormProps) {
  const handleMonthsCountSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    onSubmit({
      data: Number(formData.get("dataMonthsCount")),
      forecast: Number(formData.get("forecastMonthsCount")),
    });
  };

  return (
    <form onSubmit={handleMonthsCountSubmit} className="m-3">
      <div className="m-1">
        <span>Show data from last</span>
        <input
          className="w-10 mx-1 border-2"
          type="number"
          name="dataMonthsCount"
          defaultValue={defaultValues.data}
          max={12}
          min={1}
        />
        <span>months</span>
      </div>
      <div className="m-1">
        <span>Show forecast for next</span>
        <input
          className="w-10 mx-1 border-2"
          type="number"
          name="forecastMonthsCount"
          defaultValue={defaultValues.forecast}
          max={12}
          min={1}
        />
        <span>months</span>
      </div>
      <button
        type="submit"
        className="block bg-blue-500 p-2 text-white font-semibold rounded"
      >
        Apply
      </button>
    </form>
  );
}
