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

export const getRandomValues = () => {
  let randomNumbers = [];

  for (let i = 0; i < 12; i++) {
    let randomNumber = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
};
