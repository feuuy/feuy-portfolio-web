import { getPayload } from 'payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'

import config from '@/payload.config'

const workTypeLabels: Record<string, { value: string; label: string }> = {
  shipped: { value: 'shipped', label: 'Shipped' },
  speculative: { value: 'speculative', label: 'Speculative' },
}

async function getProject(id: number) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    return await payload.findByID({
      collection: 'projects',
      id,
      depth: 1,
      overrideAccess: false,
    })
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = await getProject(Number(id))

  if (!project) {
    return { title: 'Not Found' }
  }

  const description = project.previewSummary ?? project.framingSummary ?? undefined

  return {
    title: `${project.title} — FEUY Portfolio`,
    description: description as string | undefined,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const numericId = Number(id)
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const project = await getProject(numericId)

  if (!project) {
    notFound()
  }

  const orderedProjects = await payload.find({
    collection: 'projects',
    depth: 0,
    overrideAccess: false,
    pagination: false,
    sort: 'order',
  })

  const orderedIds = orderedProjects.docs.map((p) => p.id)
  const currentIndex = orderedIds.indexOf(numericId)
  const nextProjectId = currentIndex >= 0 ? orderedIds[currentIndex + 1] : undefined
  const prevProjectId = currentIndex > 0 ? orderedIds[currentIndex - 1] : undefined

  const workType = project.workType as string | undefined
  const label = workType ? (workTypeLabels[workType]?.label ?? workType) : ''

  const decisions = project.decisions as
    | { id?: string | null; title?: string | null; explanation?: string | null }[]
    | undefined

  const closingContent =
    workType === 'shipped' ? (project.outcome as string | undefined) : (project.learning as string | undefined)
  const closingLabel = workType === 'shipped' ? 'Outcome' : 'Learning'

  return (
    <div className="bg-architectural-white text-graphite-ink">
      <header
        className="sticky top-0 z-10 border-b border-line-soft bg-architectural-white/95"
        role="banner"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <Link className="text-base font-semibold tracking-tight text-graphite-ink no-underline" href="/#top">
            Felicio Orlandini
          </Link>
          <nav aria-label="Primary">
            <ul className="flex items-center gap-4 text-sm text-lichen-muted sm:gap-6">
              <li>
                <Link
                  className="no-underline transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                  href="/#work"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  className="no-underline transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                  href="/#about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="no-underline transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                  href="/#contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 pt-8 lg:px-10 lg:pb-24">
        <div className="max-w-3xl">
          <Link
            className="text-sm text-lichen-muted underline decoration-line-soft underline-offset-4 transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
            href="/#work"
          >
            Back to Work
          </Link>
        </div>

        <article className="grid gap-8 lg:gap-10">
          <header className="grid gap-4 border-b border-line-soft pb-8">
            {label && (
              <p className="text-sm font-semibold tracking-wide text-moss-mark">{label}</p>
            )}
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
          </header>

          {(project.framingSummary || project.roleContext) && (
            <section className="max-w-3xl space-y-4">
              {project.framingSummary && (
                <p className="text-base leading-7 text-lichen-muted">
                  {project.framingSummary as string}
                </p>
              )}
              {project.roleContext && (
                <p className="text-sm leading-6 text-lichen-muted">
                  {project.roleContext as string}
                </p>
              )}
            </section>
          )}

          {decisions && decisions.length > 0 && (
            <section className="grid gap-8">
              {decisions.map((decision, idx) => (
                <div
                  key={decision.id ?? idx}
                  className="rounded-lg border border-line-soft bg-mist-surface p-6 lg:p-8"
                >
                  <h2 className="text-lg font-semibold tracking-tight text-graphite-ink">
                    {decision.title ?? ''}
                  </h2>
                  {decision.explanation && (
                    <p className="mt-3 text-base leading-7 text-lichen-muted">
                      {decision.explanation}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {closingContent && (
            <section className="max-w-3xl rounded-lg border border-line-soft bg-mist-surface p-6 lg:p-8">
              <h2 className="text-lg font-semibold tracking-tight text-graphite-ink">
                {closingLabel}
              </h2>
              <p className="mt-3 text-base leading-7 text-lichen-muted">{closingContent}</p>
            </section>
          )}

          <div className="max-w-3xl pt-4">
            <p className="text-base leading-7 text-lichen-muted">
              Start a conversation about product work, design, or frontend implementation.
            </p>
            <Link
              className="mt-3 inline-block text-base font-semibold text-graphite-ink underline decoration-line-soft underline-offset-4 transition-colors hover:text-moss-mark focus-visible:text-moss-mark"
              href="/#contact"
            >
              Get in touch
            </Link>
          </div>
        </article>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-6 text-sm text-lichen-muted">
          <div className="flex items-center gap-4">
            {prevProjectId ? (
              <Link
                className="underline decoration-line-soft underline-offset-4 transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                href={`/work/${prevProjectId}`}
              >
                Previous project
              </Link>
            ) : (
              <span className="text-lichen-muted/50">Previous project</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="underline decoration-line-soft underline-offset-4 transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
              href="/#work"
            >
              Back to Work
            </Link>
            <Link
              className="underline decoration-line-soft underline-offset-4 transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
              href="/#contact"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {nextProjectId ? (
              <Link
                className="underline decoration-line-soft underline-offset-4 transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                href={`/work/${nextProjectId}`}
              >
                Next project
              </Link>
            ) : (
              <span className="text-lichen-muted/50">Next project</span>
            )}
          </div>
        </div>
      </main>

      <footer
        aria-labelledby="contact-heading"
        className="mx-auto flex w-full max-w-6xl flex-col gap-4 border-t border-line-soft px-6 py-8 text-sm text-lichen-muted lg:px-10"
        role="contentinfo"
      >
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
            <li>
              <Link
                className="no-underline transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                href="/#work"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                className="no-underline transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                href="/#about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="no-underline transition-colors hover:text-graphite-ink focus-visible:text-graphite-ink"
                href="/#contact"
              >
                Contact
              </Link>
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
