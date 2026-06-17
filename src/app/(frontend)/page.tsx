import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import Image from 'next/image'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
    overrideAccess: false,
    pagination: false,
    sort: 'order',
  })

  const publishedProjects = projects.docs

  const workTypeLabels: Record<string, { value: string; label: string }> = {
    shipped: { value: 'shipped', label: 'Shipped' },
    speculative: { value: 'speculative', label: 'Speculative' },
  }

  return (
    <div className="bg-architectural-white text-graphite-ink">
      <header
        className="sticky top-0 z-10 border-b border-line-soft bg-architectural-white/95"
        role="banner"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <a className="text-base font-semibold tracking-tight text-graphite-ink no-underline" href="#top">
            Felicio Orlandini
          </a>
          <nav aria-label="Primary">
            <ul className="flex items-center gap-4 text-sm text-lichen-muted sm:gap-6">
              <li>
                <a
                  className="no-underline transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                  href="#work"
                >
                  Work
                </a>
              </li>
              <li>
                <a
                  className="no-underline transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                  href="#about"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="no-underline transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                  href="#contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-8 lg:px-10 lg:pb-24" id="top">
        <section
          aria-labelledby="hero-heading"
          className="grid gap-8 border-b border-line-soft pb-10 pt-8 lg:min-h-screen lg:grid-cols-3 lg:items-end lg:pb-16"
        >
          <div className="max-w-4xl lg:col-span-2">
            <h1
              className="max-w-4xl text-5xl font-semibold tracking-tight text-graphite-ink sm:text-6xl lg:text-8xl lg:leading-none"
              id="hero-heading"
            >
              Designer-developer shipping precise, production-ready digital work.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-lichen-muted">
              Focused on interfaces and product experiences where clarity, taste, and
              implementation quality all matter.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                className="rounded-sm bg-moss-mark px-5 py-3 text-sm font-semibold text-architectural-white no-underline transition-colors hover:bg-graphite-ink focus-visible:bg-graphite-ink"
                href="#contact"
              >
                Contact
              </a>
              <a
                className="rounded-sm border border-line-soft bg-architectural-white px-5 py-3 text-sm font-semibold text-graphite-ink no-underline transition-colors hover:border-graphite-ink focus-visible:border-graphite-ink"
                href="#work"
              >
                View Work
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-line-soft bg-mist-surface p-6 lg:col-span-1 lg:p-8">
            <p className="text-base leading-7 text-lichen-muted">
              A structured single-page Portfolio built to move naturally from impression to
              evidence to conversation.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="work-heading"
          className="scroll-mt-24 border-b border-line-soft pb-10 pt-2 lg:pb-16"
          id="work"
        >
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" id="work-heading">
              Work
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-lichen-muted">
              Selected case studies that show judgment, execution, and production-ready craft.
            </p>
          </div>

          {publishedProjects.length > 0 ? (
            <ul className="mt-8 space-y-6">
              {publishedProjects.map((project) => {
                const previewImage =
                project.previewImage && typeof project.previewImage === 'object'
                  ? project.previewImage
                  : null

              const imageUrl =
                previewImage && 'url' in previewImage
                  ? (previewImage.url as string | undefined)
                  : undefined

              return (
                <li key={project.id}>
                  <article
                    className="grid gap-4 rounded-lg border border-line-soft bg-mist-surface p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start lg:grid-cols-[minmax(0,1.8fr)_minmax(10rem,1fr)] lg:p-8"
                    data-testid="project-preview"
                  >
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-semibold tracking-wide text-moss-mark">
                        {project.workType && typeof project.workType === 'string'
                          ? (workTypeLabels[project.workType]?.label ?? project.workType)
                          : ''}
                      </p>
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="text-base leading-7 text-lichen-muted">
                        {project.previewSummary ?? ''}
                      </p>
                      <div>
                        <a
                          className="text-sm font-semibold text-graphite-ink underline decoration-line-soft underline-offset-4 transition-colors hover:text-moss-mark focus-visible:text-moss-mark"
                          href={`/work/${project.id}`}
                        >
                          View case study
                        </a>
                      </div>
                    </div>

                    {imageUrl && (
                      <div className="relative aspect-video w-full max-w-xs overflow-hidden rounded-sm sm:w-40 lg:w-48">
                        <Image
                          alt={previewImage && 'alt' in previewImage ? String(previewImage.alt) : ''}
                          className="object-cover"
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 160px, 192px"
                          src={imageUrl}
                        />
                      </div>
                    )}
                  </article>
                </li>
              )
            })}
            </ul>
          ) : null}
        </section>

        <section
          aria-labelledby="about-heading"
          className="scroll-mt-24 border-b border-line-soft pb-10 pt-2 lg:pb-16"
          id="about"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" id="about-heading">
                About
              </h2>
              <p className="mt-4 text-base leading-7 text-lichen-muted">
                I design and build digital work with a bias toward clarity, sharp decisions, and
                durable implementation.
              </p>
            </div>

            <div className="rounded-lg border border-line-soft bg-mist-surface p-6 lg:p-8">
              <p className="text-base leading-7 text-graphite-ink">
                The first release keeps this concise: professional context first, with room for
                concrete working principles once the Project layer is in place.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="contact-heading" className="scroll-mt-24 pt-2" id="contact">
          <div className="max-w-3xl rounded-lg border border-line-soft bg-mist-surface p-6 lg:p-8">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" id="contact-heading">
              Contact
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-lichen-muted">
              Start a conversation about product work, design, or frontend implementation.
            </p>
            <a
              className="mt-6 inline-block text-base font-semibold text-graphite-ink underline decoration-line-soft underline-offset-4 transition-colors hover:text-moss-mark focus-visible:text-moss-mark"
              href="mailto:hello@example.com"
            >
              hello@example.com
            </a>
          </div>
        </section>
      </main>

      <footer
        className="mx-auto flex w-full max-w-6xl flex-col gap-4 border-t border-line-soft px-6 py-8 text-sm text-lichen-muted lg:px-10"
        role="contentinfo"
      >
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
            <li>
              <a
                className="no-underline transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                href="#work"
              >
                Work
              </a>
            </li>
            <li>
              <a
                className="no-underline transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                href="#about"
              >
                About
              </a>
            </li>
            <li>
              <a
                className="no-underline transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                href="#contact"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <a
          className="w-fit font-semibold text-graphite-ink underline decoration-line-soft underline-offset-4 transition-colors hover:text-moss-mark focus-visible:text-moss-mark"
          href="mailto:hello@example.com"
        >
          hello@example.com
        </a>
        <p className="m-0 text-sm text-lichen-muted">© 2026 Felicio Orlandini</p>
      </footer>
    </div>
  )
}
