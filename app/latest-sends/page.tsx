"use client";

import { useEffect, useMemo, useState } from "react";

type Row = {
  submitted_at: string;
  discord_username: string;
  level_id: string;
  difficulty: string;
  video_url: string;
  involved_confirm: string;
  sent: string;
};

function normalizeDate(s: string) {
  // Handles "M/D/YYYY HH:MM:SS"
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}:\d{2}:\d{2})$/);
  if (!m) return 0;
  const [_, mm, dd, yyyy, time] = m;
  const iso = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}T${time}`;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

export default function LatestSendsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("/api/requests", { cache: "no-store" })
      .then(async (r) => {
        const text = await r.text();
        try {
          const json = JSON.parse(text);
          setRows(json);
        } catch {
          setError(`API did not return JSON. First 120 chars: ${text.slice(0, 120)}`);
        }
      })
      .catch((e) => setError(String(e?.message ?? e)));
  }, []);

  const sentOnly = useMemo(() => {
    return rows
      .filter((r) => (r.sent || "").trim().toLowerCase() === "yes")
      .sort((a, b) => normalizeDate(b.submitted_at) - normalizeDate(a.submitted_at));
  }, [rows]);

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>Latest Sends</h1>

      {error && (
        <p style={{ marginTop: 12, color: "tomato" }}>
          <b>Error:</b> {error}
        </p>
      )}

      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Total rows loaded: <b>{rows.length}</b> | Sent rows (sent = Yes): <b>{sentOnly.length}</b>
      </p>

      {/* Tiny debug helper (remove later) */}
      {rows[0] && (
        <p style={{ opacity: 0.7, marginTop: 8, fontSize: 12 }}>
          First row sent value: <code>{String(rows[0].sent ?? "")}</code>
        </p>
      )}

      <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
        {sentOnly.length === 0 ? (
          <div style={{ opacity: 0.85 }}>
            Nothing marked as sent yet. In your sheet, type <b>Yes</b> in the <b>sent</b> column for a row
            (in <b>PUBLIC_VIEW</b>), then refresh.
          </div>
        ) : (
          sentOnly.map((r, i) => (
            <div key={i} style={{ border: "1px solid #333", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div><b>ID:</b> {r.level_id}</div>
                <div><b>User:</b> {r.discord_username}</div>
                <div><b>Submitted:</b> {r.submitted_at}</div>
              </div>

              {r.video_url && (
                <div style={{ marginTop: 10 }}>
                  <a href={r.video_url} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
                    Video link
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 18, textAlign: "center" }}>
        <a href="/" style={{ textDecoration: "underline", opacity: 0.85 }}>
          ← Back
        </a>
      </div>
    </main>
  );
}
