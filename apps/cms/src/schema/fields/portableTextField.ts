import { defineField } from "sanity";

export const portableTextField = (name: string, title: string, opts?: { required?: boolean }) =>
  defineField({
    name,
    title,
    type: "array",
    of: [{ type: "block" }],
    validation: (Rule) => (opts?.required ? Rule.required() : Rule),
  });
