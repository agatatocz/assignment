"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function ApexGraph(props: any) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setWidth(props.width);
    }, 500);
  }, []);

  return <ApexChart {...props} width={width} />;
}
