export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p>This page should load without issues.</p>
      <div className="mt-4">
        <a href="/admin/login" className="text-blue-600 hover:underline">
          Go to Admin Login
        </a>
      </div>
    </div>
  )
}
