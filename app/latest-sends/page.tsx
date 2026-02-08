"use client";

import { useEffect, useState } from "react";
import TabNav from "../components/TabNav";
import Pagination from "../components/Pagination";

type Row = {
  submitted_at: string;
  discord_username: string;
  level_id: string;
  difficulty: string;
  video_url: string;
  involved_confirm: string;
  sent: string;
};

export default function LatestSendsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [allTotal, setAllTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: "10",
      filterSent: "true",
      sortBy: "latest",
    });

    fetch(`/api/requests?${params}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((response) => {
        setRows(response.data || []);
        setTotal(response.total || 0);
        setTotalPages(response.totalPages || 0);
        setLoading(false);
      })
      .catch(() => {
        setRows([]);
        setTotal(0);
        setTotalPages(0);
        setLoading(false);
      });
  }, [currentPage]);

  // Fetch total count of all submissions (for stats display)
  useEffect(() => {
    fetch("/api/requests?limit=0")
      .then((r) => r.json())
      .then((response) => {
        setAllTotal(response.total || 0);
      })
      .catch(() => {
        setAllTotal(0);
      });
  }, []);

  return (
    <>
      <TabNav />
      <main style={styles.page}>
      <div style={styles.container} className="frosted-glass-strong">
        <h1 style={styles.title}>Latest Sends</h1>

        {loading && (
          <div style={styles.loadingState}>Loading sent levels...</div>
        )}

        {!loading && total === 0 && (
          <div style={styles.emptyState} className="frosted-glass animate-pulse">
            Nothing marked as sent yet. In your sheet, type <strong>Yes</strong> in the <strong>sent</strong> column for a row, then refresh.
          </div>
        )}

        {!loading && total > 0 && (
          <>
            <p style={styles.stats}>
              Total submissions: <strong>{allTotal}</strong> | Sent: <strong>{total}</strong>
            </p>

            <div style={styles.results}>
              {rows.map((r, i) => (
                <div key={i} style={{...styles.card, animationDelay: `${i * 0.05}s`}} className="frosted-glass result-card animate-slide-in-up">
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
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
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
  loadingState: {
    textAlign: "center",
    padding: 32,
    opacity: 0.7,
    fontSize: 16,
    color: "var(--foreground)",
  },
  stats: {
    opacity: 0.8,
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
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
};
