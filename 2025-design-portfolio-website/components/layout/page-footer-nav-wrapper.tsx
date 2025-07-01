"use client"

import { usePathname } from "next/navigation"
import PageFooterNav from "./page-footer-nav"

export default function PageFooterNavWrapper() {
  const pathname = usePathname()

  return <PageFooterNav pathname={pathname} />
}
