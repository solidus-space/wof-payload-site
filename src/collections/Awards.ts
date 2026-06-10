import type { CollectionConfig } from 'payload'

export const Awards: CollectionConfig = {
  slug: 'awards',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'region', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "WOF Awards UK 2023" or "50 Leading Lights APAC 2026"',
      },
    },
    {
      name: 'programme',
      type: 'relationship',
      relationTo: 'programmes',
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
    },
    {
      name: 'region',
      type: 'text',
      admin: {
        description: 'e.g. "UK", "Southeast Asia", "Asia Pacific"',
      },
    },
    {
      name: 'headlineSponsor',
      type: 'relationship',
      relationTo: 'sponsors',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Nominations Open', value: 'nominations-open' },
        { label: 'Shortlist Announced', value: 'shortlist' },
        { label: 'Winners Announced', value: 'winners-announced' },
      ],
    },
    {
      name: 'keyDates',
      type: 'array',
      admin: {
        description: 'Nomination timeline, e.g. nominations open/close, judging day, ceremony',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'date',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
      ],
    },
    {
      name: 'nominationFormUrl',
      type: 'text',
    },
  ],
}
