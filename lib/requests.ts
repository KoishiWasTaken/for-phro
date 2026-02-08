export type Row = {
  submitted_at: string;
  discord_username: string;
  level_id: string;
  difficulty: string;
  video_url: string;
  involved_confirm: string;
  sent: string;
};

function parseCSV(csvText: string): Row[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const ch = csvText[i];
    const next = csvText[i + 1];

    if (ch === '"' && next === '"') {
      cell += '"';
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (!inQuotes && ch === ",") {
      row.push(cell);
      cell = "";
      continue;
    }
    if (!inQuotes && (ch === "\n" || ch === "\r")) {
      if (ch === "\r" && next === "\n") i++;
      row.push(cell);
      cell = "";
      if (row.some((v) => v.trim() !== "")) rows.push(row);
      row = [];
      continue;
    }
    cell += ch;
  }

  row.push(cell);
  if (row.some((v) => v.trim() !== "")) rows.push(row);

  if (rows.length === 0) return [];

  const headers = rows[0].map((h) => h.trim());
  const data = rows.slice(1).map((r) => {
    const obj: any = {};
    headers.forEach((h, idx) => (obj[h] = (r[idx] ?? "").trim()));
    return obj as Row;
  });

  return data;
}

export async function getRows(): Promise<Row[]> {
  const url = process.env.PUBLIC_SHEET_CSV_URL;

  // Return empty array if no URL is configured (graceful fallback)
  if (!url || url === "your_google_sheets_csv_url_here") {
    console.warn("PUBLIC_SHEET_CSV_URL not configured. Returning empty data.");
    return [];
  }

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "text/csv,text/plain,*/*",
        "User-Agent": "Mozilla/5.0",
      },
    });

    const text = await res.text();

    if (!res.ok) {
      console.error(`Failed to fetch CSV: ${res.status}`);
      return [];
    }

    const trimmed = text.trim();

    // If Google returns an HTML page, return empty array
    if (trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html")) {
      console.error("Google returned HTML instead of CSV");
      return [];
    }

    return parseCSV(text);
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    return [];
  }
}
