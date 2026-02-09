import { defineField, defineType } from "sanity";
import { urlField } from "../fields";

export const ctaButton = defineType({
  name: "ctaButton",
  title: "CTA Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.max(40),
    }),
    urlField("url", "URL"),
  ],
});
