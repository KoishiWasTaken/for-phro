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
    <main style={styles.page}>
      <div style={styles.container} className="frosted-glass-strong">
        <h1 style={styles.title}>Latest Sends</h1>

        {error && (
          <p style={styles.error}>
            <strong>Error:</strong> {error}
          </p>
        )}

        <p style={styles.stats}>
          Total rows: <strong>{rows.length}</strong> | Sent rows: <strong>{sentOnly.length}</strong>
        </p>

        {rows[0] && (
          <p style={styles.debug}>
            First row sent value: <code>{String(rows[0].sent ?? "")}</code>
          </p>
        )}

        <div style={styles.results}>
          {sentOnly.length === 0 ? (
            <div style={styles.emptyState} className="frosted-glass">
              Nothing marked as sent yet. In your sheet, type <strong>Yes</strong> in the <strong>sent</strong> column for a row
              (in <strong>PUBLIC_VIEW</strong>), then refresh.
            </div>
          ) : (
            sentOnly.map((r, i) => (
              <div key={i} style={styles.card} className="frosted-glass">
                <div style={styles.cardHeader}>
                  <div style={styles.cardItem}><strong>ID:</strong> {r.level_id}</div>
                  <div style={styles.cardItem}><strong>User:</strong> {r.discord_username}</div>
                  <div style={styles.cardItem}><strong>Submitted:</strong> {r.submitted_at}</div>
                </div>

                {r.video_url && (
                  <div style={styles.videoLink}>
                    <a href={r.video_url} target="_blank" rel="noreferrer" style={styles.link}>
                      View Video →
                    </a>
                  </div>
                )}
              </div>
            ))
          )}
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
    margin: 0,
    marginBottom: 24,
    background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  error: {
    marginTop: 16,
    padding: "12px 16px",
    background: "rgba(255, 99, 71, 0.15)",
    border: "1px solid rgba(255, 99, 71, 0.3)",
    borderRadius: 12,
    color: "tomato",
    fontSize: 14,
  },
  stats: {
    opacity: 0.8,
    marginTop: 12,
    fontSize: 14,
    color: "var(--foreground)",
  },
  debug: {
    opacity: 0.7,
    marginTop: 8,
    fontSize: 12,
    color: "var(--foreground)",
  },
  results: {
    marginTop: 28,
    display: "grid",
    gap: 16,
  },
  emptyState: {
    padding: 32,
    borderRadius: 16,
    textAlign: "center",
    color: "var(--foreground)",
    opacity: 0.85,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    transition: "all 200ms ease",
  },
  cardHeader: {
    display: "flex",
    gap: 16,
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
