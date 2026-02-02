import { defineType, defineField, defineArrayMember } from 'sanity';

export const eventSingle = defineType({
  type: 'document',
  name: 'eventSingle',
  fields: [
    defineField({
      type: 'string',
      title: 'Event Heading',
      name: 'eventHeading',
    }),
    defineField({
      type: 'slug',
      title: 'Slug',
      name: 'slug',
      options: { source: 'eventHeading' },
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
      name: 'eventStatus',
      title: 'Event Status',
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
      name: 'attendanceMode',
      title: 'Attendance Mode',
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
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        { name: 'amount', title: 'Amount', type: 'number' },
        { name: 'currency', title: 'Currency', type: 'string' },
      ],
    }),
    defineField({
      type: 'datetime',
      title: 'Registration Deadline',
      name: 'registrationDeadline',
    }),
    defineField({
      type: 'number',
      title: 'Seating Capacity',
      name: 'seatingCapacity',
    }),
    defineField({
      type: 'number',
      title: 'Current Registrations',
      name: 'currentRegistrations',
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
      name: 'panelDiscussionfinancialAid',
      title: 'Panel Discussion Financial Aid',
      of: [{ type: 'block' }],
    }),
    defineField({
      type: 'string',
      title: 'Venue',
      name: 'venue',
    }),
    defineField({
      type: 'array',
      title: 'Rich Text Box',
      name: 'richTextBox',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'buttonPrimary',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
      ],
    }),
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
      type: 'array',
      name: 'body',
      title: 'Body',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'buttonSecondary',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'buttonTertiary',
      title: 'Tertiary Button',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      type: 'string',
      name: 'eventType',
      title: 'Event Type',
      options: {
        list: [
          { title: 'Conference', value: 'conference' },
          { title: 'Consultation', value: 'consultation' },
          { title: 'Panel Discussion', value: 'panel_discussion' },
          { title: 'Forum', value: 'forum' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      type: 'image',
      title: 'Event Image',
      name: 'eventImage',
      options: { hotspot: true },
    }),
    defineField({
      type: 'array',
      title: 'Intro Text',
      name: 'introText',
      of: [{ type: 'block' }],
    }),
    defineField({
      type: 'url',
      title: 'Video Link',
      name: 'videoLink',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    }),
    defineField({
      type: 'array',
      name: 'bodyText',
      title: 'Body Text',
      of: [{ type: 'block' }],
    }),
    defineField({
      type: 'array',
      name: 'promoMessage',
      title: 'Promo Message',
      of: [{ type: 'block' }],
    }),
    defineField({
      type: 'array',
      name: 'audience',
      title: 'Who is this Event for',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Educators', value: 'educators' },
          { title: 'Education Leaders', value: 'educationLeaders' },
          { title: 'Youth', value: 'youth' },
          { title: 'Institutions', value: 'institutions' },
        ],
        layout: 'grid',
      },
    }),
    defineField({
      type: 'string',
      title: 'Agenda Heading',
      name: 'agendaHeading',
    }),
    defineField({
      type: 'array',
      name: 'agendaDescription',
      title: 'Agenda Description',
      of: [{ type: 'block' }],
    }),
    defineField({
      type: 'array',
      title: 'Agenda',
      name: 'agenda',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'eventSingle' }],
        }),
      ],
    }),
    defineField({
      type: 'array',
      name: 'speakersDescription',
      title: 'Speakers Description',
      of: [{ type: 'block' }],
    }),
    defineField({
      type: 'array',
      title: 'Speakers',
      name: 'speakers',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'contributorSingle' }],
        }),
      ],
    }),
    defineField({
      type: 'array',
      name: 'steeringCommitteeDescription',
      title: 'Steering Committee Description',
      of: [{ type: 'block' }],
    }),
    defineField({
      type: 'array',
      title: 'Steering Committee',
      name: 'steeringCommittee',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'contributorSingle' }],
        }),
      ],
    }),
    defineField({
      type: 'array',
      name: 'partnersDescription',
      title: 'Partners Description',
      of: [{ type: 'block' }],
    }),
    defineField({
      type: 'array',
      title: 'Hosted by',
      name: 'hostedBy',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'partnersSingle' }],
        }),
      ],
    }),
    defineField({
      type: 'array',
      title: 'Event Partners',
      name: 'eventPartners',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'partnersSingle' }],
        }),
      ],
    }),
    defineField({
      type: 'array',
      title: 'Knowledge Partners',
      name: 'knowledgePartners',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'partnersSingle' }],
        }),
      ],
    }),
    defineField({
      type: 'array',
      name: 'registration',
      title: 'Registration',
      of: [{ type: 'block' }],
    }),
    defineField({
      type: 'array',
      name: 'topics',
      title: 'Topics',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Global Citizenship', value: 'globalCitizenship' },
          { title: 'Ed Tech', value: 'edTech' },
          { title: 'Online Learning', value: 'onlineLearning' },
          { title: 'Pedagogy', value: 'pedagogy' },
          { title: 'Educational Leadership', value: 'educationalLeadership' },
        ],
        layout: 'grid',
      },
    }),
  ],
});
