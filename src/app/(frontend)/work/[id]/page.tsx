import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'

import { findProjectById, getOrderedProjectIds } from '@/lib/project-repository'
import { formatWorkType, getWorkTypeTooltip } from '../../_lib/work-type-labels'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = await findProjectById(Number(id))

  if (!project) {
    return { title: 'Not Found' }
  }

  const description = project.previewSummary ?? project.framingSummary ?? undefined
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    title: `${project.title} — FEUY`,
    description: description as string | undefined,
    openGraph: {
      title: `${project.title} — FEUY`,
      description: description as string | undefined,
      type: 'article',
      url: `${baseUrl}/work/${project.id}`,
      images: [
        {
          url: project.previewImage && typeof project.previewImage === 'object' && 'url' in project.previewImage
            ? String(project.previewImage.url)
            : `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — FEUY`,
      description: description as string | undefined,
      images: [
        project.previewImage && typeof project.previewImage === 'object' && 'url' in project.previewImage
          ? String(project.previewImage.url)
          : `${baseUrl}/og-image.png`,
      ],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const numericId = Number(id)

  const project = await findProjectById(numericId)

  if (!project) {
    notFound()
  }

  const orderedIds = await getOrderedProjectIds()
  const currentIndex = orderedIds.indexOf(numericId)
  const nextProjectId = currentIndex >= 0 ? orderedIds[currentIndex + 1] : undefined
  const prevProjectId = currentIndex > 0 ? orderedIds[currentIndex - 1] : undefined

  const workType = project.workType as string | undefined
  const label = formatWorkType(workType)

  const decisions = project.decisions as
    | { id?: string | null; title?: string | null; explanation?: string | null }[]
    | undefined

  const closingContent =
    workType === 'shipped' ? (project.outcome as string | undefined) : (project.learning as string | undefined)
  const closingLabel = workType === 'shipped' ? 'Outcome' : 'Learning'

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-16 pt-12 lg:px-12 lg:pb-24" id="main-content">
        <div className="max-w-3xl">
          <Link
            className="inline-flex items-center gap-2 text-sm text-lichen-muted underline decoration-line-soft/60 underline-offset-4 transition-colors hover:text-architectural-white focus-visible:text-architectural-white"
            href="/#work"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Work
          </Link>
        </div>

        <article className="grid gap-12 lg:gap-16">
          <header className="grid gap-6 border-b border-line-soft/40 pb-12">
            {label && (
              <p className="text-xs font-semibold tracking-[0.08em] uppercase text-moss-mark" title={getWorkTypeTooltip(workType)}>{label}</p>
            )}
            <h1 className="text-balance text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em] text-architectural-white">
              {project.title}
            </h1>
          </header>

          {(project.framingSummary || project.roleContext) && (
            <section className="max-w-3xl space-y-6">
              {project.framingSummary && (
                <p className="text-lg leading-[1.6] text-architectural-white">
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
            <section className="grid gap-6">
              {decisions.map((decision, idx) => (
                <div
                  key={decision.id ?? idx}
                  className="rounded-2xl border border-line-soft/40 bg-mist-surface/50 p-6 lg:p-8"
                >
                  <h2 className="text-balance text-xl font-semibold tracking-tight text-architectural-white">
                    {decision.title ?? ''}
                  </h2>
                  {decision.explanation && (
                    <p className="mt-4 text-base leading-[1.6] text-lichen-muted">
                      {decision.explanation}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {closingContent && (
            <section className="max-w-3xl rounded-2xl border border-line-soft/40 bg-mist-surface/50 p-6 lg:p-8">
              <h2 className="text-balance text-xl font-semibold tracking-tight text-architectural-white">
                {closingLabel}
              </h2>
              <p className="mt-4 text-base leading-[1.6] text-lichen-muted">{closingContent}</p>
            </section>
          )}

          <div className="max-w-3xl pt-8">
            <p className="text-lg leading-[1.6] text-architectural-white">
              Start a conversation about product work, design, or frontend implementation.
            </p>
            <Link
              className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-architectural-white no-underline transition-colors hover:text-moss-mark focus-visible:text-moss-mark"
              href="/#contact"
            >
              Get in touch
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </article>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line-soft/40 pt-8 text-sm text-lichen-muted">
          <div className="flex items-center gap-4">
            {prevProjectId ? (
              <Link
                className="inline-flex items-center gap-2 underline decoration-line-soft/60 underline-offset-4 transition-colors hover:text-architectural-white focus-visible:text-architectural-white"
                href={`/work/${prevProjectId}`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Previous
              </Link>
            ) : (
              <span className="text-lichen-muted/50">Previous</span>
            )}
          </div>
          <div className="flex items-center gap-6">
            <Link
              className="underline decoration-line-soft/60 underline-offset-4 transition-colors hover:text-architectural-white focus-visible:text-architectural-white"
              href="/#work"
            >
              All work
            </Link>
            <Link
              className="underline decoration-line-soft/60 underline-offset-4 transition-colors hover:text-architectural-white focus-visible:text-architectural-white"
              href="/#contact"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {nextProjectId ? (
              <Link
                className="inline-flex items-center gap-2 underline decoration-line-soft/60 underline-offset-4 transition-colors hover:text-architectural-white focus-visible:text-architectural-white"
                href={`/work/${nextProjectId}`}
              >
                Next
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ) : (
              <span className="text-lichen-muted/50">Next</span>
            )}
          </div>
        </div>
      </main>
  )
}
