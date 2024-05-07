"use client";

import Graph from "@/components/Graph";
import { useEffect, useState } from "react";
import GraphCreator from "@/components/GraphCreator";
import { GraphType } from "@/types/Graph";
import { useLocalGraphStore } from "@/store/useGraphStore";
import { fetchGraphData, fetchMultipleGraphsData } from "@/lib/graphs";

export default function Dashboard() {
  const [graphs, setGraphs] = useState<GraphType[]>([]);
  const { getLocalGraphs, saveLocalGraph, deleteLocalGraph } =
    useLocalGraphStore();

  const fetchLocalGraphData = async () => {
    const localCountries = getLocalGraphs().map(({ country }) => country);
    if (!localCountries.length) return;
    const localGraphsData = await fetchMultipleGraphsData(localCountries);
    setGraphs(localGraphsData);
  };

  useEffect(() => {
    fetchLocalGraphData();
  }, []);

  const addGraph = async (country: string) => {
    const graph = await fetchGraphData(country);
    setGraphs([...graphs, graph]);
    saveLocalGraph(country);
  };

  const deleteGraph = (country: string) => () => {
    const filtered = graphs.filter((graph) => graph.country !== country);
    setGraphs(filtered);
    deleteLocalGraph(country);
  };

  return (
    <div>
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
    </div>
  );
}
