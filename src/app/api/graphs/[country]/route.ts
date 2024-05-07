import { MONTHS, getRandomValues } from "@/mocks/data";

export async function GET(
  request: Request,
  { params }: { params: { country: string } }
) {
  const data = {
    country: params.country,
    actual: getRandomValues(8),
    lastYear: getRandomValues(8),
    forecast: getRandomValues(12),
    months: MONTHS,
  };
  return new Response(JSON.stringify(data));
}
