import { COUNTRIES } from "@/mocks/data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const exclude = searchParams.get("exclude")?.split(",");
  const data = COUNTRIES.filter((country) => !exclude?.includes(country));

  return new Response(JSON.stringify(data));
}
