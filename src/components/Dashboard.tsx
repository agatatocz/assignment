"use client";

import Graph from "@/components/Graph";
import { useState } from "react";
import GraphCreator from "@/components/GraphCreator";
import { GraphType } from "@/types/Graph";

export default function Dashboard() {
  const [graphs, setGraphs] = useState<GraphType[]>([{ country: "Poland" }]);

  const onCountrySelect = (country: string) => {
    setGraphs([...graphs, { country }]);
  };

  return (
    <div>
      <div className="flex flex-wrap">
        {graphs.map((graph) => (
          <Graph key={graph.country} country={graph.country} />
        ))}
        <GraphCreator onCountrySelect={onCountrySelect} />
      </div>
    </div>
  );
}
