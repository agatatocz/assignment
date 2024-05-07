"use client";
import ApexChart from "react-apexcharts";
import IconDelete from "@/components/icons/IconDetete";
import { GraphType } from "@/types/Graph";
import { ChangeEvent, useEffect, useState } from "react";

type GraphProps = {
  graph: GraphType;
  onDelete: () => void;
};

type GraphSeriesName = "Actual" | "Last year" | "Forecast";

export default function Graph({ graph, onDelete }: GraphProps) {
  const series = [
    {
      type: "bar",
      name: "Actual",
      data: graph.actual,
      color: "#008FFB",
    },
    {
      type: "bar",
      name: "Last year",
      data: graph.lastYear,
      color: "#00E396",
    },
    {
      type: "line",
      name: "Forecast",
      data: graph.forecast,
      color: "#FEBC3B",
    },
  ];
  const options = {
    type: "bar",
    title: {
      text: graph.country,
    },
    chart: {
      id: "bar",
    },
    xaxis: {
      categories: graph.months,
    },
  };
  const [filteredSeries, setFilteredSeries] = useState(series);
  const [showSeries, setShowSeries] = useState({
    Actual: true,
    "Last year": true,
    Forecast: true,
  });

  const toggleSeries =
    (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setShowSeries((prev) => ({ ...prev, [name]: event.target.checked }));
    };

  useEffect(() => {
    setFilteredSeries(
      series.filter((item) => showSeries[item.name as GraphSeriesName])
    );
  }, [showSeries]);

  return (
    <div className="border-2 p-2 m-2 w-fit">
      <div className="flex items-start">
        <ApexChart options={options} series={filteredSeries} width="500" />
        <button onClick={onDelete}>
          <IconDelete />
        </button>
      </div>
      {series.map(({ name }) => (
        <div key={name}>
          <input
            id={`${name}-${graph.country}`}
            type="checkbox"
            onChange={toggleSeries(name)}
            defaultChecked
          />
          <label htmlFor={`${name}-${graph.country}`} className="ml-1">
            <span>{name}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
