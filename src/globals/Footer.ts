import type { Field, GlobalConfig } from 'payload'

const siteFooterFields: Field[] = [
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
  {
    name: 'socialLinks',
    type: 'array',
    fields: [
      {
        name: 'platform',
        type: 'select',
        required: true,
        options: [
          { label: 'LinkedIn', value: 'linkedin' },
          { label: 'X / Twitter', value: 'twitter' },
          { label: 'Instagram', value: 'instagram' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'YouTube', value: 'youtube' },
        ],
      },
      {
        name: 'url',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    name: 'legalText',
    type: 'textarea',
  },
]

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'main',
      label: 'Women of the Future',
      type: 'group',
      fields: [...siteFooterFields],
    },
    {
      name: 'esg',
      label: '50 Rising Stars in ESG',
      type: 'group',
      fields: [...siteFooterFields],
    },
    {
      name: 'kindness',
      label: 'Kindness & Leadership',
      type: 'group',
      fields: [...siteFooterFields],
    },
  ],
}
