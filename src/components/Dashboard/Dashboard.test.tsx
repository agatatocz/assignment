import { Dashboard } from "./Dashboard";
import { render, screen } from "@testing-library/react";
import * as localGraphStore from "@/store/useLocalGraphStore";
import * as localMonthStore from "@/store/useLocalMonthStore";
import * as fetchFunctions from "@/lib/graphs";
import userEvent from "@testing-library/user-event";

jest.mock("@/store/useLocalGraphStore", () => ({
  useLocalGraphStore: jest.fn(),
}));

jest.mock("@/store/useLocalMonthStore", () => ({
  useLocalMonthStore: jest.fn(),
}));

jest.mock("@/lib/graphs", () => ({
  fetchMultipleGraphsData: jest.fn(),
  fetchGraphData: jest.fn(),
  fetchCountries: jest.fn(),
}));

jest.mock("react-apexcharts", () => {
  const MockApexChart = () => <div />;
  return MockApexChart;
});

describe("Dashboard", () => {
  const mockLocalGraphStore = {
    getLocalGraphs: jest.fn().mockReturnValue([
      {
        country: "Belgium",
        settings: { Actual: true, "Last year": true, Forecast: true },
      },
      {
        country: "Italy",
        settings: { Actual: true, "Last year": true, Forecast: true },
      },
    ]),
    saveLocalGraph: jest.fn(),
    deleteLocalGraph: jest.fn(),
    setLocalGraphSettings: jest.fn(),
    getLocalGraphSettings: jest
      .fn()
      .mockReturnValue({ Actual: true, "Last year": true, Forecast: true }),
  };
  const mockLocalMonthStore = {
    getLocalMonthsCount: jest.fn().mockReturnValue({ data: 2, forecast: 3 }),
    saveLocalMonthsCount: jest.fn(),
  };
  const mockGraphsData = [
    {
      country: "Belgium",
      actual: [21, 82],
      lastYear: [91, 89],
      forecast: [78, 31, 50, 70, 60],
      months: ["March", "April", "May", "June"],
    },
    {
      country: "Italy",
      actual: [30, 90],
      lastYear: [81, 25],
      forecast: [49, 28, 24, 32, 65],
      months: ["March", "April", "May", "June"],
    },
  ];
  const mockCountries = ["France", "Germany"];

  beforeEach(() => {
    jest
      .spyOn(localGraphStore, "useLocalGraphStore")
      .mockReturnValue(mockLocalGraphStore);
    jest
      .spyOn(localMonthStore, "useLocalMonthStore")
      .mockReturnValue(mockLocalMonthStore);
    jest
      .spyOn(fetchFunctions, "fetchMultipleGraphsData")
      .mockResolvedValue(mockGraphsData);
    jest
      .spyOn(fetchFunctions, "fetchGraphData")
      .mockResolvedValue(mockGraphsData[0]);
    jest
      .spyOn(fetchFunctions, "fetchCountries")
      .mockResolvedValue(mockCountries);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should check graphs state and fetch graphs data after mount", async () => {
    render(<Dashboard />);

    expect(await screen.findAllByLabelText(/Actual/)).toHaveLength(2);
    expect(await screen.findAllByLabelText(/Last year/)).toHaveLength(2);
    expect(await screen.findAllByLabelText(/Forecast/)).toHaveLength(2);
    expect(
      await screen.findAllByRole("button", { name: /Delete/ })
    ).toHaveLength(2);

    expect(mockLocalMonthStore.getLocalMonthsCount).toHaveBeenCalled();
    expect(mockLocalGraphStore.getLocalGraphs).toHaveBeenCalled();
    expect(fetchFunctions.fetchMultipleGraphsData).toHaveBeenCalledWith(
      ["Belgium", "Italy"],
      2,
      3
    );
  });
  it("should enable adding new graph", async () => {
    const user = userEvent.setup();

    render(<Dashboard />);

    const addButton = screen.getByRole("button", { name: "Add new graph" });
    await user.click(addButton);
    await user.selectOptions(screen.getByLabelText("Add new graph"), [
      "France",
    ]);

    expect(fetchFunctions.fetchGraphData).toHaveBeenCalledWith("France", 2, 3);
    expect(mockLocalGraphStore.saveLocalGraph).toHaveBeenCalledWith("France");
    expect(await screen.findAllByLabelText(/Actual/)).toHaveLength(3);
  });
});
