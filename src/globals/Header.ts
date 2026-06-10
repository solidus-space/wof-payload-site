import type { Field, GlobalConfig } from 'payload'

const siteHeaderFields: Field[] = [
  {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'navLinks',
    type: 'array',
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
      },
      {
        name: 'url',
        type: 'text',
        required: true,
      },
    ],
  },
]

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'main',
      label: 'Women of the Future',
      type: 'group',
      fields: [...siteHeaderFields],
    },
    {
      name: 'esg',
      label: '50 Rising Stars in ESG',
      type: 'group',
      fields: [...siteHeaderFields],
    },
    {
      name: 'kindness',
      label: 'Kindness & Leadership',
      type: 'group',
      fields: [...siteHeaderFields],
    },
  ],
}
