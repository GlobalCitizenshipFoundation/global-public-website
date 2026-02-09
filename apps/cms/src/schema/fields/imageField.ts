import { defineField } from "sanity";

export const imageField = (
  name: string,
  title: string,
  opts?: { hotspot?: boolean; required?: boolean },
) =>
  defineField({
    type: "image",
    name,
    title,
    options: { hotspot: opts?.hotspot ?? true },
    validation: (Rule) => (opts?.required ? Rule.required() : Rule),
  });
