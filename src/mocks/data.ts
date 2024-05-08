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

export const getRandomValues = (count: number) => {
  let randomNumbers = [];

  for (let i = 0; i < count; i++) {
    let randomNumber = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
};

export const getMonths = () => {
  const currentMonth: number = new Date().getUTCMonth();
  if (currentMonth === 7) return MONTHS;
  const months = [...MONTHS];

  if (currentMonth < 7) {
    for (let i = currentMonth; i < 8; i++) {
      const lastMonth = months.pop();
      months.unshift(lastMonth as string);
    }
    return months;
  } else {
    for (let i = currentMonth; i > 7; i--) {
      const lastMonth = months.shift();
      months.push(lastMonth as string);
    }
    return months;
  }
};
