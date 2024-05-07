"use client";

import Graph from "@/components/Graph";
import { useEffect, useState } from "react";
import GraphCreator from "@/components/GraphCreator";
import { GraphType } from "@/types/Graph";

export default function Dashboard() {
  const [graphs, setGraphs] = useState<GraphType[]>([]);

  // useEffect(() => {
  //   addGraph("Poland");
  // }, []);

  const addGraph = async (country: string) => {
    const graph = await fetch(
      `http://localhost:3000/api/graphs/${country}`
    ).then((res) => res.json());
    setGraphs([...graphs, graph]);
  };
  const deleteGraph = (country: string) => () => {
    const filtered = graphs.filter((graph) => graph.country !== country);
    setGraphs(filtered);
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
        <GraphCreator onCountrySelect={addGraph} />
      </div>
    </div>
  );
}
