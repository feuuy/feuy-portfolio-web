import React from 'react'
import ContactEmail from '../_components/contact-email'

interface ContactSectionProps {
  email: string
}

export default function ContactSection({ email }: ContactSectionProps) {
  return (
    <section
      aria-labelledby="contact-heading"
      className="scroll-mt-24 px-6 py-32 lg:px-12 lg:py-40"
      id="contact"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <div>
            <p className="mb-4 text-sm font-medium tracking-[0.12em] uppercase text-moss-mark">
              Get in touch
            </p>
            <h2
              className="text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-architectural-white"
              id="contact-heading"
            >
              Contact
            </h2>
            <p className="mt-6 max-w-md text-lg leading-[1.6] text-lichen-muted">
              Start a conversation about product work, design, or frontend implementation.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="max-w-md">
              <ContactEmail email={email} />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a
                className="text-lichen-muted underline decoration-line-soft/60 underline-offset-4 transition-colors hover:text-architectural-white focus-visible:text-architectural-white focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                href="https://github.com/feuy"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              <a
                className="text-lichen-muted underline decoration-line-soft/60 underline-offset-4 transition-colors hover:text-architectural-white focus-visible:text-architectural-white focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                href="https://linkedin.com/in/feuy"
                rel="noopener noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
