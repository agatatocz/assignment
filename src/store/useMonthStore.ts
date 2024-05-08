import { MonthCount } from "@/types/Graph";

const defaultMonthCount: MonthCount = {
  data: 8,
  forecast: 4,
};

export const useLocalMonthStore = () => {
  const getLocalMonthsCount = () => {
    try {
      const monthsCount: MonthCount = JSON.parse(
        localStorage.getItem("monthsCount") || ""
      );
      return monthsCount || defaultMonthCount;
    } catch {
      return defaultMonthCount;
    }
  };

  const saveLocalMonthsCount = (monthsCount: MonthCount) => {
    localStorage.setItem("monthsCount", JSON.stringify(monthsCount));
  };

  return {
    getLocalMonthsCount,
    saveLocalMonthsCount,
  };
};
