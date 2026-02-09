import { defineField, defineType } from "sanity";
import { imageField } from "../fields/imageField";
import { portableTextField } from "../fields/portableTextField";
import { slugField } from "../fields/slugField";
import { urlField } from "../fields/urlField";
import countryOptions from "../utils/countryOptions";

export const partnersSingle = defineType({
  type: "document",
  name: "partnersSingle",
  title: "Partners",

  fieldsets: [
    { name: "media", title: "Media", options: { collapsible: true, collapsed: false } },
    { name: "identity", title: "Identity", options: { collapsible: true, collapsed: false } },
    { name: "content", title: "Content", options: { collapsible: true, collapsed: false } },
    { name: "links", title: "Links", options: { collapsible: true, collapsed: true } },
    { name: "quote", title: "Quote", options: { collapsible: true, collapsed: true } },
  ],

  fields: [
    imageField("headerImage", "Header Image", { hotspot: true }),
    imageField("logo", "Logo", { hotspot: true, required: true }),

    defineField({
      type: "string",
      name: "country",
      title: "Country",
      fieldset: "identity",
      options: { list: countryOptions, layout: "dropdown" },
    }),

    defineField({
      type: "string",
      title: "Title",
      name: "title",
      fieldset: "identity",
      validation: (Rule) => Rule.required().min(2).max(160),
    }),

    slugField("slug", "Slug", "title"),

    defineField({
      type: "text",
      name: "shortDescription",
      title: "Short Description",
      fieldset: "content",
      rows: 3,
      validation: (Rule) => Rule.max(500),
    }),

    portableTextField("body", "Body"),

    // Socials/website - jako URL, nie string
    urlField("twitter", "Twitter / X URL"),
    urlField("instagram", "Instagram URL"),
    urlField("facebook", "Facebook URL"),
    urlField("youtube", "YouTube URL"),
    urlField("linkedin", "LinkedIn URL"),

    defineField({
      type: "string",
      name: "websiteText",
      title: "Website Text",
      fieldset: "links",
      validation: (Rule) => Rule.max(120),
      description: 'Label for the website link, e.g. "Visit website"',
    }),

    urlField("websiteUrl", "Website URL"),

    defineField({
      type: "string",
      title: "Quote text and profile",
      name: "quote",
      fieldset: "quote",
      validation: (Rule) => Rule.max(240),
    }),

    urlField("partnerProfile", "Partner Profile URL"),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "country",
      media: "logo",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Partner",
        subtitle: subtitle || "",
        media,
      };
    },
  },
});
