import { defineType, defineField, defineArrayMember } from 'sanity'

export const issueTest = defineType({
  type: "document",
  name: "issueTest",
  fields: [
    defineField({
      type: "array",
      name: "authors",
      of: [
        defineArrayMember({
          type: "reference",
          to: [
            { type: "topic" },
            { type: "author" },
          ],
        }),
      ],
    }),
    defineField({
      type: "string",
      name: "test",
    }),
    defineField({
      type: "string",
      name: "title",
    }),
    defineField({
      type: "slug",
      name: "slug",
      options: { source: "title" },
    }),
    defineField({
      type: "text",
      name: "description",
    }),
    defineField({
      type: "number",
      name: "edition",
    }),
    defineField({
      type: "datetime",
      name: "publishedAt",
    }),
    defineField({
      type: "image",
      name: "coverImage",
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
    defineField({
      type: "array",
      name: "topics",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "topic" }],
        }),
      ],
    }),
    defineField({
      type: "array",
      name: "categories",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "category" }],
        }),
      ],
    }),
  ],
});

