import { defineType, defineField, defineArrayMember } from 'sanity'

export const author = defineType({
  type: "document",
  name: "author",
  fields: [
    defineField({
      type: "string",
      name: "name",
    }),
    defineField({
      type: "slug",
      name: "slug",
      options: { source: "name" },
    }),
    defineField({
      type: "text",
      name: "bio",
    }),
    defineField({
      type: "image",
      name: "image",
      options: { hotspot: true },
    }),
    defineField({
      type: "array",
      name: "articles",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }],
        }),
      ],
    }),
  ],
});

