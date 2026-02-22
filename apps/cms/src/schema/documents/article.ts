import { defineArrayMember, defineField, defineType } from "sanity";
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

    defineField({
      type: "datetime",
      name: "publishedAt",
      title: "Published at",
      validation: (Rule) => Rule.required(),
    }),

    imageField("coverImage", "Cover image", { hotspot: true }),

    defineField({
      name: "audio",
      title: "Audio",
      type: "file",
      options: { accept: "audio/*" },
    }),

    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "articleCategory" }],
    }),

    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "partnersSingle" }],
        }),
      ],
    }),

    // body główny
    articleBodyField("body", "Main content"),

    // opcjonalne sekcje, jeśli naprawdę są potrzebne:
    defineField({
      name: "endText",
      title: "End Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      of: [{ type: "block" }],
    }),
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
