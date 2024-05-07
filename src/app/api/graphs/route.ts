import { MONTHS, getRandomValues } from "@/mocks/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const countries = searchParams.get("countryList")?.split(",") || [];
  const data = countries.map((country) => ({
    country: country,
    actual: getRandomValues(8),
    lastYear: getRandomValues(8),
    forecast: getRandomValues(12),
    months: MONTHS,
  }));
  return new Response(JSON.stringify(data));
}
