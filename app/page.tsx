export default function Home() {
  return (
    <main style={styles.page}>
      {/* Top-left About button */}
      <div style={styles.topLeft}>
        <a href="/about" style={styles.aboutBtn}>
          About
        </a>
      </div>

      {/* Center content */}
      <div style={styles.centerWrap}>
        <h1 style={styles.title}>Level Requests Database</h1>
        <p style={styles.subtitle}>phrostix and dkirinor</p>

        <div style={styles.buttonRow}>
          <a href="/search" style={styles.bigBtn}>
            Search
          </a>
          <a href="/latest-sends" style={styles.bigBtn}>
            Latest Sends
          </a>
          <a href="/latest-submissions" style={styles.bigBtn}>
            Latest Submissions
          </a>
        </div>

        <p style={styles.footerText}>
          Browse requests, search submissions, and view recent sends.
        </p>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "black",
    color: "white",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  topLeft: {
    position: "absolute",
    top: 24,
    left: 24,
  },
  aboutBtn: {
    display: "inline-block",
    padding: "14px 28px",
    background: "white",
    color: "black",
    fontWeight: 700,
    borderRadius: 10,
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    transition: "transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease",
  },
  centerWrap: {
    width: "min(1100px, 100%)",
    textAlign: "center",
  },
  title: {
    fontSize: 52,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    margin: 0,
    lineHeight: 1.05,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 44,
    opacity: 0.65,
    fontSize: 16,
  },
  buttonRow: {
    display: "flex",
    gap: 28,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  bigBtn: {
    width: 280,
    textAlign: "center",
    padding: "18px 22px",
    background: "white",
    color: "black",
    fontWeight: 700,
    borderRadius: 12,
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
    transition: "transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease",
  },
  footerText: {
    marginTop: 34,
    opacity: 0.75,
    fontSize: 14,
  },
};
