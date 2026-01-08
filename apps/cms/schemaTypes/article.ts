import {defineType, defineField, defineArrayMember} from 'sanity'

export const article = defineType({
  type: 'document',
  name: 'article',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      options: {source: 'title'},
    }),
    defineField({
      type: 'text',
      name: 'description',
    }),
    defineField({
      type: 'array',
      name: 'body',
      title: 'Main content',
      of: [
        defineArrayMember({
          type: 'block',
        }),
        defineArrayMember({
          type: 'image',
          fields: [
            {
              type: 'string',
              name: 'caption',
            },
          ],
          options: {hotspot: true},
        }),
      ],
    }),
    // defineField({
    //   type: "array",
    //   name: "authors",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [{ type: "author" }],
    //     }),
    //   ],
    // }),
    defineField({
      type: 'datetime',
      name: 'publishedAt',
    }),
    defineField({
      type: 'image',
      name: 'coverImage',
      options: {hotspot: true},
    }),
    // defineField({
    //   type: "array",
    //   name: "topics",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [{ type: "topic" }],
    //     }),
    //   ],
    // }),
    // defineField({
    //   type: "array",
    //   name: "categories",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [{ type: "category" }],
    //     }),
    //   ],
    // }),
    // defineField({
    //   type: "array",
    //   name: "sections",
    //   of: [
    //     defineArrayMember({
    //       type: "section",
    //     }),
    //   ],
    // }),
  ],
})
