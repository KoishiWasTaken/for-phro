"use client";

import TabNav from "./components/TabNav";

export default function Home() {
  return (
    <>
      <TabNav />
      <main style={styles.page}>
        <div style={styles.centerWrap} className="frosted-glass-strong">
          <h1 style={styles.title} className="animate-fade-in">Level Requests Database</h1>
          <p style={styles.subtitle} className="animate-fade-in">phrostix and dkirinor</p>

          <div style={styles.buttonRow}>
            <a href="/search" style={{...styles.bigBtn, animationDelay: "0.1s"}} className="big-btn animate-scale-in">
              Search
            </a>
            <a href="/latest-sends" style={{...styles.bigBtn, animationDelay: "0.2s"}} className="big-btn animate-scale-in">
              Latest Sends
            </a>
            <a href="/latest-submissions" style={{...styles.bigBtn, animationDelay: "0.3s"}} className="big-btn animate-scale-in">
              Latest Submissions
            </a>
          </div>

          <p style={styles.footerText} className="animate-fade-in">
            Browse requests, search submissions, and view recent sends.
          </p>
        </div>
      </main>
      <style jsx>{`
        .big-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 32px rgba(59, 130, 246, 0.5);
        }
        .big-btn:active {
          transform: translateY(-2px) scale(0.98);
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    paddingTop: 100,
  },
  centerWrap: {
    width: "min(600px, 90%)",
    textAlign: "center",
    padding: "60px 48px",
    borderRadius: 24,
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
    animationDelay: "0.1s",
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
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  footerText: {
    marginTop: 32,
    opacity: 0.7,
    fontSize: 14,
    color: "var(--foreground)",
    animationDelay: "0.4s",
  },
};
