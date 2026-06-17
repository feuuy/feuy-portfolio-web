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

  it('fetches published projects with the public homepage query shape', async () => {
    const previewImage = await createPreviewImage()

    await payload.create({
      collection: 'projects',
      data: {
        _status: 'published',
        title: 'Homepage Project 2',
        workType: 'shipped',
        previewSummary: 'Second homepage preview.',
        previewImage: previewImage.id,
        order: 2,
      },
    })

    await payload.create({
      collection: 'projects',
      data: {
        _status: 'published',
        title: 'Homepage Project 1',
        workType: 'speculative',
        previewSummary: 'First homepage preview.',
        previewImage: previewImage.id,
        order: 1,
      },
    })

    const projects = await payload.find({
      collection: 'projects',
      depth: 1,
      overrideAccess: false,
      pagination: false,
      sort: 'order',
    })

    expect(projects.docs).toHaveLength(2)
    expect(projects.docs[0].title).toBe('Homepage Project 1')
    expect(projects.docs[0].workType).toBe('speculative')
    expect(projects.docs[0].previewSummary).toBe('First homepage preview.')
    expect(projects.docs[0].previewImage).toBeTruthy()
    expect(projects.docs[1].title).toBe('Homepage Project 2')
    expect(projects.docs[1].workType).toBe('shipped')
    expect(projects.docs[1].previewSummary).toBe('Second homepage preview.')
  })

  it('fetches a published project by id for a case study', async () => {
    const previewImage = await createPreviewImage()

    const createdProject = await payload.create({
      collection: 'projects',
      data: {
        _status: 'published',
        title: 'Case Study Project',
        workType: 'shipped',
        framingSummary: 'A short opening that explains what this project was trying to address.',
        roleContext: 'I led the interface design for a shipped internal product tool.',
        outcome: 'The shipped work improved clarity across the team.',
        previewImage: previewImage.id,
        decisions: [
          {
            title: 'Reduced the interface to one primary action',
            explanation: 'The work removed noise from the primary flow.',
          },
          {
            title: 'Paired proof directly with each decision',
            explanation: 'Each key move is framed with evidence.',
          },
        ],
        order: 1,
      },
    })

    const fetchedProject = await payload.findByID({
      collection: 'projects',
      id: createdProject.id,
      depth: 1,
      overrideAccess: false,
    })

    expect(fetchedProject.title).toBe('Case Study Project')
    expect(fetchedProject.workType).toBe('shipped')
    expect(fetchedProject.framingSummary).toBe(
      'A short opening that explains what this project was trying to address.',
    )
    expect(fetchedProject.roleContext).toBe(
      'I led the interface design for a shipped internal product tool.',
    )
    expect(fetchedProject.outcome).toBe('The shipped work improved clarity across the team.')
    expect(fetchedProject.decisions).toHaveLength(2)
    expect(fetchedProject.decisions?.[0]?.title).toBe(
      'Reduced the interface to one primary action',
    )
  })

  it('rejects fetching a draft or missing project publicly', async () => {
    const draftProject = await payload.create({
      collection: 'projects',
      data: {
        title: 'Draft Case Study',
        workType: 'shipped',
        order: 1,
      },
      draft: true,
    })

    await expect(
      payload.findByID({
        collection: 'projects',
        id: draftProject.id,
        overrideAccess: false,
      }),
    ).rejects.toThrow()

    await expect(
      payload.findByID({
        collection: 'projects',
        id: 99999,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('provides ordered published projects for next and previous navigation', async () => {
    const previewImage = await createPreviewImage()

    const firstProject = await payload.create({
      collection: 'projects',
      data: {
        _status: 'published',
        title: 'First Published',
        workType: 'shipped',
        previewImage: previewImage.id,
        order: 1,
      },
    })

    const secondProject = await payload.create({
      collection: 'projects',
      data: {
        _status: 'published',
        title: 'Second Published',
        workType: 'shipped',
        previewImage: previewImage.id,
        order: 2,
      },
    })

    const thirdProject = await payload.create({
      collection: 'projects',
      data: {
        _status: 'published',
        title: 'Third Published',
        workType: 'speculative',
        previewImage: previewImage.id,
        order: 3,
      },
    })

    const allProjects = await payload.find({
      collection: 'projects',
      depth: 0,
      overrideAccess: false,
      pagination: false,
      sort: 'order',
    })

    const ids = allProjects.docs.map(({ id }) => id)
    const firstIndex = ids.indexOf(firstProject.id)
    const secondIndex = ids.indexOf(secondProject.id)
    const thirdIndex = ids.indexOf(thirdProject.id)

    expect(firstIndex).toBe(0)
    expect(secondIndex).toBe(1)
    expect(thirdIndex).toBe(2)

    const nextProjectId = ids[firstIndex + 1]
    const prevProjectId = ids[thirdIndex - 1]

    expect(nextProjectId).toBe(secondProject.id)
    expect(prevProjectId).toBe(secondProject.id)
  })
})
