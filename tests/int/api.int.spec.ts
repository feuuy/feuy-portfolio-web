import { Payload } from 'payload'
import { getPayloadInstance } from '@/lib/payload'

import { createPreviewImage, createPublishedProject } from '../fixtures/projects'

import { describe, it, beforeAll, beforeEach, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    payload = await getPayloadInstance()
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
    await createPublishedProject(payload, { title: 'Second Project', order: 2 })

    await payload.create({
      collection: 'projects',
      data: {
        workType: 'speculative',
        title: 'Draft Project',
        order: 0,
      },
      draft: true,
    })

    await createPublishedProject(payload,{ title: 'First Project', order: 1 })

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
    await createPublishedProject(payload,{ title: 'First Published Project', order: 1 })

    await expect(
      createPublishedProject(payload, { title: 'Second Published Project', order: 1 }),
    ).rejects.toThrow(/editorial order/i)
  })

  it('can create and fetch a project with a preview image', async () => {
    const previewImage = await createPreviewImage(payload)

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
    await createPublishedProject(payload,{
      title: 'Homepage Project 2',
      workType: 'shipped',
      previewSummary: 'Second homepage preview.',
      order: 2,
    })

    await createPublishedProject(payload,{
      title: 'Homepage Project 1',
      workType: 'speculative',
      previewSummary: 'First homepage preview.',
      learning: 'Default learning.',
      order: 1,
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
    const createdProject = await createPublishedProject(payload,{
      title: 'Case Study Project',
      framingSummary: 'A short opening that explains what this project was trying to address.',
      roleContext: 'I led the interface design for a shipped internal product tool.',
      outcome: 'The shipped work improved clarity across the team.',
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
    const firstProject = await createPublishedProject(payload,{
      title: 'First Published',
      order: 1,
    })

    const secondProject = await createPublishedProject(payload,{
      title: 'Second Published',
      order: 2,
    })

    const thirdProject = await createPublishedProject(payload,{
      title: 'Third Published',
      workType: 'speculative',
      learning: 'Default learning.',
      order: 3,
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

  it('rejects a published project without preview summary', async () => {
    const previewImage = await createPreviewImage(payload)

    await expect(
      payload.create({
        collection: 'projects',
        data: {
          _status: 'published',
          title: 'Missing Preview Summary',
          workType: 'shipped',
          previewImage: previewImage.id,
          framingSummary: 'Has framing but no preview.',
          roleContext: 'Has role context.',
          outcome: 'Has outcome.',
          decisions: [{ title: 'A decision', explanation: 'An explanation.' }],
          order: 1,
        },
      }),
    ).rejects.toThrow(/preview summary/i)
  })

  it('rejects a published project without framing summary', async () => {
    const previewImage = await createPreviewImage(payload)

    await expect(
      payload.create({
        collection: 'projects',
        data: {
          _status: 'published',
          title: 'Missing Framing Summary',
          workType: 'shipped',
          previewImage: previewImage.id,
          previewSummary: 'Has preview.',
          roleContext: 'Has role context.',
          outcome: 'Has outcome.',
          decisions: [{ title: 'A decision', explanation: 'An explanation.' }],
          order: 2,
        },
      }),
    ).rejects.toThrow(/framing summary/i)
  })

  it('rejects a published project without role context', async () => {
    const previewImage = await createPreviewImage(payload)

    await expect(
      payload.create({
        collection: 'projects',
        data: {
          _status: 'published',
          title: 'Missing Role Context',
          workType: 'shipped',
          previewImage: previewImage.id,
          previewSummary: 'Has preview.',
          framingSummary: 'Has framing.',
          outcome: 'Has outcome.',
          decisions: [{ title: 'A decision', explanation: 'An explanation.' }],
          order: 3,
        },
      }),
    ).rejects.toThrow(/role context/i)
  })

  it('rejects a published project without at least one decision', async () => {
    const previewImage = await createPreviewImage(payload)

    await expect(
      payload.create({
        collection: 'projects',
        data: {
          _status: 'published',
          title: 'Missing Decisions',
          workType: 'shipped',
          previewImage: previewImage.id,
          previewSummary: 'Has preview.',
          framingSummary: 'Has framing.',
          roleContext: 'Has role context.',
          outcome: 'Has outcome.',
          decisions: [],
          order: 4,
        },
      }),
    ).rejects.toThrow(/at least one decision/i)
  })

  it('rejects a published shipped project without an outcome', async () => {
    const previewImage = await createPreviewImage(payload)

    await expect(
      payload.create({
        collection: 'projects',
        data: {
          _status: 'published',
          title: 'Shipped Without Outcome',
          workType: 'shipped',
          previewImage: previewImage.id,
          previewSummary: 'Has preview.',
          framingSummary: 'Has framing.',
          roleContext: 'Has role context.',
          decisions: [{ title: 'A decision', explanation: 'An explanation.' }],
          order: 5,
        },
      }),
    ).rejects.toThrow(/outcome/i)
  })

  it('rejects a published speculative project without learning', async () => {
    const previewImage = await createPreviewImage(payload)

    await expect(
      payload.create({
        collection: 'projects',
        data: {
          _status: 'published',
          title: 'Speculative Without Learning',
          workType: 'speculative',
          previewImage: previewImage.id,
          previewSummary: 'Has preview.',
          framingSummary: 'Has framing.',
          roleContext: 'Has role context.',
          decisions: [{ title: 'A decision', explanation: 'An explanation.' }],
          order: 6,
        },
      }),
    ).rejects.toThrow(/learning/i)
  })
})
