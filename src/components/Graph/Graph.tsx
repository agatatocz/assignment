"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { GraphSeriesName, GraphSettings, GraphType } from "@/types/Graph";
import { IconDelete } from "@/components/icons";
import { ApexGraph } from "@/components/ApexGraph";
import { useLocalGraphStore } from "@/store/useLocalGraphStore";

type GraphProps = {
  graph: GraphType;
  onDelete: () => void;
};

export function Graph({ graph, onDelete }: GraphProps) {
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
      labels: {
        rotate: -45,
        rotateAlways: true,
      },
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
  }, [showSeries, graph]);

  return (
    <div
      className="border-2 p-2 m-2 w-[544px] min-h-[400px] h-fit max-w-full relative"
      data-testid="graph-test-id"
    >
      <ApexGraph
        options={options}
        series={filteredSeries}
        width={"100%"}
        height={320}
      />
      <div className="flex justify-around flex-wrap absolute bottom-2 inset-x-0">
        {series.map(({ name }) => (
          <label key={name} className="flex items-center cursor-pointer">
            <input
              id={`${name}-${graph.country}`}
              type="checkbox"
              className="sr-only peer"
              onChange={toggleSeries(name)}
              checked={showSeries[name]}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium ">{name}</span>
          </label>
        ))}
        <button
          onClick={onDelete}
          className="flex font-semibold text-red-600 pr-2 p-1 rounded border-2 border-red-600 hover:bg-slate-100 transition"
        >
          <IconDelete className="fill-red-600" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
