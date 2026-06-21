'use client'

import React from 'react'
import { useCopyToClipboard } from '../_hooks/use-copy-to-clipboard'

export default function ContactEmail({ email }: { email: string }) {
  const { copied, fallback, copy } = useCopyToClipboard(email)

  if (!email) return null

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        className="text-base font-semibold text-architectural-white underline decoration-line-soft/60 underline-offset-4 transition-colors hover:text-moss-mark focus-visible:text-moss-mark focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
        href={`mailto:${email}`}
      >
        {email}
      </a>
      <button
        aria-label={copied ? 'Email address copied' : fallback ? 'Opening email app…' : 'Copy email address'}
        className={[
          'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-colors',
          copied
            ? 'border-moss-mark/40 bg-moss-mark/10 text-moss-mark'
            : 'border-line-soft/60 text-lichen-muted hover:border-architectural-white hover:text-architectural-white',
          'focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink',
        ].join(' ')}
        onClick={copy}
        type="button"
      >
        {copied ? (
          <>
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5 text-moss-mark"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Copied
          </>
        ) : fallback ? (
          'Opening email app…'
        ) : (
          <>
            <svg
              aria-hidden="true"
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M8 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2M8 4h8a2 2 0 0 1 2 2v2M8 4v2m8-2v2m-2-2v10a2 2 0 0 1-2 2h-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  )
}
