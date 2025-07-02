import { defineType, defineField } from 'sanity'

export const topic = defineType({
  type: "document",
  name: "topic",
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
  ],
});

