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
    <main style={styles.page}>
      <div style={styles.container} className="frosted-glass-strong">
        <h1 style={styles.title}>Search Database</h1>

        <div style={styles.searchForm}>
          <label style={styles.label}>
            <span style={styles.labelText}>Search by:</span>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as SearchMode)}
              style={styles.select}
              className="frosted-glass"
            >
              <option value="level_id">Level ID</option>
              <option value="discord_username">Username</option>
            </select>
          </label>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={mode === "level_id" ? "Type a Level ID..." : "Type a username..."}
            style={styles.input}
            className="frosted-glass"
          />
        </div>

        <div style={styles.results}>
          {query.trim() && results.length === 0 && (
            <div style={styles.noResults}>No matches found.</div>
          )}

          {results.map((r, i) => (
            <div key={i} style={styles.card} className="frosted-glass">
              <div style={styles.cardHeader}>
                <div style={styles.cardItem}><strong>ID:</strong> {r.level_id}</div>
                <div style={styles.cardItem}><strong>User:</strong> {r.discord_username}</div>
                <div style={styles.cardItem}><strong>Submitted:</strong> {r.submitted_at}</div>
              </div>

              <div style={styles.cardDetails}>
                <div style={styles.cardItem}><strong>Difficulty:</strong> {r.difficulty}</div>
                <div style={styles.cardItem}><strong>Involved:</strong> {r.involved_confirm}</div>
                <div style={styles.cardItem}><strong>Sent:</strong> {r.sent || "No"}</div>
              </div>

              {r.video_url && (
                <div style={styles.videoLink}>
                  <a href={r.video_url} target="_blank" rel="noreferrer" style={styles.link}>
                    View Video →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={styles.backLink}>
          <a href="/" style={styles.link}>← Back to Home</a>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  container: {
    width: "min(900px, 100%)",
    padding: "40px 32px",
    borderRadius: 24,
  },
  title: {
    fontSize: "clamp(28px, 4vw, 36px)",
    fontWeight: 700,
    textAlign: "center",
    margin: 0,
    marginBottom: 32,
    background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  searchForm: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 28,
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  labelText: {
    fontWeight: 600,
    fontSize: 14,
    color: "var(--foreground)",
  },
  select: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "none",
    color: "var(--foreground)",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 200ms ease",
  },
  input: {
    padding: "12px 16px",
    borderRadius: 12,
    border: "none",
    width: "min(400px, 100%)",
    fontSize: 14,
    color: "var(--foreground)",
    transition: "all 200ms ease",
  },
  results: {
    display: "grid",
    gap: 16,
  },
  noResults: {
    opacity: 0.7,
    textAlign: "center",
    padding: 32,
    color: "var(--foreground)",
  },
  card: {
    borderRadius: 16,
    padding: 20,
    transition: "all 200ms ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  cardDetails: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
  },
  cardItem: {
    fontSize: 14,
    color: "var(--foreground)",
  },
  videoLink: {
    marginTop: 14,
    paddingTop: 14,
    borderTop: "1px solid var(--glass-border)",
  },
  link: {
    color: "var(--accent)",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
    transition: "opacity 200ms ease",
  },
  backLink: {
    marginTop: 24,
    textAlign: "center",
  },
};
