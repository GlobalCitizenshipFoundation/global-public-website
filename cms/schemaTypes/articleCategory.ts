import {defineType, defineField} from 'sanity'

export const articleCategory = defineType({
  type: 'document',
  name: 'articleCategory',
  fields: [
    defineField({
      type: 'string',
      name: 'Name',
      title: 'name',
    }),
    defineField({
      type: 'array',
      name: 'description',
      title: 'Description',
      of: [{type: 'block'}],
    }),
  ],
})
