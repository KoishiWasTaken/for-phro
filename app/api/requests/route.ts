import { NextResponse } from "next/server";
import { getRows } from "@/lib/requests";

export async function GET() {
  const rows = await getRows();
  return NextResponse.json(rows);
}
