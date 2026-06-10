import type { CollectionConfig } from 'payload'

export const AwardCategories: CollectionConfig = {
  slug: 'award-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'programme'],
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
      name: 'programme',
      type: 'relationship',
      relationTo: 'programmes',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'criteria',
      type: 'richText',
      admin: {
        description: 'Judging and eligibility criteria for this category',
      },
    },
  ],
}
