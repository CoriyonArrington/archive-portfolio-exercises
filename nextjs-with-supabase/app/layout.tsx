// app/layout.tsx (Updated - minimal change in body > ThemeProvider > div > nav > div)

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { EnvVarWarning } from "@/components/env-var-warning";
// Corrected import: Assuming AuthButton is used as HeaderAuth
import AuthButton from "@/components/header-auth"; // Use the correct component name if different
import Footer from "@/components/layout/footer";
import SiteHeader from "@/components/layout/site-header";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { baseMetadata } from '@/config/site';
import { cn } from '@/lib/utils';

import "./globals.css";

// Font Loading (Keep as is from previous step)
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const nunitoSans = localFont({ src: [ { path: '../fonts/Nunito-Sans/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf', style: 'normal', }, { path: '../fonts/Nunito-Sans/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf', style: 'italic', } ], variable: '--font-nunito-sans', display: 'swap', });
const montserrat = localFont({ src: [ { path: '../fonts/Montserrat/Montserrat-VariableFont_wght.ttf', style: 'normal', }, { path: '../fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf', style: 'italic', } ], variable: '--font-montserrat', display: 'swap', });

export const metadata: Metadata = { ...baseMetadata };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn( "min-h-screen bg-background text-foreground font-sans antialiased", inter.variable, nunitoSans.variable, montserrat.variable )} >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
          <div className="flex flex-col min-h-screen">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="w-full max-w-screen-lg flex justify-between items-center px-4 text-sm">
                <SiteHeader />
                {/* --- MODIFIED HERE: Removed flex-shrink-0 --- */}
                <div className="flex items-center gap-4">
                  {!hasEnvVars && <EnvVarWarning />}
                  {/* Assuming AuthButton is the component used */}
                  <AuthButton />
                </div>
                {/* --- End Modification --- */}
              </div>
            </nav>
            <main className="flex-grow w-full mx-auto max-w-screen-lg">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}