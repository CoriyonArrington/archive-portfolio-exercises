import { ReactNode } from 'react'
import { getRoutes } from '@/lib/routes/get-routes'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import PageFooterNav from '@/components/layout/page-footer-nav'

export default function RootLayout({ children }: { children: ReactNode }) {
  const routes = getRoutes()

  return (
    <html lang="en">
      <body>
        <Header routes={routes} />
        <main>{children}</main>

        {/* Only PageFooterNav is client-side here */}
        <PageFooterNav />

        <Footer routes={routes} />
      </body>
    </html>
  )
}
