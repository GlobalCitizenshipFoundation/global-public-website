import { defineField } from "sanity";

export const slugField = (name: string, title: string, source: string) =>
  defineField({
    type: "slug",
    name,
    title,
    options: { source, maxLength: 96 },
    validation: (Rule) => Rule.required(),
  });
