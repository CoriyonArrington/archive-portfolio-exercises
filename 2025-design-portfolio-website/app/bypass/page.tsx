export default function BypassPage() {
  const adminKey = "portfolio2025"

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Area Bypass</h1>

      <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg mb-8 border border-yellow-200 dark:border-yellow-800">
        <h2 className="text-xl font-semibold mb-2">Your Admin Key</h2>
        <div className="bg-white dark:bg-gray-800 p-2 rounded font-mono mb-4">{adminKey}</div>
        <p className="mb-2">
          Use this key to access admin pages by adding{" "}
          <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">?admin-key={adminKey}</code> to any admin
          URL.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Direct Admin Links</h2>
      <div className="grid gap-4">
        <AdminLink href={`/admin/dashboard?admin-key=${adminKey}`} label="Dashboard" />
        <AdminLink href={`/admin/projects?admin-key=${adminKey}`} label="Projects" />
        <AdminLink href={`/admin/services?admin-key=${adminKey}`} label="Services" />
        <AdminLink href={`/admin/testimonials?admin-key=${adminKey}`} label="Testimonials" />
        <AdminLink href={`/admin/faqs?admin-key=${adminKey}`} label="FAQs" />
        <AdminLink href={`/admin/process?admin-key=${adminKey}`} label="Process" />
        <AdminLink href={`/admin/images?admin-key=${adminKey}`} label="Images" />
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Manual Instructions</h2>
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
        <p className="mb-4">If the links above don't work, you can manually access any admin page by:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Go to the admin page you want (e.g.,{" "}
            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/admin/services</code>)
          </li>
          <li>When redirected to the login page, manually edit the URL in your browser</li>
          <li>
            Add <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">?admin-key={adminKey}</code> to the end
            of the URL
          </li>
          <li>Press Enter to navigate to the page with the admin key</li>
        </ol>
      </div>
    </div>
  )
}

function AdminLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="block bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 p-4 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors"
    >
      <span className="font-medium">{label}</span>
      <span className="text-sm text-gray-500 dark:text-gray-400 block mt-1">{href}</span>
    </a>
  )
}
