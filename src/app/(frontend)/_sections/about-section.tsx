import React from 'react'

export default function AboutSection() {
  return (
    <section
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t border-line-soft/30 px-6 py-32 lg:px-12 lg:py-40"
      id="about"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <div>
            <p className="mb-4 text-sm font-medium tracking-[0.12em] uppercase text-moss-mark">
              Background
            </p>
            <h2
              className="text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-architectural-white"
              id="about-heading"
            >
              About
            </h2>
          </div>

          <div className="max-w-2xl space-y-8 text-lg leading-[1.6] text-lichen-muted">
            <p className="text-architectural-white">
              I design and build digital work with a bias toward clarity, sharp decisions, and durable implementation.
            </p>
            <p>
              Working at the intersection of design and engineering, I build interfaces that are clear, durable, and considered from both sides. Every project starts with the user&apos;s experience and ends with production code that holds up over time.
            </p>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.06em] text-architectural-white">
                  Design
                </h3>
                <p className="text-sm leading-[1.5]">From first principles — user and constraint driven.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.06em] text-architectural-white">
                  Engineering
                </h3>
                <p className="text-sm leading-[1.5]">Built for durability as products grow and evolve.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.06em] text-architectural-white">
                  Delivery
                </h3>
                <p className="text-sm leading-[1.5]">Shipped quality matching design intent throughout.</p>
              </div>
            </div>

            <p>
              Previously contributed to design systems, product interfaces, and frontend architecture for teams shipping production software. Work spans shipped products and speculative explorations — both driven by the same bar for craft.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <a
                className="rounded-full border border-line-soft/60 px-6 py-3 text-sm font-semibold text-architectural-white no-underline transition-colors hover:border-architectural-white hover:bg-architectural-white/5 focus-visible:border-architectural-white focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                href="/resume.pdf"
              >
                Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
