import { COUNTRIES } from "@/mocks/data";

export async function GET() {
  return new Response(JSON.stringify(COUNTRIES));
}
