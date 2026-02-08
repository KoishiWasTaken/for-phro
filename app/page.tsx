export default function Home() {
  return (
    <main style={styles.page}>
      {/* Top-left About button */}
      <div style={styles.topLeft}>
        <a href="/about" style={styles.aboutBtn} className="frosted-glass">
          About
        </a>
      </div>

      {/* Center content with frosted glass */}
      <div style={styles.centerWrap} className="frosted-glass-strong">
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
    padding: "12px 24px",
    color: "var(--foreground)",
    fontWeight: 600,
    borderRadius: 12,
    textDecoration: "none",
    transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  centerWrap: {
    width: "min(600px, 90%)",
    textAlign: "center",
    padding: "60px 48px",
    borderRadius: 24,
    animation: "fadeIn 0.6s ease-out",
  },
  title: {
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    margin: 0,
    lineHeight: 1.1,
    background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    marginTop: 12,
    marginBottom: 40,
    opacity: 0.8,
    fontSize: 18,
    fontWeight: 500,
    color: "var(--foreground)",
  },
  buttonRow: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  bigBtn: {
    width: "100%",
    maxWidth: 320,
    textAlign: "center",
    padding: "16px 32px",
    background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
    color: "white",
    fontWeight: 600,
    fontSize: 16,
    borderRadius: 14,
    textDecoration: "none",
    border: "none",
    boxShadow: "0 8px 24px rgba(59, 130, 246, 0.35)",
    transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  footerText: {
    marginTop: 32,
    opacity: 0.7,
    fontSize: 14,
    color: "var(--foreground)",
  },
};
