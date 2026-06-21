import Link from 'next/link'
import React from 'react'
import { Inter } from 'next/font/google'
import type { Viewport } from 'next'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  description:
    'Portfolio of Felicio Orlandini — designer-developer shipping precise, production-ready digital work.',
  title: {
    default: 'FEUY — Designer & Developer',
    template: '%s — FEUY',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FEUY Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FEUY Portfolio — Designer & Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@feuy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${inter.variable} ${inter.className}`}>
      <body>
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-50 focus:rounded-[8px] focus:bg-moss-mark focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-graphite-ink focus:no-underline focus:outline-none"
          href="#main-content"
        >
          Skip to content
        </a>
        <div className="bg-graphite-ink text-architectural-white">
          <header
            className="sticky top-0 z-50 border-b border-line-soft/50 bg-graphite-ink/80 backdrop-blur-xl"
            role="banner"
          >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-12">
              <Link
                className="text-sm font-semibold tracking-[0.08em] uppercase text-architectural-white no-underline transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                href="/#main-content"
              >
                FEUY
              </Link>
              <nav aria-label="Primary">
                <ul className="flex items-center gap-6 text-sm font-medium tracking-wide text-lichen-muted sm:gap-8">
                  <li>
                    <Link
                      className="no-underline transition-colors hover:text-architectural-white focus-visible:text-architectural-white focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                      href="/#work"
                    >
                      Work
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="no-underline transition-colors hover:text-architectural-white focus-visible:text-architectural-white focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                      href="/#about"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="no-underline transition-colors hover:text-architectural-white focus-visible:text-architectural-white focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                      href="/#contact"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          {children}

          <footer
            className="border-t border-line-soft/30 px-6 py-12 lg:px-12"
            role="contentinfo"
          >
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium tracking-[0.08em] uppercase text-lichen-muted">
                &copy; {new Date().getFullYear()} Felicio Orlandini
              </p>
              <nav aria-label="Footer">
                <ul className="flex flex-wrap items-center gap-6 text-sm text-lichen-muted">
                  <li>
                    <Link
                      className="no-underline transition-colors hover:text-architectural-white focus-visible:text-architectural-white focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                      href="/#work"
                    >
                      Work
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="no-underline transition-colors hover:text-architectural-white focus-visible:text-architectural-white focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                      href="/#about"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="no-underline transition-colors hover:text-architectural-white focus-visible:text-architectural-white focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                      href="/#contact"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
