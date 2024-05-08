import "@testing-library/jest-dom";
import { getMonths } from "./data";

describe("Mock data generators", () => {
  describe("getMoths", () => {
    it.each([
      {
        month: "January",
        monthIndex: 0,
        expected: [
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
          "January",
          "February",
          "March",
          "April",
        ],
      },
      {
        month: "July",
        monthIndex: 6,
        expected: [
          "November",
          "December",
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
        ],
      },
      {
        month: "August",
        monthIndex: 7,
        expected: [
          "December",
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
        ],
      },
      {
        month: "September",
        monthIndex: 8,
        expected: [
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
        ],
      },
      {
        month: "December",
        monthIndex: 11,
        expected: [
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
          "January",
          "February",
          "March",
        ],
      },
    ])(
      "should return array of 12 months with $month under 8th index",
      ({ monthIndex, expected }) => {
        jest.spyOn(Date.prototype, "getUTCMonth").mockReturnValue(monthIndex);
        const actual = getMonths();
        expect(actual).toEqual(expected);
      }
    );
  });
});
