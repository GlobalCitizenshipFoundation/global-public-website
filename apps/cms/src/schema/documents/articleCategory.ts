import { defineField, defineType } from "sanity";

export const articleCategory = defineType({
  name: "articleCategory",
  title: "Article Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
    },
    prepare({ title, subtitle }) {
      const s = typeof subtitle === "string" ? subtitle.trim() : "";
      return {
        title: title || "Category",
        subtitle: s ? (s.length > 60 ? `${s.slice(0, 60)}…` : s) : "",
      };
    },
  },
});
