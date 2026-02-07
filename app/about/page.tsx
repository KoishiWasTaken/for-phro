export default function AboutPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>About</h1>

      <p style={{ marginTop: 12, opacity: 0.85, maxWidth: 800, lineHeight: 1.6 }}>
        This website is a Geometry Dash request dashboard designed to make level submissions easier to browse,
        search, and track. Requests are submitted through a Google Form and automatically stored in a Google
        Spreadsheet, which this site pulls from.
      </p>

      <h2 style={{ marginTop: 30, fontSize: 18, fontWeight: "bold" }}>How it works</h2>
      <ul style={{ marginTop: 10, paddingLeft: 20, opacity: 0.85, lineHeight: 1.7 }}>
        <li><b>Search</b> allows you to find submissions by Level ID or Username.</li>
        <li><b>Latest Submissions</b> shows the newest requests.</li>
        <li><b>Latest Sends</b> shows levels marked as sent in the spreadsheet.</li>
      </ul>

      <h2 style={{ marginTop: 30, fontSize: 18, fontWeight: "bold" }}>Disclaimer</h2>
      <p style={{ marginTop: 10, opacity: 0.85, maxWidth: 800, lineHeight: 1.6 }}>
        Submitting a request does not guarantee that the level will be sent or reviewed. This site is meant
        to keep the request process organized and transparent.
      </p>

      <div style={{ marginTop: 30, textAlign: "center" }}>
        <a href="/" style={{ textDecoration: "underline", opacity: 0.85 }}>
          ← Back
        </a>
      </div>
    </main>
  );
}
