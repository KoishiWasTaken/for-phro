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

type SearchMode = "level_id" | "discord_username";

export default function SearchPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [mode, setMode] = useState<SearchMode>("level_id");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  // Reset to page 1 when search query or mode changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query, mode]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setRows([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);
    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: "10",
      search: q,
      searchMode: mode,
      sortBy: "latest",
    });

    fetch(`/api/requests?${params}`)
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
  }, [currentPage, mode, query]);

  return (
    <>
      <TabNav />
      <main style={styles.page}>
      <div style={styles.container} className="frosted-glass-strong">
        <h1 style={styles.title}>Search Database</h1>

        <div style={styles.disclaimer} className="frosted-glass animate-fade-in">
          <strong>⚠️ Safety Notice</strong>
          <p style={{ margin: "8px 0 0 0", fontSize: 14, opacity: 0.85 }}>
            Be cautious when clicking on video links. Only click links you trust or that belong to you. External links may lead to unexpected or potentially harmful content.
          </p>
        </div>

        <div style={styles.searchForm} className="animate-float-slow">
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

        {loading && (
          <div style={styles.loadingState}>Loading results...</div>
        )}

        {!loading && hasSearched && total > 0 && (
          <p style={styles.stats}>
            Found <strong>{total}</strong> {total === 1 ? "result" : "results"}
          </p>
        )}

        <div style={styles.results}>
          {!loading && hasSearched && rows.length === 0 && (
            <div style={styles.noResults}>No matches found.</div>
          )}

          {rows.map((r, i) => (
            <div key={i} style={{...styles.card, animationDelay: `${i * 0.05}s`}} className="frosted-glass result-card animate-slide-in-up">
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

        {!loading && hasSearched && totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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
    textAlign: "center",
    margin: 0,
    marginBottom: 24,
    background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  disclaimer: {
    padding: "16px 20px",
    borderRadius: 12,
    marginBottom: 24,
    textAlign: "center",
    color: "var(--foreground)",
    borderLeft: "4px solid #f59e0b",
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
    marginTop: 12,
    marginBottom: 16,
    fontSize: 14,
    color: "var(--foreground)",
    textAlign: "center",
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
};
