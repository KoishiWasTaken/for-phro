export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getRows } from "@/lib/requests";

function normalizeDate(s: string) {
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}:\d{2}:\d{2})$/);
  if (!m) return 0;
  const [_, mm, dd, yyyy, time] = m;
  const iso = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}T${time}`;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const searchMode = searchParams.get("searchMode") || "";
    const filterSent = searchParams.get("filterSent") === "true";
    const sortBy = searchParams.get("sortBy") || "latest";

    let rows = await getRows();

    // Filter by sent status
    if (filterSent) {
      rows = rows.filter((r) => (r.sent || "").trim().toLowerCase() === "yes");
    }

    // Filter by search
    if (search && searchMode) {
      const q = search.toLowerCase();
      rows = rows.filter((r) => {
        const value = (r[searchMode as keyof typeof r] || "").toLowerCase();
        return value.includes(q);
      });
    }

    // Sort
    if (sortBy === "latest") {
      rows.sort((a, b) => normalizeDate(b.submitted_at) - normalizeDate(a.submitted_at));
    }

    const total = rows.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = rows.slice(start, end);

    return NextResponse.json({
      data,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (e: any) {
    console.error("Error in /api/requests:", e);
    // Return empty result instead of error to prevent UI crashes
    return NextResponse.json({
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    });
  }
}
