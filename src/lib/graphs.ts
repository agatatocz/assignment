export const fetchGraphData = async (
  country: string,
  dataMonthsCount?: number,
  forecastMonthsCount?: number
) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphs/${country}/?dataMonthsCount=${dataMonthsCount}&forecastMonthsCount=${forecastMonthsCount}`
  );
  return data.json();
};

export const fetchMultipleGraphsData = async (
  countries: string[],
  dataMonthsCount?: number,
  forecastMonthsCount?: number
) => {
  const data = await fetch(
    `${
      process.env.NEXT_PUBLIC_VERCEL_URL
    }/api/graphs/?countryList=${countries.join(
      ","
    )}&dataMonthsCount=${dataMonthsCount}&forecastMonthsCount=${forecastMonthsCount}`
  );
  return data.json();
};

export const fetchCountries = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/graphs/countries`
  );
  return data.json();
};
