import type { CollectionConfig } from 'payload'
import { validateProjectPublicationFields } from '@/lib/project-validation'

const PUBLISHED_STATUS = 'published'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: ({ req }) => {
      if (req.user) {
        return true
      }

      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        const mergedData = {
          _status: data?._status ?? originalDoc?._status,
          order: data?.order ?? originalDoc?.order,
          previewImage: data?.previewImage ?? originalDoc?.previewImage,
          workType: data?.workType ?? originalDoc?.workType,
          previewSummary: data?.previewSummary ?? originalDoc?.previewSummary,
          framingSummary: data?.framingSummary ?? originalDoc?.framingSummary,
          roleContext: data?.roleContext ?? originalDoc?.roleContext,
          decisions: data?.decisions ?? originalDoc?.decisions,
          outcome: data?.outcome ?? originalDoc?.outcome,
          learning: data?.learning ?? originalDoc?.learning,
        }

        const fieldErrors = validateProjectPublicationFields(mergedData)
        if (fieldErrors.length > 0) {
          throw new Error(fieldErrors[0])
        }

        if (mergedData._status !== PUBLISHED_STATUS) {
          return data
        }

        const duplicateProjects = await req.payload.find({
          collection: 'projects',
          depth: 0,
          limit: 1,
          overrideAccess: true,
          pagination: false,
          where: {
            and: [
              {
                _status: {
                  equals: PUBLISHED_STATUS,
                },
              },
              {
                order: {
                  equals: mergedData.order,
                },
              },
              ...(originalDoc?.id
                ? [
                    {
                      id: {
                        not_equals: originalDoc.id,
                      },
                    },
                  ]
                : []),
            ],
          },
        })

        if (duplicateProjects.docs.length > 0) {
          throw new Error('Published projects must have a unique Editorial Order.')
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'workType',
      type: 'select',
      options: [
        {
          label: 'Shipped',
          value: 'shipped',
        },
        {
          label: 'Speculative',
          value: 'speculative',
        },
      ],
      required: true,
    },
    {
      name: 'previewSummary',
      type: 'textarea',
    },
    {
      name: 'framingSummary',
      type: 'textarea',
    },
    {
      name: 'roleContext',
      type: 'textarea',
    },
    {
      name: 'outcome',
      type: 'textarea',
    },
    {
      name: 'learning',
      type: 'textarea',
    },
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'decisions',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'explanation',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
    },
  ],
}
