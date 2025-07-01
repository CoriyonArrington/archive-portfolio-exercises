import Link from "next/link";

export default function DashboardHome() {
  const cards = [
    { label: "Manage Pages", href: "/admin/dashboard/pages" },
    { label: "Manage Projects", href: "/admin/dashboard/projects" },
    { label: "Manage Services", href: "/admin/dashboard/services" },
    { label: "Manage FAQs", href: "/admin/dashboard/faqs" },
    // etc.
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Welcome, Admin!</h1>
      <p className="mb-6 text-gray-700">Select a section to manage:</p>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
