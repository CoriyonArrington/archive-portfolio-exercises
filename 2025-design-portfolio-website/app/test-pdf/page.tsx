export default function TestPdfPage() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px" }}>PDF Test Page</h1>

      <p style={{ marginBottom: "16px" }}>This page tests if the PDF file is accessible. Click the links below:</p>

      <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
        <li style={{ marginBottom: "8px" }}>
          <a
            href="/coriyon-arrington-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#10b981", textDecoration: "underline" }}
          >
            Direct link to PDF
          </a>
        </li>
        <li style={{ marginBottom: "8px" }}>
          <a href="/coriyon-arrington-resume.pdf" download style={{ color: "#10b981", textDecoration: "underline" }}>
            Download link with download attribute
          </a>
        </li>
        <li style={{ marginBottom: "8px" }}>
          <a
            href="/api/download-resume"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#10b981", textDecoration: "underline" }}
          >
            API route link
          </a>
        </li>
      </ul>

      <div style={{ marginTop: "32px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Embedded PDF</h2>
        <iframe
          src="/coriyon-arrington-resume.pdf"
          style={{ width: "100%", height: "500px", border: "1px solid #d1d5db", borderRadius: "6px" }}
        ></iframe>
      </div>
    </div>
  )
}
