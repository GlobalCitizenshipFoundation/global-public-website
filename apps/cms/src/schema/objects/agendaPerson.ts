import { defineField, defineType } from "sanity";

export const agendaPerson = defineType({
  name: "agendaPerson",
  title: "Agenda Person",
  type: "object",
  fields: [
    defineField({
      name: "person",
      title: "Person",
      type: "reference",
      to: [{ type: "contributorSingle" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "person.name", media: "person.photo" },
    prepare({ title, media }) {
      return { title: title || "Person", media };
    },
  },
});
