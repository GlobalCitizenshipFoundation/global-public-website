import { defineField, defineType } from "sanity";
import { articleBodyField } from "../fields/articleBodyField";
import { imageField } from "../fields/imageField";
import { slugField } from "../fields/slugField";

export const article = defineType({
  type: "document",
  name: "article",
  title: "Articles",

  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Title",
      validation: (Rule) => Rule.required().min(5).max(160),
    }),

    slugField("slug", "Slug", "title"),

    defineField({
      type: "text",
      name: "description",
      title: "Description",
      rows: 3,
      validation: (Rule) => Rule.max(500),
    }),

    articleBodyField("body", "Main content"),

    defineField({
      type: "datetime",
      name: "publishedAt",
      title: "Published at",
      validation: (Rule) => Rule.required(),
    }),

    imageField("coverImage", "Cover image", { hotspot: true }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      const date = typeof subtitle === "string" ? subtitle.slice(0, 10) : "";
      return {
        title: title || "Article",
        subtitle: date ? `Published: ${date}` : "",
        media,
      };
    },
  },
});
