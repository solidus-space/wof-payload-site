import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'newsletter',
      type: 'group',
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
          name: 'formActionUrl',
          type: 'text',
          admin: {
            description: 'Mailing list provider form action / signup endpoint',
          },
        },
      ],
    },
    {
      name: 'defaultSeo',
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
    {
      name: 'impactStats',
      type: 'array',
      admin: {
        description: 'Impact statistics shown on the homepage',
      },
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
}
