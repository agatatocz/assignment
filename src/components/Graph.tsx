"use client";
import ApexChart from "react-apexcharts";
import IconDelete from "@/components/icons/IconDetete";
import { GraphType } from "@/types/Graph";

type GraphProps = {
  graph: GraphType;
  onDelete: () => void;
};

export default function Graph({ graph, onDelete }: GraphProps) {
  const config = {
    options: {
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
    },
    series: [
      {
        type: "bar",
        name: "Actual",
        data: graph.actual,
      },
      {
        type: "bar",
        name: "Last year",
        data: graph.lastYear,
      },
      {
        type: "line",
        name: "Forecast",
        data: graph.forecast,
      },
    ],
  };

  return (
    <div className="border-2 p-2 m-2 w-fit flex items-start">
      <ApexChart options={config.options} series={config.series} width="500" />
      <button onClick={onDelete}>
        <IconDelete />
      </button>
    </div>
  );
}
