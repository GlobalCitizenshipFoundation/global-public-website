import {defineType, defineField, defineArrayMember} from 'sanity'

export const magazinSingle = defineType({
  type: 'document',
  name: 'magazinSingle',
  fields: [
    defineField({
      type: 'string',
      title: 'Title',
      name: 'title',
    }),
    defineField({
      type: 'slug',
      title: 'Slug',
      name: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      type: 'number',
      title: 'issue',
      name: 'issue',
    }),
    defineField({
      type: 'image',
      title: 'Magazin Image',
      name: 'magazinImage',
      options: {hotspot: true},
    }),
    defineField({
      type: 'array',
      title: 'Intro Text',
      name: 'introText',
      of: [{type: 'block'}],
    }),
    defineField({
      type: 'string',
      title: 'Short Intro',
      name: 'shortIntro',
    }),
    defineField({
      type: 'datetime',
      name: 'date',
      title: 'Date',
    }),
    defineField({
      type: 'url',
      name: 'downloadPdf',
      title: 'Download pdf',
    }),
    defineField({
      type: 'url',
      name: 'downloadEpub',
      title: 'Download Epub',
    }),
    defineField({
      type: 'string',
      title: 'Masthead Heading',
      name: 'mastheadHeading',
    }),
  ],
})
