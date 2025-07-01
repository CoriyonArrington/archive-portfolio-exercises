import Link from "next/link"

// Logo component for the footer
export function FooterLogo() {
  return (
    <Link href="/" className="font-playfair text-xl font-bold">
      Designer<span className="text-primary">Portfolio</span>
    </Link>
  )
}
