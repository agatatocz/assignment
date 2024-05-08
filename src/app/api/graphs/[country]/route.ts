import { generateData } from "@/mocks/data";
import { apiParamToNumber } from "@/utils/api";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { country: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const dataMonthsCount = searchParams.get("dataMonthsCount");
  const forecastMonthsCount = searchParams.get("forecastMonthsCount");
  const data = generateData(
    params.country,
    apiParamToNumber(dataMonthsCount),
    apiParamToNumber(forecastMonthsCount)
  );
  return new Response(JSON.stringify(data));
}
