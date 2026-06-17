import type { CollectionConfig } from 'payload'

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
        const nextStatus = data?._status ?? originalDoc?._status
        const nextOrder = data?.order ?? originalDoc?.order
        const nextPreviewImage = data?.previewImage ?? originalDoc?.previewImage

        if (nextStatus !== PUBLISHED_STATUS || typeof nextOrder !== 'number') {
          if (nextStatus === PUBLISHED_STATUS && !nextPreviewImage) {
            throw new Error('Published projects must include a Preview Image.')
          }

          return data
        }

        if (!nextPreviewImage) {
          throw new Error('Published projects must include a Preview Image.')
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
                  equals: nextOrder,
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
