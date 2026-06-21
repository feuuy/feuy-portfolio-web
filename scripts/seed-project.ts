import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'

import { getPayloadInstance } from '../src/lib/payload'
import { createPreviewImage, createPublishedProject } from '../tests/fixtures/projects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const previewImagePath = path.resolve(dirname, '../tests/fixtures/preview-image.svg')

async function seed() {
  const payload = await getPayloadInstance()

  const existingProjects = await payload.find({
    collection: 'projects',
    depth: 0,
    limit: 1,
    overrideAccess: true,
  })

  if (existingProjects.docs.length > 0) {
    console.log('Projects already exist. Skipping seed.')
    process.exit(0)
  }

  const previewImage = await createPreviewImage(payload)

  await createPublishedProject(payload, {
    title: 'Example Project',
    workType: 'shipped',
    previewSummary: 'A concise homepage framing line for the first project.',
    framingSummary:
      'This project addressed a real interface challenge where clarity and implementation quality were equally critical.',
    roleContext:
      'I led the interface design and frontend implementation, working closely with a small product team.',
    outcome: 'The shipped work reduced user friction and improved clarity across the primary flow.',
    decisions: [
      {
        title: 'Reduced the interface to one primary decision per screen',
        explanation:
          'The work removed secondary controls from the primary flow so the main action stayed obvious under time pressure.',
      },
      {
        title: 'Paired proof directly with each decision',
        explanation:
          'Each key move is framed with the evidence that shows how it was actually carried through in the product.',
      },
    ],
    order: 1,
  })

  console.log('Seed complete: one published Project created.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
