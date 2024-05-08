export type GraphType = {
  country: string;
  actual: number[];
  lastYear: number[];
  forecast: number[];
  months: string[];
};

export enum GraphSeriesName {
  ACTUAL = "Actual",
  LAST_YEAR = "Last year",
  FORECAST = "Forecast",
}
export type GraphSettings = {
  [key in GraphSeriesName]: boolean;
};

export type GraphState = {
  country: string;
  settings: GraphSettings;
};

export type MonthCount = {
  data: number;
  forecast: number;
};
