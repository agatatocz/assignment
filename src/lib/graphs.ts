export const fetchGraphData = async (country: string) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphs/${country}`
  );
  return data.json();
};

export const fetchMultipleGraphsData = async (countries: string[]) => {
  const data = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/graphs/?countryList=${countries.join(",")}`
  );
  return data.json();
};

export const fetchCountries = async () => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphs/countries`
  );
  return data.json();
};
