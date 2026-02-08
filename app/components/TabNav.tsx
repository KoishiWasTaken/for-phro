"use client";

import { usePathname } from "next/navigation";

export default function TabNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "Search", href: "/search" },
    { name: "Latest Sends", href: "/latest-sends" },
    { name: "Latest Submissions", href: "/latest-submissions" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav style={styles.nav} className="frosted-glass">
      <div style={styles.container}>
        <a href="/" style={styles.logo}>
          <span style={styles.logoText}>Level Requests DB</span>
        </a>
        <div style={styles.tabs}>
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <a
                key={tab.href}
                href={tab.href}
                style={{
                  ...styles.tab,
                  ...(isActive ? styles.tabActive : {}),
                }}
              >
                {tab.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottom: "1px solid var(--glass-border)",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    flexWrap: "wrap",
  },
  logo: {
    textDecoration: "none",
    color: "var(--foreground)",
    fontWeight: 700,
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  tabs: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  tab: {
    padding: "8px 16px",
    borderRadius: 10,
    textDecoration: "none",
    color: "var(--foreground)",
    fontSize: 14,
    fontWeight: 500,
    transition: "all 200ms ease",
    opacity: 0.7,
    cursor: "pointer",
  },
  tabActive: {
    background: "var(--glass-bg)",
    opacity: 1,
    fontWeight: 600,
    boxShadow: "0 2px 8px var(--shadow-color)",
  },
};
