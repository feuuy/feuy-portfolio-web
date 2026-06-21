import path from 'path'
import { Payload } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
export const previewImagePath = path.resolve(dirname, '../fixtures/preview-image.svg')

export async function createPreviewImage(payload: Payload) {
  return payload.create({
    collection: 'media',
    data: {
      alt: 'Project preview image',
    },
    filePath: previewImagePath,
  })
}

export interface PublishedProjectOverrides {
  title?: string
  workType?: 'shipped' | 'speculative'
  previewSummary?: string
  framingSummary?: string
  roleContext?: string
  outcome?: string
  learning?: string
  decisions?: { title: string; explanation: string; id?: string | null }[]
  order?: number
}

export async function createPublishedProject(
  payload: Payload,
  overrides: PublishedProjectOverrides = {},
) {
  const previewImage = await createPreviewImage(payload)

  return payload.create({
    collection: 'projects',
    data: {
      _status: 'published',
      title: overrides.title ?? 'Default Published Project',
      workType: overrides.workType ?? 'shipped',
      previewImage: previewImage.id,
      previewSummary: overrides.previewSummary ?? 'Default preview summary.',
      framingSummary: overrides.framingSummary ?? 'Default framing summary.',
      roleContext: overrides.roleContext ?? 'Default role context.',
      outcome: overrides.outcome ?? 'Default outcome.',
      learning: overrides.learning,
      decisions: overrides.decisions ?? [
        { title: 'Default decision', explanation: 'Default explanation.' },
      ],
      order: overrides.order,
    },
  })
}
