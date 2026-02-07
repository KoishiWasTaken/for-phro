import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.PUBLIC_SHEET_CSV_URL;

  if (!url) {
    return NextResponse.json(
      { ok: false, error: "PUBLIC_SHEET_CSV_URL is NOT set on Vercel." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        // nudge Google toward csv/text responses
        "Accept": "text/csv,text/plain,*/*",
        "User-Agent": "Mozilla/5.0",
      },
    });

    const text = await res.text();
    const contentType = res.headers.get("content-type") || "";

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      contentType,
      startsWith: text.slice(0, 80),
      isHtml: text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html"),
      preview: text.slice(0, 400),
      urlUsed: url,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
