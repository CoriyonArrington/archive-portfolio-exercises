import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built with Next.js, Tailwind CSS, and Vercel.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="text-sm font-medium underline-offset-4 hover:underline">
            Home
          </Link>
          <Link href="/projects" className="text-sm font-medium underline-offset-4 hover:underline">
            Projects
          </Link>
          <Link href="/blog" className="text-sm font-medium underline-offset-4 hover:underline">
            Blog
          </Link>
          <Link href="/playground" className="text-sm font-medium underline-offset-4 hover:underline">
            Playground
          </Link>
        </div>
      </div>
    </footer>
  )
}

