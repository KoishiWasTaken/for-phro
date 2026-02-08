export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getRows } from "@/lib/requests";

export async function GET() {
  try {
    const rows = await getRows();
    return NextResponse.json(rows);
  } catch (e: any) {
    console.error("Error in /api/requests:", e);
    // Return empty array instead of error to prevent UI crashes
    return NextResponse.json([]);
  }
}
