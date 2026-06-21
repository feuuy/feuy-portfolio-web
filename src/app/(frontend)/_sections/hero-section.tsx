import React from 'react'

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-6 pb-20 pt-32 lg:px-12"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-moss-mark/[0.03] via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="flex flex-col gap-8">
            <p
              className="animate-text-reveal text-sm font-medium tracking-[0.12em] uppercase text-moss-mark"
              style={{ animationDelay: '0ms' }}
            >
              Designer & Developer
            </p>

            <h1
              className="animate-hero-reveal max-w-5xl text-balance font-bold leading-[0.9] tracking-[-0.04em] text-architectural-white"
              id="hero-heading"
              style={{ animationDelay: '100ms', fontSize: 'clamp(3rem, 10vw, 7.5rem)' }}
            >
              Shipping precise, production-ready digital work.
            </h1>

            <p
              className="animate-text-reveal max-w-xl text-lg leading-[1.6] text-lichen-muted"
              style={{ animationDelay: '300ms' }}
            >
              Focused on interfaces and product experiences where clarity, taste, and implementation quality all matter.
            </p>

            <div
              className="animate-slide-up flex flex-wrap items-center gap-4"
              style={{ animationDelay: '500ms' }}
            >
              <a
                className="group relative overflow-hidden rounded-full bg-moss-mark px-8 py-4 text-sm font-semibold text-graphite-ink no-underline transition-transform hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                href="#contact"
              >
                <span className="relative z-10">Start a conversation</span>
              </a>
              <a
                className="rounded-full border border-line-soft/60 px-8 py-4 text-sm font-semibold text-architectural-white no-underline transition-colors hover:border-architectural-white hover:bg-architectural-white/5 focus-visible:border-architectural-white focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                href="#work"
              >
                View work
              </a>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-4 text-right">
            <div className="animate-fade-in text-xs font-medium tracking-[0.1em] uppercase text-lichen-muted" style={{ animationDelay: '700ms' }}>
              Scroll to explore
            </div>
            <div className="animate-glow-pulse h-16 w-[1px] bg-gradient-to-b from-moss-mark to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
