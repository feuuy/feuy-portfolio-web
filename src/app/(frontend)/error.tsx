'use client'

import React from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log error to monitoring service in production
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-6 pb-24 pt-20 lg:px-12">
      <p className="text-sm font-semibold tracking-[0.08em] uppercase text-moss-mark">Error</p>
      <h1 className="max-w-2xl text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em] text-architectural-white">
        Something went wrong.
      </h1>
      <p className="max-w-prose text-lg leading-[1.6] text-lichen-muted">
        We encountered an unexpected issue. Please try again or return to the homepage.
      </p>
      <button
        className="mt-2 inline-block rounded-full bg-moss-mark px-8 py-4 text-sm font-semibold text-graphite-ink no-underline transition-transform hover:scale-105"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </div>
  )
}
