import { defineArrayMember, defineField } from "sanity";

export const articleBodyField = (name = "body", title = "Main content") =>
  defineField({
    type: "array",
    name,
    title,
    of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "richImage" })],
    validation: (Rule) => Rule.required().min(1),
  });
