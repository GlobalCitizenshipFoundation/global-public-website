import { defineArrayMember, defineField, defineType } from "sanity";
import { portableTextField } from "../fields/portableTextField";

import { urlField } from "../fields/urlField";
import countryOptions from "../utils/countryOptions";
import { hexColorValidation } from "../validation/hexColorValidation";

type Ref = {
  _ref: string;
  _type: "reference";
};

function isRef(value: unknown): value is Ref {
  return (
    typeof value === "object" &&
    value !== null &&
    "_ref" in value &&
    typeof (value as { _ref?: unknown })._ref === "string"
  );
}

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Members",
  type: "document",

  fieldsets: [
    { name: "identity", title: "Identity", options: { collapsible: true, collapsed: false } },
    { name: "links", title: "Links", options: { collapsible: true, collapsed: true } },
    { name: "visibility", title: "Visibility", options: { collapsible: true, collapsed: true } },
    { name: "content", title: "Content", options: { collapsible: true, collapsed: false } },
    { name: "theme", title: "Theme", options: { collapsible: true, collapsed: true } },
    { name: "relations", title: "Relations", options: { collapsible: true, collapsed: true } },
  ],

  fields: [
    defineField({
      type: "string",
      title: "Title",
      name: "title",
      fieldset: "identity",
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      type: "string",
      title: "Name",
      name: "name",
      fieldset: "identity",
      validation: (Rule) => Rule.required().min(2).max(120),
    }),

    defineField({
      type: "image",
      title: "Person photo",
      name: "photo",
      fieldset: "identity",
      options: { hotspot: true },
    }),

    defineField({
      type: "slug",
      name: "slug",
      title: "Slug",
      fieldset: "identity",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      type: "string",
      name: "gender",
      title: "Gender",
      fieldset: "identity",
      options: {
        list: [
          { title: "Male", value: "male" },
          { title: "Female", value: "female" },
        ],
        layout: "dropdown",
      },
    }),

    defineField({
      type: "string",
      title: "Designation",
      name: "designation",
      fieldset: "identity",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      type: "string",
      title: "Division/Organization",
      name: "organization",
      fieldset: "identity",
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      type: "string",
      name: "country",
      title: "Country",
      fieldset: "identity",
      options: { list: countryOptions, layout: "dropdown" },
    }),

    defineField({
      name: "emailId",
      type: "string",
      title: "Email Address",
      fieldset: "links",
      validation: (Rule) => Rule.email().error("Please enter a valid email"),
    }),

    defineField({
      name: "emailDisplay",
      type: "boolean",
      title: "Display email publicly?",
      fieldset: "visibility",
      initialValue: false,
    }),

    defineField({
      type: "boolean",
      title: "Featured Profile",
      name: "featuredProfile",
      fieldset: "visibility",
      initialValue: false,
    }),

    urlField("orcidId", "ORCiD ID"),
    urlField("twitter", "Twitter / X URL"),
    urlField("linkedin", "LinkedIn URL"),
    urlField("instagram", "Instagram URL"),
    urlField("facebook", "Facebook URL"),
    urlField("website", "Website URL"),

    defineField({
      type: "string",
      title: "Short Bio",
      name: "shortBio",
      fieldset: "content",
      validation: (Rule) => Rule.max(240),
    }),

    portableTextField("bio", "Bio"),

    defineField({
      type: "string",
      title: "Header",
      name: "header",
      fieldset: "content",
      validation: (Rule) => Rule.max(120),
    }),

    defineField({
      type: "string",
      title: "Profile Colour",
      name: "profileColour",
      fieldset: "theme",
      validation: hexColorValidation,
      description: "HEX, e.g. #111111",
    }),

    defineField({
      type: "string",
      title: "Text colour",
      name: "textColour",
      fieldset: "theme",
      validation: hexColorValidation,
      description: "HEX, e.g. #ffffff",
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      fieldset: "relations",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "tag" }],
        }),
      ],
    }),

    defineField({
      name: "mentors",
      title: "Mentors",
      type: "array",
      fieldset: "relations",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "teamMember" }],

          options: {
            filter: ({ document }) => {
              const id = document?._id?.replace(/^drafts\./, "");

              return {
                filter: `_id != $id && _id != $draftId`,
                params: {
                  id,
                  draftId: id ? `drafts.${id}` : undefined,
                },
              };
            },
          },
        }),
      ],

      validation: (Rule) =>
        Rule.custom((mentors, context) => {
          const docId = context.document?._id?.replace(/^drafts\./, "");

          if (!Array.isArray(mentors) || !docId) return true;

          const hasSelf = mentors.some((m) => {
            if (!isRef(m)) return false;

            return m._ref === docId || m._ref === `drafts.${docId}`;
          });

          return hasSelf ? "Can't add yourself as mentor" : true;
        }),
    }),

    defineField({
      name: "mentees",
      title: "Mentees",
      type: "array",
      fieldset: "relations",

      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "teamMember" }],

          options: {
            filter: ({ document }) => {
              const id = document?._id?.replace(/^drafts\./, "");

              return {
                filter: `_id != $id && _id != $draftId`,
                params: {
                  id,
                  draftId: id ? `drafts.${id}` : undefined,
                },
              };
            },
          },
        }),
      ],

      validation: (Rule) =>
        Rule.custom((mentees, context) => {
          const docId = context.document?._id?.replace(/^drafts\./, "");

          if (!Array.isArray(mentees) || !docId) return true;

          const hasSelf = mentees.some((m) => {
            if (!isRef(m)) return false;

            return m._ref === docId || m._ref === `drafts.${docId}`;
          });

          return hasSelf ? "Can't add yourself as mentees" : true;
        }),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "organization", media: "photo" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Team Member", subtitle: subtitle || "", media };
    },
  },
});
