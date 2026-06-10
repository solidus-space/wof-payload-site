import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'attribution',
    defaultColumns: ['attribution', 'role', 'site'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'attribution',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Role and/or organisation, e.g. "CEO, Unilever"',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'person',
      type: 'relationship',
      relationTo: 'people',
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
      name: 'programmes',
      type: 'relationship',
      relationTo: 'programmes',
      hasMany: true,
    },
  ],
}
