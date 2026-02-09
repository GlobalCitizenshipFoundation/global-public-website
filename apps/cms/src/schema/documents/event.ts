import { defineArrayMember, defineField, defineType } from "sanity";
import { headingField, portableTextField, urlField } from "../fields";
import { isRecord } from "../helpers";
import { asDate } from "../helpers/dates";
import { type AttendanceMode, type EventDoc, getDoc, type PricingStatus } from "../helpers/getDoc";
import { listOf } from "../helpers/listOf";
import {
  ATTENDANCE_LIST,
  AUDIENCE_LIST,
  EVENT_TYPE_LIST,
  type EventType,
  PRICING_LIST,
  TOPICS_LIST,
} from "../lists";

export const eventSingle = defineType({
  type: "document",
  name: "eventSingle",
  title: "Event",

  initialValue: {
    pricing: "free" as PricingStatus,
    attendanceMode: "online" as AttendanceMode,
    eventType: "conference" as EventType,
    price: { currency: "USD" },
  },

  fields: [
    defineField({
      name: "eventHeading",
      title: "Event Heading",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(120),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "eventHeading", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: { list: listOf(EVENT_TYPE_LIST), layout: "dropdown" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "pricing",
      title: "Pricing",
      type: "string",
      options: { list: listOf(PRICING_LIST), layout: "dropdown" },
      validation: (Rule) => Rule.required(),
      initialValue: "free",
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "object",
      hidden: ({ document }) => ((document ?? {}) as EventDoc).pricing !== "paid",
      fields: [
        defineField({
          name: "amount",
          title: "Amount",
          type: "number",
          validation: (Rule) =>
            Rule.custom((amount, ctx) => {
              const doc = getDoc(ctx);
              if (doc.pricing !== "paid") return true;
              if (typeof amount !== "number") return "Amount is required for paid events";
              if (amount <= 0) return "Amount must be greater than 0";
              return true;
            }),
        }),
        defineField({
          name: "currency",
          title: "Currency",
          type: "string",
          initialValue: "USD",
          validation: (Rule) => Rule.required().min(3).max(3),
          description: "ISO 4217, e.g. USD, EUR, PLN",
        }),
      ],
    }),

    defineField({
      name: "attendanceMode",
      title: "Attendance Mode",
      type: "string",
      options: { list: listOf(ATTENDANCE_LIST), layout: "dropdown" },
      initialValue: "online",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "startDateTime",
      title: "Start Date and Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "endDateTime",
      title: "End Date and Time",
      type: "datetime",
      validation: (Rule) =>
        Rule.custom((end, ctx) => {
          const doc = getDoc(ctx);
          const startD = asDate(doc.startDateTime);
          const endD = asDate(end);
          if (!endD || !startD) return true;
          return endD.getTime() >= startD.getTime() ? true : "End date must be after start date";
        }),
    }),

    portableTextField("marketingMention", "Marketing Mention"),

    defineField({ name: "panelCtaUpcoming", title: "Panel CTA - Upcoming", type: "ctaButton" }),
    defineField({ name: "panelCtaStarted", title: "Panel CTA - Started", type: "ctaButton" }),
    defineField({ name: "panelCtaEnded", title: "Panel CTA - Ended", type: "ctaButton" }),

    portableTextField("promoMessage", "Promo Message"),

    defineField({
      name: "venueLocation",
      title: "Venue / Location",
      type: "venueLocation",
      hidden: ({ document }) => ((document ?? {}) as EventDoc).attendanceMode === "online",
      validation: (Rule) =>
        Rule.custom((v, ctx) => {
          const doc = getDoc(ctx);
          if (doc.attendanceMode === "online") return true;

          if (!isRecord(v)) return "Venue location is required";

          const address = v["address"];
          if (typeof address !== "string" || address.trim().length < 5) {
            return "Address is required";
          }

          if (typeof address !== "string" || address.trim().length < 5)
            return "Address is required";

          return true;
        }),
    }),

    defineField({ name: "buttonSecondary", title: "Secondary Button", type: "ctaButton" }),
    defineField({ name: "buttonTertiary", title: "Tertiary Button", type: "ctaButton" }),

    defineField({
      name: "eventImage",
      title: "Event Image",
      type: "image",
      options: { hotspot: true },
    }),

    headingField("introHeading", "Intro Heading"),
    portableTextField("introText", "Intro Text"),

    headingField("videoHeading", "Video Heading"),
    urlField("videoLink", "Video Link"),

    headingField("bodyHeading", "Body Heading"),
    portableTextField("body", "Body", { required: true }),

    defineField({
      name: "audience",
      title: "Who is this Event for",
      type: "array",
      of: [{ type: "string" }],
      options: { list: listOf(AUDIENCE_LIST), layout: "grid" },
    }),

    headingField("agendaHeading", "Agenda Heading"),
    portableTextField("agendaDescription", "Agenda Description"),

    defineField({
      name: "agenda",
      title: "Agenda",
      type: "array",
      of: [defineArrayMember({ type: "agendaDay" })],
    }),

    headingField("speakersHeading", "Speakers Heading"),
    portableTextField("speakersText", "Speakers Text"),

    defineField({
      name: "speakers",
      title: "Speakers",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "contributorSingle" }] })],
    }),

    headingField("steeringCommitteeHeading", "Steering Committee Heading"),
    portableTextField("steeringCommitteeText", "Steering Committee Text"),

    defineField({
      name: "steeringCommittee",
      title: "Steering Committee",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "contributorSingle" }] })],
    }),

    headingField("partnersHeading", "Partners Heading"),
    portableTextField("partnersText", "Partners Text"),

    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "partnerGroup",
          fields: [
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Hosted by", value: "hostedBy" },
                  { title: "Event Partners", value: "eventPartners" },
                  { title: "Knowledge Partners", value: "knowledgePartners" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "items",
              title: "Partners",
              type: "array",
              of: [defineArrayMember({ type: "reference", to: [{ type: "partnersSingle" }] })],
            }),
          ],
          preview: {
            select: { type: "type", count: "items.length" },
            prepare({ type, count }) {
              return {
                title: type || "partners",
                subtitle: typeof count === "number" ? `${count} items` : "",
              };
            },
          },
        }),
      ],
    }),

    headingField("registrationHeading", "Registration Heading"),
    portableTextField("registrationText", "Registration Text"),

    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      options: { list: listOf(TOPICS_LIST), layout: "grid" },
    }),
  ],
});
