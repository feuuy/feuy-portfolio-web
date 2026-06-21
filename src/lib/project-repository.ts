import { cache } from 'react'
import { getPayloadInstance } from './payload'

export interface Project {
  id: number
  title: string
  workType: string
  previewSummary?: string
  framingSummary?: string
  roleContext?: string
  outcome?: string
  learning?: string
  previewImage?: unknown
  decisions?: unknown[]
  order?: number
}

export interface FindPublishedOptions {
  sort?: string
  depth?: number
}

/**
 * Finds all published projects with optional sorting.
 * Defaults to sorting by editorial order.
 * Cached per-request to avoid duplicate database queries.
 */
export const findPublishedProjects = cache(async (options: FindPublishedOptions = {}): Promise<Project[]> => {
  const payload = await getPayloadInstance()

  const result = await payload.find({
    collection: 'projects',
    depth: options.depth ?? 1,
    overrideAccess: false,
    pagination: false,
    sort: options.sort ?? 'order',
  })

  return result.docs as Project[]
})

/**
 * Finds a single published project by ID.
 * Returns null if not found or not published.
 * Cached per-request to avoid duplicate database queries.
 */
export const findProjectById = cache(async (id: number): Promise<Project | null> => {
  const payload = await getPayloadInstance()

  try {
    const result = await payload.findByID({
      collection: 'projects',
      id,
      depth: 1,
      overrideAccess: false,
    })

    return result as Project
  } catch {
    return null
  }
})

/**
 * Returns all published project IDs in editorial order.
 * Cached per-request to avoid duplicate database queries.
 */
export const getOrderedProjectIds = cache(async (): Promise<number[]> => {
  const payload = await getPayloadInstance()

  const result = await payload.find({
    collection: 'projects',
    depth: 0,
    overrideAccess: false,
    pagination: false,
    sort: 'order',
  })

  return result.docs.map((p) => p.id as number)
})
