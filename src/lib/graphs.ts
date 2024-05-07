export const fetchGraphData = async (country: string) => {
  const data = await fetch(`http://localhost:3000/api/graphs/${country}`).then(
    (res) => res.json()
  );
  return data;
};
export const fetchMultipleGraphsData = async (countries: string[]) => {
  const data = await fetch(
    `http://localhost:3000/api/graphs/?countryList=${countries.join(",")}`
  ).then((res) => res.json());
  return data;
};
export const fetchCountries = async () => {
  const data = await fetch(`http://localhost:3000/api/graphs/countries`).then(
    (res) => res.json()
  );
  return data;
};
