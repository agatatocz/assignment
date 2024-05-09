import { GraphSeriesName, GraphSettings, GraphState } from "@/types/Graph";

const defaultGraphSettings: GraphSettings = {
  [GraphSeriesName.ACTUAL]: true,
  [GraphSeriesName.LAST_YEAR]: true,
  [GraphSeriesName.FORECAST]: true,
};

export const useLocalGraphStore = () => {
  const getLocalGraphs = () => {
    const graphState: GraphState[] = JSON.parse(
      localStorage.getItem("graphState") || "[]"
    );
    return graphState;
  };

  const saveLocalGraph = (country: string) => {
    const graphState: GraphState[] = getLocalGraphs();

    const newGraph: GraphState = {
      country,
      settings: defaultGraphSettings,
    };

    localStorage.setItem(
      "graphState",
      JSON.stringify([...graphState, newGraph])
    );
  };

  const deleteLocalGraph = (country: string) => {
    const graphState: GraphState[] = getLocalGraphs();

    const filtered = graphState.filter((graph) => graph.country !== country);
    localStorage.setItem("graphState", JSON.stringify(filtered));
  };

  const setLocalGraphSettings = (country: string, settings: GraphSettings) => {
    const graphState: GraphState[] = getLocalGraphs();

    const mapped = graphState.map((graph) =>
      graph.country === country ? { ...graph, settings } : graph
    );
    localStorage.setItem("graphState", JSON.stringify(mapped));
  };

  const getLocalGraphSettings = (country: string) => {
    const graphState: GraphState[] = JSON.parse(
      localStorage.getItem("graphState") || "[]"
    );

    return (
      graphState.find((item) => item.country === country)?.settings ||
      defaultGraphSettings
    );
  };

  return {
    getLocalGraphs,
    saveLocalGraph,
    deleteLocalGraph,
    setLocalGraphSettings,
    getLocalGraphSettings,
  };
};
