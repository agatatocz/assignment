"use client";

import Graph from "@/components/Graph";
import { useEffect, useState } from "react";
import GraphCreator from "@/components/GraphCreator";
import { GraphType, MonthCount } from "@/types/Graph";
import { useLocalGraphStore } from "@/store/useGraphStore";
import { fetchGraphData, fetchMultipleGraphsData } from "@/lib/graphs";
import MonthCountForm from "./MonthCountForm";
import { useLocalMonthStore } from "@/store/useMonthStore";

export default function Dashboard() {
  const { getLocalGraphs, saveLocalGraph, deleteLocalGraph } =
    useLocalGraphStore();
  const { getLocalMonthsCount, saveLocalMonthsCount } = useLocalMonthStore();
  const [graphs, setGraphs] = useState<GraphType[]>([]);
  const [monthsCount, setMonthsCount] = useState<MonthCount>(
    getLocalMonthsCount()
  );

  const fetchLocalGraphData = async () => {
    const localCountries = getLocalGraphs().map(({ country }) => country);
    if (!localCountries.length) return;
    const localGraphsData = await fetchMultipleGraphsData(
      localCountries,
      monthsCount.data,
      monthsCount.forecast
    );
    setGraphs(localGraphsData);
  };

  useEffect(() => {
    fetchLocalGraphData();
  }, [monthsCount]);

  const addGraph = async (country: string) => {
    const graph = await fetchGraphData(
      country,
      monthsCount.data,
      monthsCount.forecast
    );
    setGraphs([...graphs, graph]);
    saveLocalGraph(country);
  };

  const deleteGraph = (country: string) => () => {
    const filtered = graphs.filter((graph) => graph.country !== country);
    setGraphs(filtered);
    deleteLocalGraph(country);
  };

  const updateMonthsCount = (monthsCount: MonthCount) => {
    setMonthsCount(monthsCount);
    saveLocalMonthsCount(monthsCount);
  };

  return (
    <>
      <MonthCountForm
        onSubmit={updateMonthsCount}
        defaultValues={monthsCount}
      />
      <div className="flex flex-wrap">
        {graphs.map((graph) => (
          <Graph
            key={graph.country}
            graph={graph}
            onDelete={deleteGraph(graph.country)}
          />
        ))}
        <GraphCreator
          onCountrySelect={addGraph}
          exclude={graphs.map(({ country }) => country)}
        />
      </div>
    </>
  );
}
