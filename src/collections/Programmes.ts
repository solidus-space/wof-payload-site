import type { CollectionConfig } from 'payload'

export const Programmes: CollectionConfig = {
  slug: 'programmes',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'externalUrl'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'strapline',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        description: 'Link to the programme microsite, if it lives on its own domain',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Controls display order on the connected programmes grid',
      },
    },
    {
      name: 'sponsors',
      type: 'relationship',
      relationTo: 'sponsors',
      hasMany: true,
    },
  ],
}
