import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.PUBLIC_SHEET_CSV_URL;

  return NextResponse.json({
    hasUrl: !!url,
    urlStart: url?.slice(0, 60) ?? null,
    urlEnd: url?.slice(-30) ?? null,
    length: url?.length ?? 0,
  });
}
