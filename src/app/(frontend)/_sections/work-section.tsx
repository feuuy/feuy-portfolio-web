import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatWorkType } from '../_lib/work-type-labels'
import type { Project } from '@/lib/project-repository'

interface WorkSectionProps {
  projects: Project[]
}

export default function WorkSection({ projects }: WorkSectionProps) {
  return (
    <section
      aria-labelledby="work-heading"
      className="scroll-mt-24 px-6 py-32 lg:px-12 lg:py-40"
      id="work"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 text-sm font-medium tracking-[0.12em] uppercase text-moss-mark">
            Selected Work
          </p>
          <h2
            className="text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-architectural-white"
            id="work-heading"
          >
            Case studies
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.6] text-lichen-muted">
            Projects that show judgment, execution, and production-ready craft.
          </p>
        </div>

        {projects.length > 0 ? (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => {
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
                    className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-line-soft/40 bg-mist-surface/50 p-6 transition-all duration-500 hover:border-line-soft/80 hover:bg-mist-surface/80 sm:p-8"
                    data-testid="project-preview"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {imageUrl && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                        <Image
                          alt={previewImage && 'alt' in previewImage ? String(previewImage.alt) : ''}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          src={imageUrl}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-graphite-ink/60 via-transparent to-transparent" />
                      </div>
                    )}

                    <div className="flex flex-col gap-3">
                      <p className="text-xs font-semibold tracking-[0.08em] uppercase text-moss-mark">
                        {formatWorkType(project.workType)}
                      </p>
                      <h3 className="text-balance text-xl font-semibold tracking-tight text-architectural-white sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="text-base leading-[1.6] text-lichen-muted">
                        {project.previewSummary ?? ''}
                      </p>
                      <div className="pt-2">
                        <Link
                          className="inline-flex items-center gap-2 text-sm font-semibold text-architectural-white no-underline transition-colors hover:text-moss-mark focus-visible:text-moss-mark focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
                          href={`/work/${project.id}`}
                        >
                          View case study
                          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="max-w-2xl rounded-2xl border border-line-soft/40 bg-mist-surface/50 p-8 lg:p-12">
            <p className="text-sm font-medium tracking-[0.08em] uppercase text-moss-mark">
              Coming soon
            </p>
            <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-architectural-white">
              Case studies in progress
            </h3>
            <p className="mt-4 max-w-prose text-base leading-[1.6] text-lichen-muted">
              A curated selection of case studies is being assembled for this page. Reach out directly for recent work samples and project details.
            </p>
            <a
              className="mt-6 inline-block rounded-full bg-moss-mark px-8 py-4 text-sm font-semibold text-graphite-ink no-underline transition-transform hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-moss-mark/50 focus-visible:ring-offset-[4px] focus-visible:ring-offset-graphite-ink"
              href="#contact"
            >
              Get in touch
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
