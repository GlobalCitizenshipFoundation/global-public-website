import { defineField, defineType } from "sanity";
import { imageField } from "../fields/imageField";
import { portableTextField } from "../fields/portableTextField";
import { slugField } from "../fields/slugField";
import { urlField } from "../fields/urlField";

export const magazinSingle = defineType({
  type: "document",
  name: "magazinSingle",
  title: "Publications",

  fieldsets: [
    { name: "identity", title: "Identity", options: { collapsible: true, collapsed: false } },
    { name: "media", title: "Media", options: { collapsible: true, collapsed: false } },
    { name: "content", title: "Content", options: { collapsible: true, collapsed: false } },
    { name: "downloads", title: "Downloads", options: { collapsible: true, collapsed: true } },
  ],

  fields: [
    defineField({
      type: "string",
      title: "Title",
      name: "title",
      fieldset: "identity",
      validation: (Rule) => Rule.required().min(3).max(160),
    }),

    slugField("slug", "Slug", "title"),

    defineField({
      type: "number",
      title: "Issue",
      name: "issue",
      fieldset: "identity",
      validation: (Rule) => Rule.integer().min(1),
      description: "Issue number (integer)",
    }),

    defineField({
      type: "datetime",
      name: "date",
      title: "Date",
      fieldset: "identity",
      validation: (Rule) => Rule.required(),
    }),

    imageField("magazinImage", "Publication Image", { hotspot: true }),

    portableTextField("introText", "Intro Text"),

    defineField({
      type: "string",
      title: "Short Intro",
      name: "shortIntro",
      fieldset: "content",
      validation: (Rule) => Rule.max(240),
      description: "Short teaser used in listings/cards",
    }),

    defineField({
      type: "string",
      title: "Masthead Heading",
      name: "mastheadHeading",
      fieldset: "content",
      validation: (Rule) => Rule.max(120),
    }),

    urlField("downloadPdf", "Download PDF"),
    urlField("downloadEpub", "Download EPUB"),
  ],

  preview: {
    select: {
      title: "title",
      issue: "issue",
      date: "date",
      media: "magazinImage",
    },
    prepare({ title, issue, date, media }) {
      const ymd = typeof date === "string" ? date.slice(0, 10) : "";
      const parts = [typeof issue === "number" ? `Issue ${issue}` : "", ymd ? ymd : ""].filter(
        Boolean,
      );

      return {
        title: title || "Publication",
        subtitle: parts.join(" - "),
        media,
      };
    },
  },
});
