import type { CollectionConfig } from 'payload'

export const Schools: CollectionConfig = {
  slug: 'schools',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region'],
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
      name: 'region',
      type: 'text',
      admin: {
        description: 'Location or region, e.g. "London" or "Greater Manchester"',
      },
    },
    {
      name: 'contactName',
      type: 'text',
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'ambassadors',
      type: 'relationship',
      relationTo: 'people',
      hasMany: true,
    },
    {
      name: 'notes',
      type: 'richText',
      admin: {
        description: 'Notes on visits, events and engagement with the school',
      },
    },
  ],
}
