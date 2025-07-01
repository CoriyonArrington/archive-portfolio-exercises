export default function TestResumeDownload() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Resume Download Test</h1>
      <p className="mb-4">Click the links below to test different download methods:</p>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Method 1: Basic HTML Link</h2>
          <a
            href="/coriyon-arrington-resume.pdf"
            download="coriyon-arrington-resume.pdf"
            className="text-blue-500 underline"
          >
            Download Resume (Basic HTML)
          </a>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Method 2: External Link</h2>
          <a
            href="https://www.africau.edu/images/default/sample.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Download Sample PDF (External Link)
          </a>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Method 3: Google Drive Link</h2>
          <a
            href="https://drive.google.com/uc?export=download&id=1Nh8vVcij4SBPFRQAHnFmQnRhH9A0nCYv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Download Resume (Google Drive)
          </a>
        </div>
      </div>
    </div>
  )
}
