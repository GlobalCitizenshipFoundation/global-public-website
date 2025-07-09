import { defineType, defineField, defineArrayMember } from 'sanity'

export const eventSingle = defineType({
  type: "document",
  name: "eventSingle",
  fields: [
    defineField({
      type: "string",
      title: "Event Heading",
      name: "eventHeading",
    }),
    defineField({
      type: "slug",
      title: "Slug",
      name: "slug",
      options: { source: "eventHeading" },
    }),
    defineField({
      type: "image",
      title: "Event Image",
      name: "eventImage",
      options: { hotspot: true },
    }),
    // defineField({
    //   type: "array",
    //   title: "Event Type/Category",
    //   name: "eventType",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [
    //         { type: "type" },
    //         { type: "category" },
    //       ],
    //     }),
    //   ],
    // }),
    defineField({
        type: 'string',
        name: 'pricing',
        title: 'Pricing',
        options: {
            list: [
            { title: 'Free', value: 'free' },
            { title: 'Paid', value: 'paid' },
            ],
            layout: 'dropdown',
        },
    }),
    defineField({
        type: 'string',
        name: 'status',
        title: 'Status',
        options: {
            list: [
            { title: 'Upcoming', value: 'upcoming' },
            { title: 'Started', value: 'started' },
            { title: 'Ended', value: 'ended' },
            ],
            layout: 'dropdown',
        },
    }),
    defineField({
        type: 'string',
        name: 'attedanceMode',
        title: 'Attedance Mode',
        options: {
            list: [
            { title: 'On Site', value: 'onSite' },
            { title: 'Online', value: 'online' },
            { title: 'Hybrid', value: 'hybrid' },
            ],
            layout: 'dropdown',
        },
    }),
    defineField({
        type: 'datetime',
        name: 'startDateTime',
        title: 'Start Date and Time',
    }),
    defineField({
        type: 'datetime',
        name: 'endDateTime',
        title: 'End Date and Time',
    }),
    defineField({
        type: 'array',
        name: 'marketingMention',
        title: 'Marketing Mention',
        of: [{ type: "block" }]
    }),
    defineField({
        name: "price",
        title: "Price",
        type: "object",
        fields: [
            { name: "amount", title: "Amount", type: "number" },
            { name: "currency", title: "Currency", type: "string" },
        ],
    }),
    defineField({
      type: "datetime",
      title: "Registration Deadline",
      name: "registrationDeadline",
    }),
    defineField({
      type: "number",
      title: "Seating Capacity",
      name: "seatingCapacity",
    }),
    defineField({
      type: "number",
      title: "Current Registrations",
      name: "currentRegistrations",
    }),
    defineField({
        type: 'string',
        name: 'registrationStatus',
        title: 'Registration Status',
        options: {
            list: [
            { title: 'In Stock', value: 'inStock' },
            { title: 'Sold Out', value: 'soldOut' },
            { title: 'Limited Availability', value: 'limitedAvailability' },
            ],
            layout: 'dropdown',
        },
    }),
    defineField({
        type: 'array',
        name: 'financialAid',
        title: 'Financial Aid',
        of: [{ type: "block" }]
    }),
    defineField({
        name: "buttonPrimary",
        title: "Primary Button",
        type: "object",
        fields: [
            {
            name: "label",
            title: "Label",
            type: "string",
            },
            {
            name: "url",
            title: "URL",
            type: "url",
            },
        ],
    }),
    // defineField({
    //   type: "array",
    //   title: "Speakers",
    //   name: "speakers",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [
    //         { type: "contributors" },
    //       ],
    //     }),
    //   ],
    // }),
    // defineField({
    //   type: "array",
    //   title: "Moderators",
    //   name: "moderators",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [
    //         { type: "contributors" },
    //       ],
    //     }),
    //   ],
    // }),
    defineField({
      type: "string",
      title: "Intro Text",
      name: "introText",
    }),
    defineField({
        type: 'array',
        name: 'body',
        title: 'Body',
        of: [{ type: "block" }]
    }),
    defineField({
      type: "string",
      title: "Venue",
      name: "venue",
    }),
    defineField({
        type: 'array',
        name: 'promoMessage',
        title: 'Promo Message',
        of: [{ type: "block" }]
    }),
    defineField({
        name: "buttonSecondary",
        title: "Secondary Button",
        type: "object",
        fields: [
            {
            name: "label",
            title: "Label",
            type: "string",
            },
            {
            name: "url",
            title: "URL",
            type: "url",
            },
        ],
    }),
    defineField({
        name: "buttonTertiary",
        title: "Tertiary Button",
        type: "object",
        fields: [
            {
            name: "label",
            title: "Label",
            type: "string",
            },
            {
            name: "url",
            title: "URL",
            type: "url",
            },
        ],
    }),
    defineField({
        type: 'string',
        name: 'audience',
        title: 'Who is this Event for',
        options: {
            list: [
            { title: 'Educators', value: 'educators' },
            { title: 'Education Leaders', value: 'educationLeaders' },
            { title: 'Youth', value: 'youth' },
            { title: 'Institutions', value: 'institutions' },
            ],
            layout: 'dropdown',
        },
    }),
    defineField({
      type: "string",
      title: "Agenda Heading",
      name: "agendaHeading",
    }),
    defineField({
        type: 'array',
        name: 'agendaDescription',
        title: 'Agenda Description',
        of: [{ type: "block" }]
    }),
    // defineField({
    //   type: "array",
    //   title: "Agenda",
    //   name: "agenda",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [
    //         { type: "events" },
    //       ],
    //     }),
    //   ],
    // }),
    // defineField({
    //   type: "array",
    //   title: "Steering Committee",
    //   name: "steeringCommittee",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [
    //         { type: "null" },
    //       ],
    //     }),
    //   ],
    // }),
    // defineField({
    //   type: "array",
    //   title: "Organizer",
    //   name: "organizer",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [
    //         { type: "null" },
    //       ],
    //     }),
    //   ],
    // }),
    // defineField({
    //   type: "array",
    //   title: "Partners",
    //   name: "partners",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [
    //         { type: "null" },
    //       ],
    //     }),
    //   ],
    // }),
    // defineField({
    //   type: "array",
    //   title: "Topics",
    //   name: "topics",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [
    //         { type: "null" },
    //       ],
    //     }),
    //   ],
    // }),
    // defineField({
    //   type: "array",
    //   title: "Related Events",
    //   name: "relatedEvents",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [
    //         { type: "null" },
    //       ],
    //     }),
    //   ],
    // }),
    defineField({
        type: 'array',
        name: 'endText',
        title: 'End Text',
        of: [{ type: "block" }]
    }),
    defineField({
        name: "addToCalendarUrl",
        title: "Add to Calendar Link",
        type: "url",
    }),
    // defineField({
    //   type: "array",
    //   title: "Offer",
    //   name: "offer",
    //   of: [
    //     defineArrayMember({
    //       type: "reference",
    //       to: [
    //         { type: "null" },
    //       ],
    //     }),
    //   ],
    // }),
  ],
});

