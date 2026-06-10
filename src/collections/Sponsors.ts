import type { CollectionConfig } from 'payload'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tier', 'website'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'tier',
      type: 'select',
      options: [
        { label: 'Headline', value: 'headline' },
        { label: 'Sponsor', value: 'sponsor' },
        { label: 'In Association With', value: 'association' },
        { label: 'Educational Partner', value: 'educational' },
        { label: 'Media Partner', value: 'media' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'programmes',
      type: 'relationship',
      relationTo: 'programmes',
      hasMany: true,
    },
  ],
}
