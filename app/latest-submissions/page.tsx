"use client";

import { useEffect, useMemo, useState } from "react";
import TabNav from "../components/TabNav";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/requests", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setRows(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => {
        setRows([]);
        setLoading(false);
      });
  }, []);

  const sorted = useMemo(() => {
    return [...rows].sort(
      (a, b) => normalizeDate(b.submitted_at) - normalizeDate(a.submitted_at)
    );
  }, [rows]);

  return (
    <>
      <TabNav />
      <main style={styles.page}>
      <div style={styles.container} className="frosted-glass-strong">
        <h1 style={styles.title}>Latest Submissions</h1>

        {rows.length === 0 && !loading ? (
          <div style={styles.notice} className="frosted-glass animate-pulse">
            <strong>Database not configured yet.</strong>
            <p style={{ margin: "8px 0 0 0", fontSize: 14, opacity: 0.8 }}>
              To set up the database, add your Google Sheets CSV URL to the <code>PUBLIC_SHEET_CSV_URL</code> environment variable.
              See <code>.env.example</code> for details.
            </p>
          </div>
        ) : (
          <>
            <p style={styles.stats}>
              Total rows: <strong>{rows.length}</strong>
            </p>

            {sorted[0] && (
              <p style={styles.debug}>
                Newest submission: <code>{sorted[0].submitted_at}</code>
              </p>
            )}

            <div style={styles.results}>
              {sorted.length === 0 ? (
                <div style={styles.emptyState} className="frosted-glass animate-pulse">
                  No submissions found yet.
                </div>
              ) : (
                sorted.map((r, i) => (
                  <div key={i} style={{...styles.card, animationDelay: `${i * 0.05}s`}} className="frosted-glass result-card animate-slide-in-up">
                    <div style={styles.cardHeader}>
                      <div style={styles.cardItem}>
                        <strong>ID:</strong> {r.level_id}
                      </div>
                      <div style={styles.cardItem}>
                        <strong>User:</strong> {r.discord_username}
                      </div>
                      <div style={styles.cardItem}>
                        <strong>Submitted:</strong> {r.submitted_at}
                      </div>
                    </div>

                    <div style={styles.cardDetails}>
                      <div style={styles.cardItem}>
                        <strong>Difficulty:</strong> {r.difficulty || "—"}
                      </div>
                      <div style={styles.cardItem}>
                        <strong>Involved:</strong> {r.involved_confirm || "—"}
                      </div>
                      <div style={styles.cardItem}>
                        <strong>Sent:</strong> {r.sent || "No"}
                      </div>
                    </div>

                    {r.video_url && (
                      <div style={styles.videoLink}>
                        <a
                          href={r.video_url}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.link}
                        >
                          View Video →
                        </a>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </main>
      <style jsx>{`
        .result-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px var(--shadow-color);
        }
        .result-card {
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    paddingTop: 100,
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
  notice: {
    padding: "20px 24px",
    borderRadius: 14,
    marginBottom: 24,
    textAlign: "center",
    color: "var(--foreground)",
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
};
