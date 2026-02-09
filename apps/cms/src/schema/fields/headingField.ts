import { defineField } from "sanity";

export const headingField = (name: string, title: string, max = 80) =>
  defineField({
    name,
    title,
    type: "string",
    validation: (Rule) => Rule.max(max),
  });
