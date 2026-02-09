import { defineField, defineType } from "sanity";

export const venueLocation = defineType({
  name: "venueLocation",
  title: "Venue Location",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Place name (optional)",
      type: "string",
      validation: (Rule) => Rule.max(80),
      description: "e.g. New York University",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.min(5).max(200), // required enforced in eventSingle
      description: "e.g. 70 Washington Square South, New York, NY 10012, United States",
    }),
    defineField({
      name: "mapUrl",
      title: "Map URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"], allowRelative: false }),
      description: "Google Maps / OpenStreetMap link",
    }),
  ],
  preview: {
    select: { title: "label", address: "address" },
    prepare({ title, address }: { title?: string; address?: string }) {
      return { title: title || "Venue", subtitle: address || "" };
    },
  },
});
