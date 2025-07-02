import { defineType, defineField, defineArrayMember } from 'sanity'

export const section = defineType({
  type: "document",
  name: "section",
  fields: [
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

