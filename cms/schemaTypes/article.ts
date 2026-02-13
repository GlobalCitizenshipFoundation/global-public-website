import {defineType, defineField, defineArrayMember} from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'articleHeading',
      title: 'Article Heading',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'articleHeading',
        maxLength: 96,
      },
    },
    {
      name: 'articleImage',
      title: 'Article Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'readingLength',
      title: 'Reading Length',
      type: 'number',
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }], // Możesz zmienić na obiekt autora, jeśli potrzebujesz więcej danych
    },
    {
      name: 'disclosureStatement',
      title: 'Disclosure Statement',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'partnersSingle'}],
        }),
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'articleCategory'}],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'endText',
      title: 'End Text',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
})
