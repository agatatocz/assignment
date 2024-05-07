"use client";
import ApexChart from "react-apexcharts";
import IconDelete from "@/components/icons/IconDetete";
import { GraphSeriesName, GraphSettings, GraphType } from "@/types/Graph";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocalGraphStore } from "@/store/useGraphStore";

type GraphProps = {
  graph: GraphType;
  onDelete: () => void;
};

export default function Graph({ graph, onDelete }: GraphProps) {
  const series = [
    {
      type: "bar",
      name: GraphSeriesName.ACTUAL,
      data: graph.actual,
      color: "#008FFB",
    },
    {
      type: "bar",
      name: GraphSeriesName.LAST_YEAR,
      data: graph.lastYear,
      color: "#00E396",
    },
    {
      type: "line",
      name: GraphSeriesName.FORECAST,
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
  const { getLocalGraphSettings, setLocalGraphSettings } = useLocalGraphStore();
  const [filteredSeries, setFilteredSeries] = useState(series);
  const [showSeries, setShowSeries] = useState<GraphSettings>(
    getLocalGraphSettings(graph.country)
  );

  const toggleSeries =
    (name: GraphSeriesName) => (event: ChangeEvent<HTMLInputElement>) => {
      setShowSeries((prev) => ({ ...prev, [name]: event.target.checked }));
    };

  useEffect(() => {
    setFilteredSeries(series.filter((item) => showSeries[item.name]));
    setLocalGraphSettings(graph.country, showSeries);
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
            checked={showSeries[name]}
          />
          <label htmlFor={`${name}-${graph.country}`} className="ml-1">
            <span>{name}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
