"use client";

import { useEffect, useRef } from "react";
import TabNav from "./components/TabNav";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const scrollElements = document.querySelectorAll(".scroll-fade-in");
    scrollElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <TabNav />
      <main style={styles.page}>
        {/* Hero Section */}
        <div style={styles.centerWrap} className="frosted-glass-strong animate-float-slow">
          <img
            src="/icon.png"
            alt="Level Requests Database"
            style={styles.logo}
            className="animate-fade-in"
          />
          <p style={styles.subtitle} className="animate-fade-in animate-pulse">
            phrostix and dkirinor
          </p>

          <div style={styles.buttonRow}>
            <a
              href="/search"
              style={{ ...styles.bigBtn, animationDelay: "0.1s" }}
              className="big-btn animate-scale-in animate-float"
            >
              Search
            </a>
            <a
              href="/latest-sends"
              style={{ ...styles.bigBtn, animationDelay: "0.2s" }}
              className="big-btn animate-scale-in animate-float"
            >
              Latest Sends
            </a>
            <a
              href="/latest-submissions"
              style={{ ...styles.bigBtn, animationDelay: "0.3s" }}
              className="big-btn animate-scale-in animate-float"
            >
              Latest Submissions
            </a>
          </div>

          <p style={styles.footerText} className="animate-fade-in">
            Browse requests, search submissions, and view recent sends.
          </p>
        </div>

        {/* About Section - Scrolls into view */}
        <div ref={aboutRef} style={styles.aboutSection}>
          <div style={styles.aboutContainer} className="frosted-glass-strong scroll-fade-in">
            <h2 style={styles.aboutTitle} className="scroll-fade-in">
              About This Database
            </h2>

            <p style={styles.aboutParagraph} className="scroll-fade-in">
              This website is a Geometry Dash request dashboard designed to make level submissions easier to browse,
              search, and track. Requests are submitted through a Google Form and automatically stored in a Google
              Spreadsheet, which this site pulls from.
            </p>

            <h3 style={styles.aboutSubtitle} className="scroll-fade-in">
              How it works
            </h3>
            <ul style={styles.aboutList} className="scroll-fade-in">
              <li>
                <strong>Search</strong> allows you to find submissions by Level ID or Username.
              </li>
              <li>
                <strong>Latest Submissions</strong> shows the newest requests.
              </li>
              <li>
                <strong>Latest Sends</strong> shows levels marked as sent in the spreadsheet.
              </li>
            </ul>

            <h3 style={styles.aboutSubtitle} className="scroll-fade-in">
              Disclaimer
            </h3>
            <p style={styles.aboutParagraph} className="scroll-fade-in">
              Submitting a request does not guarantee that the level will be sent or reviewed. This site is meant to
              keep the request process organized and transparent.
            </p>
          </div>
        </div>
      </main>
      <style jsx>{`
        .big-btn {
          animation-delay: inherit;
        }
        .big-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 32px rgba(59, 130, 246, 0.5);
          animation-play-state: paused;
        }
        .big-btn:active {
          transform: translateY(-2px) scale(0.98);
        }
        .scroll-fade-in {
          transition-delay: calc(var(--delay, 0) * 0.1s);
        }
        .scroll-fade-in:nth-child(1) {
          --delay: 0;
        }
        .scroll-fade-in:nth-child(2) {
          --delay: 1;
        }
        .scroll-fade-in:nth-child(3) {
          --delay: 2;
        }
        .scroll-fade-in:nth-child(4) {
          --delay: 3;
        }
        .scroll-fade-in:nth-child(5) {
          --delay: 4;
        }
        .scroll-fade-in:nth-child(6) {
          --delay: 5;
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
    paddingTop: 100,
    gap: 80,
  },
  centerWrap: {
    width: "min(600px, 90%)",
    textAlign: "center",
    padding: "60px 48px",
    borderRadius: 24,
    marginTop: 40,
  },
  logo: {
    width: "auto",
    maxWidth: "280px",
    height: "auto",
    margin: "0 auto 20px auto",
    display: "block",
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
  aboutSection: {
    width: "100%",
    maxWidth: 900,
    marginBottom: 80,
  },
  aboutContainer: {
    padding: "48px 40px",
    borderRadius: 24,
  },
  aboutTitle: {
    fontSize: "clamp(28px, 4vw, 38px)",
    fontWeight: 700,
    margin: 0,
    marginBottom: 28,
    background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textAlign: "center",
  },
  aboutParagraph: {
    marginTop: 16,
    marginBottom: 24,
    opacity: 0.9,
    lineHeight: 1.7,
    fontSize: 16,
    color: "var(--foreground)",
  },
  aboutSubtitle: {
    marginTop: 32,
    marginBottom: 12,
    fontSize: 22,
    fontWeight: 600,
    color: "var(--foreground)",
  },
  aboutList: {
    marginTop: 14,
    paddingLeft: 24,
    opacity: 0.9,
    lineHeight: 1.8,
    fontSize: 15,
    color: "var(--foreground)",
  },
};
