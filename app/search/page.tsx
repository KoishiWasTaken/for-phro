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

type SearchMode = "level_id" | "discord_username";

export default function SearchPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [mode, setMode] = useState<SearchMode>("level_id");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/requests")
      .then((r) => r.json())
      .then((d) => setRows(d));
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return rows.filter((r) => {
      const value = (r[mode] || "").toLowerCase();
      return value.includes(q);
    });
  }, [rows, mode, query]);

  return (
    <main style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: 24 }}>
      <div style={{ width: "min(900px, 100%)" }}>
        <h1 style={{ fontSize: 28, fontWeight: "bold", textAlign: "center" }}>Search</h1>

        <div style={{ marginTop: 18, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>Search by:</span>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as SearchMode)}
              style={{
                padding: 10,
                borderRadius: 10,
                border: "1px solid #333",
                backgroundColor: "white",
                color: "black",
              }}
            >
              <option value="level_id">Level ID</option>
              <option value="discord_username">Username</option>
          </select>
          </label>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={mode === "level_id" ? "Type a Level ID..." : "Type a username..."}
            style={{ padding: 10, borderRadius: 10, border: "1px solid #333", width: "min(520px, 100%)" }}
          />
        </div>

        <div style={{ marginTop: 22, display: "grid", gap: 12 }}>
          {query.trim() && results.length === 0 && (
            <div style={{ opacity: 0.8, textAlign: "center" }}>No matches found.</div>
          )}

          {results.map((r, i) => (
            <div key={i} style={{ border: "1px solid #333", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div><b>ID:</b> {r.level_id}</div>
                <div><b>User:</b> {r.discord_username}</div>
                <div><b>Submitted:</b> {r.submitted_at}</div>
              </div>

              <div style={{ marginTop: 8, display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div><b>Difficulty:</b> {r.difficulty}</div>
                <div><b>Involved:</b> {r.involved_confirm}</div>
                <div><b>Sent:</b> {r.sent || "No"}</div>
              </div>

              {r.video_url && (
                <div style={{ marginTop: 10 }}>
                  <a href={r.video_url} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
                    Video link
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, textAlign: "center" }}>
          <a href="/" style={{ textDecoration: "underline", opacity: 0.85 }}>← Back</a>
        </div>
      </div>
    </main>
  );
}
