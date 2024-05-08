export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const COUNTRIES = [
  "Belgium",
  "France",
  "Germany",
  "Italy",
  "Netherlands",
  "Poland",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
];

export const DEFAULT_DATA_MONTHS_COUNT = 8;
export const DEFAULT_FORECAST_MONTHS_COUNT = 4;
export const DEFAULT_MONTHS_COUNT = {
  data: DEFAULT_DATA_MONTHS_COUNT,
  forecast: DEFAULT_FORECAST_MONTHS_COUNT,
};

export const getRandomValues = (count: number) => {
  let randomNumbers = [];

  for (let i = 0; i < count; i++) {
    let randomNumber = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
};

const fillMonths = (
  months: string[],
  dataMonthsCount: number,
  forecastMonthsCount: number
) => {
  if (months.length < dataMonthsCount + forecastMonthsCount) {
    const slice = months.slice(0, forecastMonthsCount);
    return [...months, ...slice];
  } else return months;
};

export const getMonths = (
  dataMonthsCount: number,
  forecastMonthsCount: number
) => {
  const currentMonth: number = new Date().getUTCMonth();
  const months = [...MONTHS];

  if (currentMonth < dataMonthsCount) {
    for (let i = currentMonth; i < dataMonthsCount; i++) {
      const lastMonth = months.pop();
      months.unshift(lastMonth as string);
    }
  } else {
    for (let i = currentMonth; i > dataMonthsCount; i--) {
      const lastMonth = months.shift();
      months.push(lastMonth as string);
    }
  }
  return fillMonths(months, dataMonthsCount, forecastMonthsCount);
};

export const generateData = (
  country: string,
  dataMonthsCount: number = DEFAULT_DATA_MONTHS_COUNT,
  forecastMonthsCount: number = DEFAULT_FORECAST_MONTHS_COUNT
) => {
  return {
    country,
    actual: getRandomValues(dataMonthsCount),
    lastYear: getRandomValues(dataMonthsCount),
    forecast: getRandomValues(dataMonthsCount + forecastMonthsCount),
    months: getMonths(dataMonthsCount, forecastMonthsCount),
  };
};
