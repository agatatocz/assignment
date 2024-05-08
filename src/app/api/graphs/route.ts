import { generateData } from "@/mocks/data";
import { apiParamToNumber } from "@/utils/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dataMonthsCount = searchParams.get("dataMonthsCount");
  const forecastMonthsCount = searchParams.get("forecastMonthsCount");
  const countries = searchParams.get("countryList")?.split(",") || [];
  const data = countries.map((country) =>
    generateData(
      country,
      apiParamToNumber(dataMonthsCount),
      apiParamToNumber(forecastMonthsCount)
    )
  );
  return new Response(JSON.stringify(data));
}
