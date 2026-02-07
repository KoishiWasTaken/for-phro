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
  if (!url) throw new Error("Missing PUBLIC_SHEET_CSV_URL in .env.local");

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.status}`);

  const csv = await res.text();
  return parseCSV(csv);
}
