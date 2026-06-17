import path from 'path'
import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { fileURLToPath } from 'url'

import { describe, it, beforeAll, beforeEach, expect } from 'vitest'

let payload: Payload
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const previewImagePath = path.resolve(dirname, '../fixtures/preview-image.svg')

async function createPreviewImage() {
  return payload.create({
    collection: 'media',
    data: {
      alt: 'Project preview image',
    },
    filePath: previewImagePath,
  })
}

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  beforeEach(async () => {
    const projects = await payload.find({
      collection: 'projects',
      draft: true,
      limit: 100,
      overrideAccess: true,
    })

    await Promise.all(
      projects.docs.map((project) =>
        payload.delete({
          collection: 'projects',
          id: project.id,
          overrideAccess: true,
        }),
      ),
    )
  })

  it('fetches users', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
  })

  it('can create and fetch a project', async () => {
    const createdProject = await payload.create({
      collection: 'projects',
      data: {
        title: 'Portfolio Shell',
        workType: 'shipped',
      },
    })

    const fetchedProject = await payload.findByID({
      collection: 'projects',
      id: createdProject.id,
    })

    expect(fetchedProject.title).toBe('Portfolio Shell')
  })

  it('fetches published projects in editorial order', async () => {
    const previewImage = await createPreviewImage()

    await payload.create({
      collection: 'projects',
      data: {
        _status: 'published',
        workType: 'shipped',
        previewImage: previewImage.id,
        title: 'Second Project',
        order: 2,
      },
    })

    await payload.create({
      collection: 'projects',
      data: {
        workType: 'speculative',
        title: 'Draft Project',
        order: 0,
      },
      draft: true,
    })

    await payload.create({
      collection: 'projects',
      data: {
        _status: 'published',
        workType: 'shipped',
        previewImage: previewImage.id,
        title: 'First Project',
        order: 1,
      },
    })

    const projects = await payload.find({
      collection: 'projects',
      overrideAccess: false,
      sort: 'order',
    })

    expect(projects.docs.map(({ title }) => title)).toEqual(['First Project', 'Second Project'])
  })

  it('distinguishes shipped and speculative projects', async () => {
    const shippedProject = await payload.create({
      collection: 'projects',
      data: {
        title: 'Shipped Project',
        workType: 'shipped',
      },
    })

    const speculativeProject = await payload.create({
      collection: 'projects',
      data: {
        title: 'Speculative Project',
        workType: 'speculative',
      },
    })

    expect(shippedProject.workType).toBe('shipped')
    expect(speculativeProject.workType).toBe('speculative')
  })

  it('can create and fetch a project with preview and framing fields', async () => {
    const createdProject = await payload.create({
      collection: 'projects',
      data: {
        title: 'Structured Project',
        workType: 'shipped',
        previewSummary: 'A concise homepage framing line.',
        framingSummary: 'A short case study opening that explains what the project was trying to address.',
        roleContext:
          'I led the interface design and frontend implementation for a shipped internal product tool.',
      },
    })

    const fetchedProject = await payload.findByID({
      collection: 'projects',
      id: createdProject.id,
    })

    expect(fetchedProject.previewSummary).toBe('A concise homepage framing line.')
    expect(fetchedProject.framingSummary).toBe(
      'A short case study opening that explains what the project was trying to address.',
    )
    expect(fetchedProject.roleContext).toBe(
      'I led the interface design and frontend implementation for a shipped internal product tool.',
    )
  })

  it('can create and fetch a project with outcome and learning fields', async () => {
    const shippedProject = await payload.create({
      collection: 'projects',
      data: {
        title: 'Outcome Project',
        workType: 'shipped',
        outcome: 'The shipped work improved clarity for a high-frequency internal workflow.',
      },
    })

    const speculativeProject = await payload.create({
      collection: 'projects',
      data: {
        title: 'Learning Project',
        workType: 'speculative',
        learning: 'The concept clarified how a quieter interaction model could improve focus.',
      },
    })

    const fetchedShippedProject = await payload.findByID({
      collection: 'projects',
      id: shippedProject.id,
    })

    const fetchedSpeculativeProject = await payload.findByID({
      collection: 'projects',
      id: speculativeProject.id,
    })

    expect(fetchedShippedProject.outcome).toBe(
      'The shipped work improved clarity for a high-frequency internal workflow.',
    )
    expect(fetchedSpeculativeProject.learning).toBe(
      'The concept clarified how a quieter interaction model could improve focus.',
    )
  })

  it('can create and fetch a project with structured key decisions', async () => {
    const createdProject = await payload.create({
      collection: 'projects',
      data: {
        title: 'Decision Project',
        workType: 'shipped',
        decisions: [
          {
            title: 'Reduced the interface to one primary decision',
            explanation:
              'The work removed secondary controls from the primary flow so the main action stayed obvious under time pressure.',
          },
          {
            title: 'Paired proof directly with each decision',
            explanation:
              'Each key move is framed with the evidence that shows how it was actually carried through in the product.',
          },
        ],
      },
    })

    const fetchedProject = await payload.findByID({
      collection: 'projects',
      id: createdProject.id,
    })

    expect(fetchedProject.decisions).toHaveLength(2)
    expect(fetchedProject.decisions?.[0]?.title).toBe(
      'Reduced the interface to one primary decision',
    )
    expect(fetchedProject.decisions?.[1]?.explanation).toBe(
      'Each key move is framed with the evidence that shows how it was actually carried through in the product.',
    )
  })

  it('rejects duplicate editorial order for published projects', async () => {
    const previewImage = await createPreviewImage()

    await payload.create({
      collection: 'projects',
      data: {
        _status: 'published',
        title: 'First Published Project',
        workType: 'shipped',
        order: 1,
        previewImage: previewImage.id,
      },
    })

    await expect(
      payload.create({
        collection: 'projects',
        data: {
          _status: 'published',
          title: 'Second Published Project',
          workType: 'shipped',
          order: 1,
          previewImage: previewImage.id,
        },
      }),
    ).rejects.toThrow(/editorial order/i)
  })

  it('can create and fetch a project with a preview image', async () => {
    const previewImage = await createPreviewImage()

    const createdProject = await payload.create({
      collection: 'projects',
      data: {
        title: 'Preview Image Project',
        workType: 'shipped',
        previewImage: previewImage.id,
      },
    })

    const fetchedProject = await payload.findByID({
      collection: 'projects',
      id: createdProject.id,
      depth: 1,
    })

    expect(fetchedProject.previewImage).toBeTruthy()
    expect(typeof fetchedProject.previewImage).toBe('object')
    expect(
      fetchedProject.previewImage && typeof fetchedProject.previewImage === 'object'
        ? fetchedProject.previewImage.alt
        : null,
    ).toBe('Project preview image')
  })

  it('rejects a published project without a preview image', async () => {
    await expect(
      payload.create({
        collection: 'projects',
        data: {
          _status: 'published',
          title: 'Missing Preview Image',
          workType: 'shipped',
        },
      }),
    ).rejects.toThrow(/preview image/i)
  })

  it('allows a draft project without a preview image', async () => {
    const draftProject = await payload.create({
      collection: 'projects',
      data: {
        title: 'Draft Without Preview Image',
        workType: 'speculative',
      },
      draft: true,
    })

    expect(draftProject._status).toBe('draft')
  })
})
