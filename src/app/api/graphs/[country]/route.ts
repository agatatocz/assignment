import { MONTHS, getRandomValues } from "@/mocks/data";

export async function GET(
  request: Request,
  { params }: { params: { country: string } }
) {
  const data = {
    country: params.country,
    actual: getRandomValues(),
    lastYear: getRandomValues(),
    forecast: getRandomValues(),
    months: MONTHS,
  };
  return new Response(JSON.stringify(data));
}
