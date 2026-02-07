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
  const m = s.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}:\d{2}:\d{2})$/
  );
  if (!m) return 0;
  const [_, mm, dd, yyyy, time] = m;
  const iso = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}T${time}`;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? 0 : d.getTime();
}

export default function LatestSubmissionsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        setError("");

        const r = await fetch("/api/requests", { cache: "no-store" });
        const text = await r.text();

        let json: any;
        try {
          json = JSON.parse(text);
        } catch {
          setRows([]);
          setError(
            `API did not return JSON. Status: ${r.status}. First 120 chars: ${text.slice(
              0,
              120
            )}`
          );
          return;
        }

        // ✅ If API returned an error object (or anything non-array), don't crash
        if (!Array.isArray(json)) {
          console.error("API returned non-array:", json);
          setRows([]);
          setError(json?.error ?? "API did not return an array");
          return;
        }

        // ✅ Optional: basic shape-safety (prevents undefined fields crashing UI)
        const cleaned: Row[] = json.map((x: any) => ({
          submitted_at: String(x?.submitted_at ?? ""),
          discord_username: String(x?.discord_username ?? ""),
          level_id: String(x?.level_id ?? ""),
          difficulty: String(x?.difficulty ?? ""),
          video_url: String(x?.video_url ?? ""),
          involved_confirm: String(x?.involved_confirm ?? ""),
          sent: String(x?.sent ?? ""),
        }));

        setRows(cleaned);
      } catch (e: any) {
        setRows([]);
        setError(String(e?.message ?? e));
      }
    })();
  }, []);

  const sorted = useMemo(() => {
    return [...rows].sort(
      (a, b) => normalizeDate(b.submitted_at) - normalizeDate(a.submitted_at)
    );
  }, [rows]);

  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>Latest Submissions</h1>

      {error && (
        <p style={{ marginTop: 12, color: "tomato" }}>
          <b>Error:</b> {error}
        </p>
      )}

      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Total rows loaded: <b>{rows.length}</b>
      </p>

      {sorted[0] && (
        <p style={{ opacity: 0.7, marginTop: 8, fontSize: 12 }}>
          Newest submission timestamp: <code>{sorted[0].submitted_at}</code>
        </p>
      )}

      <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
        {sorted.length === 0 ? (
          <div style={{ opacity: 0.85 }}>No submissions found yet.</div>
        ) : (
          sorted.map((r, i) => (
            <div
              key={i}
              style={{ border: "1px solid #333", borderRadius: 12, padding: 16 }}
            >
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <b>ID:</b> {r.level_id}
                </div>
                <div>
                  <b>User:</b> {r.discord_username}
                </div>
                <div>
                  <b>Submitted:</b> {r.submitted_at}
                </div>
              </div>

              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <b>Difficulty:</b> {r.difficulty || "—"}
                </div>
                <div>
                  <b>Involved:</b> {r.involved_confirm || "—"}
                </div>
                <div>
                  <b>Sent:</b> {r.sent || "No"}
                </div>
              </div>

              {r.video_url && (
                <div style={{ marginTop: 10 }}>
                  <a
                    href={r.video_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "underline" }}
                  >
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
