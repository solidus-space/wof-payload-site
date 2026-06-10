import type { CollectionConfig } from 'payload'

export const People: CollectionConfig = {
  slug: 'people',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'organisation'],
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
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Winner', value: 'winner' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Judge', value: 'judge' },
        { label: 'Supporter / Patron', value: 'supporter' },
        { label: 'Ambassador', value: 'ambassador' },
        { label: 'Team', value: 'team' },
      ],
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        description: 'Job title or role, e.g. "CEO" or "Founder"',
      },
    },
    {
      name: 'organisation',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: false,
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'X / Twitter', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Website', value: 'website' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'awardEntries',
      type: 'array',
      admin: {
        description: 'Award editions this person won or was shortlisted in',
      },
      fields: [
        {
          name: 'award',
          type: 'relationship',
          relationTo: 'awards',
          required: true,
        },
        {
          name: 'year',
          type: 'text',
          required: true,
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'award-categories',
        },
        {
          name: 'result',
          type: 'select',
          options: [
            { label: 'Winner', value: 'winner' },
            { label: 'Shortlisted', value: 'shortlisted' },
          ],
        },
      ],
    },
  ],
}
