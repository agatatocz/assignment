"use client";
import ApexChart from "react-apexcharts";

type GraphProps = {
  country: string;
};

export default function Graph({ country }: GraphProps) {
  const config = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <div className="border-2 p-2 m-2 w-fit">
      <h3>{country}</h3>
      <ApexChart
        options={config.options}
        series={config.series}
        type="bar"
        width="500"
      />
    </div>
  );
}
