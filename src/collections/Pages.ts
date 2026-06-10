import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'site'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'site',
      type: 'select',
      required: true,
      defaultValue: 'main',
      options: [
        { label: 'Women of the Future', value: 'main' },
        { label: '50 Rising Stars in ESG', value: 'esg' },
        { label: 'Kindness & Leadership', value: 'kindness' },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'subheading',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'richText',
          fields: [
            {
              name: 'content',
              type: 'richText',
            },
          ],
        },
        {
          slug: 'stats',
          fields: [
            {
              name: 'items',
              type: 'array',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'logoGrid',
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'sponsors',
              type: 'relationship',
              relationTo: 'sponsors',
              hasMany: true,
            },
          ],
        },
        {
          slug: 'testimonials',
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'testimonials',
              type: 'relationship',
              relationTo: 'testimonials',
              hasMany: true,
            },
          ],
        },
        {
          slug: 'cta',
          fields: [
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'text',
              type: 'textarea',
            },
            {
              name: 'buttonLabel',
              type: 'text',
            },
            {
              name: 'buttonUrl',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
