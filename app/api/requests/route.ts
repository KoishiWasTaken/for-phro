export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getRows } from "@/lib/requests";

export async function GET() {
  try {
    const rows = await getRows();
    return NextResponse.json(rows);
  } catch (e: any) {
    return NextResponse.json(
      { error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
