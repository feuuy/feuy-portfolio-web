import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-6 pb-24 pt-20 lg:px-12" id="main-content">
        <p className="text-sm font-semibold tracking-[0.08em] uppercase text-moss-mark">404</p>
        <h1 className="max-w-2xl text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em] text-architectural-white">
          This page doesn&apos;t exist.
        </h1>
        <p className="max-w-prose text-lg leading-[1.6] text-lichen-muted">
          The URL you requested could not be found. It may have moved, or the link
          may be incorrect.
        </p>
        <Link
          className="mt-2 inline-block rounded-full bg-moss-mark px-8 py-4 text-sm font-semibold text-graphite-ink no-underline transition-transform hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
          href="/"
        >
          Back to Home
        </Link>
      </main>
  )
}
