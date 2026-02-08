import { defineType, defineField, defineArrayMember } from 'sanity';
import type { TitledListValue } from 'sanity';

/** Helpers */
const asList = <T extends string>(list: readonly TitledListValue<T>[]) =>
  list as unknown as (string | TitledListValue<T>)[];

function asDate(v: unknown): Date | null {
  if (typeof v !== 'string') return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function ymdLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function asYmdLocal(v: unknown): string | null {
  // date field: "YYYY-MM-DD"
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) return v;

  // datetime field: ISO string
  const d = asDate(v);
  return d ? ymdLocal(d) : null;
}

/** Domain types */
type PricingStatus = 'free' | 'paid';
type AttendanceMode = 'onSite' | 'online' | 'hybrid';
type EventType = 'conference' | 'consultation' | 'panel_discussion' | 'forum';
type AgendaSessionType = 'panel_discussion' | 'learning_session';

type EventDoc = Partial<{
  pricing: PricingStatus;
  startDateTime: string;
  endDateTime: string;
  attendanceMode: AttendanceMode;
}>;

function getDoc(ctx: { document?: unknown }): EventDoc {
  return (ctx.document ?? {}) as EventDoc;
}

/** Lists */
const PRICING_LIST = [
  { title: 'Free', value: 'free' },
  { title: 'Paid', value: 'paid' },
] as const satisfies readonly TitledListValue<PricingStatus>[];

const ATTENDANCE_LIST = [
  { title: 'On Site', value: 'onSite' },
  { title: 'Online', value: 'online' },
  { title: 'Hybrid', value: 'hybrid' },
] as const satisfies readonly TitledListValue<AttendanceMode>[];

const EVENT_TYPE_LIST = [
  { title: 'Conference', value: 'conference' },
  { title: 'Consultation', value: 'consultation' },
  { title: 'Panel Discussion', value: 'panel_discussion' },
  { title: 'Forum', value: 'forum' },
] as const satisfies readonly TitledListValue<EventType>[];

const AGENDA_SESSION_TYPE_LIST = [
  { title: 'Panel Discussion', value: 'panel_discussion' },
  { title: 'Learning Session', value: 'learning_session' },
] as const satisfies readonly TitledListValue<AgendaSessionType>[];

const AUDIENCE_LIST = [
  { title: 'Educators', value: 'educators' },
  { title: 'Education Leaders', value: 'educationLeaders' },
  { title: 'Youth', value: 'youth' },
  { title: 'Institutions', value: 'institutions' },
] as const satisfies readonly TitledListValue<
  'educators' | 'educationLeaders' | 'youth' | 'institutions'
>[];

const TOPICS_LIST = [
  { title: 'Global Citizenship', value: 'globalCitizenship' },
  { title: 'Ed Tech', value: 'edTech' },
  { title: 'Online Learning', value: 'onlineLearning' },
  { title: 'Pedagogy', value: 'pedagogy' },
  { title: 'Educational Leadership', value: 'educationalLeadership' },
] as const satisfies readonly TitledListValue<
  'globalCitizenship' | 'edTech' | 'onlineLearning' | 'pedagogy' | 'educationalLeadership'
>[];

/** Reusable CTA object */
export const ctaButton = defineType({
  name: 'ctaButton',
  title: 'CTA Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    }),
  ],
});

export const agendaPerson = defineType({
  name: 'agendaPerson',
  title: 'Agenda Person',
  type: 'object',
  fields: [
    defineField({
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: [{ type: 'contributorSingle' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    // ⚠️ dopasuj do contributorSingle jeśli masz inne pola
    select: {
      title: 'person.name',
      media: 'person.photo',
    },
    prepare({ title, media }) {
      return { title: title || 'Person', media };
    },
  },
});

export const agendaSession = defineType({
  name: 'agendaSession',
  title: 'Agenda Session',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Session Type',
      type: 'string',
      options: { list: asList(AGENDA_SESSION_TYPE_LIST), layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(160),
    }),

    defineField({
      name: 'startAt',
      title: 'Start (date & time)',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'endAt',
      title: 'End (date & time)',
      type: 'datetime',
      validation: (Rule) =>
        Rule.required().custom((end, ctx) => {
          const start = (ctx.parent as any)?.startAt as unknown;
          const startD = asDate(start);
          const endD = asDate(end);
          if (!startD || !endD) return true;
          return endD.getTime() > startD.getTime() ? true : 'End must be after start';
        }),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'moderators',
      title: 'Moderators',
      type: 'array',
      of: [defineArrayMember({ type: 'agendaPerson' })],
    }),

    defineField({
      name: 'panelists',
      title: 'Panelists',
      type: 'array',
      of: [defineArrayMember({ type: 'agendaPerson' })],
    }),
  ],
  preview: {
    select: { title: 'title', startAt: 'startAt', endAt: 'endAt', type: 'type' },
    prepare({ title, startAt, endAt, type }) {
      const s = typeof startAt === 'string' ? startAt.slice(11, 16) : '??:??';
      const e = typeof endAt === 'string' ? endAt.slice(11, 16) : '??:??';
      return {
        title: title || 'Session',
        subtitle: `${type || 'session'} - ${s}-${e}`.trim(),
      };
    },
  },
});

export const agendaDay = defineType({
  name: 'agendaDay',
  title: 'Agenda Day',
  type: 'object',
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'sessions',
      title: 'Sessions',
      type: 'array',
      of: [defineArrayMember({ type: 'agendaSession' })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  /**
   * Jedyna walidacja spójności dnia vs sesji - na poziomie OBIEKTU (pewny kontekst).
   */
  validation: (Rule) =>
    Rule.custom((dayObj) => {
      const dayYMD = asYmdLocal((dayObj as any)?.date);
      const sessions = (dayObj as any)?.sessions as unknown;

      if (!dayYMD || !Array.isArray(sessions)) return true;

      for (const s of sessions) {
        const startYMD = asYmdLocal((s as any)?.startAt);
        const endYMD = asYmdLocal((s as any)?.endAt);

        // jeśli ktoś nie uzupełnił jeszcze czasów, nie blokuj
        if (!startYMD || !endYMD) continue;

        if (startYMD !== dayYMD || endYMD !== dayYMD) {
          return 'Each session must start and end on the same agenda day date';
        }
      }

      return true;
    }),

  preview: {
    select: { date: 'date', count: 'sessions.length' },
    prepare({ date, count }) {
      return {
        title: date || 'Agenda day',
        subtitle: typeof count === 'number' ? `${count} sessions` : '',
      };
    },
  },
});

/** Main event schema */
export const eventSingle = defineType({
  type: 'document',
  name: 'eventSingle',
  title: 'Event',

  initialValue: {
    pricing: 'free' as PricingStatus,
    attendanceMode: 'online' as AttendanceMode,
    eventType: 'conference' as EventType,
    price: { currency: 'USD' },
  },

  fields: [
    defineField({
      name: 'eventHeading',
      title: 'Event Heading',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'eventHeading', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: { list: asList(EVENT_TYPE_LIST), layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'string',
      options: { list: asList(PRICING_LIST), layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
      initialValue: 'free',
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      hidden: ({ document }) => ((document ?? {}) as EventDoc).pricing !== 'paid',
      fields: [
        defineField({
          name: 'amount',
          title: 'Amount',
          type: 'number',
          validation: (Rule) =>
            Rule.custom((amount, ctx) => {
              const doc = getDoc(ctx);
              if (doc.pricing !== 'paid') return true;
              if (typeof amount !== 'number') return 'Amount is required for paid events';
              if (amount <= 0) return 'Amount must be greater than 0';
              return true;
            }),
        }),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          initialValue: 'USD',
          validation: (Rule) => Rule.required().min(3).max(3),
          description: 'ISO 4217, e.g. USD, EUR, PLN',
        }),
      ],
    }),

    defineField({
      name: 'attendanceMode',
      title: 'Attendance Mode',
      type: 'string',
      options: { list: asList(ATTENDANCE_LIST), layout: 'dropdown' },
      initialValue: 'online',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'startDateTime',
      title: 'Start Date and Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'endDateTime',
      title: 'End Date and Time',
      type: 'datetime',
      validation: (Rule) =>
        Rule.custom((end, ctx) => {
          const doc = getDoc(ctx);
          const startD = asDate(doc.startDateTime);
          const endD = asDate(end);
          if (!endD || !startD) return true;
          return endD.getTime() >= startD.getTime() ? true : 'End date must be after start date';
        }),
    }),

    defineField({
      name: 'marketingMention',
      title: 'Marketing Mention',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'panelCtaUpcoming',
      title: 'Panel CTA - Upcoming',
      type: 'ctaButton',
    }),
    defineField({
      name: 'panelCtaStarted',
      title: 'Panel CTA - Started',
      type: 'ctaButton',
    }),
    defineField({
      name: 'panelCtaEnded',
      title: 'Panel CTA - Ended',
      type: 'ctaButton',
    }),

    defineField({
      name: 'promoMessage',
      title: 'Promo Message',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      hidden: ({ document }) => ((document ?? {}) as EventDoc).attendanceMode === 'online',
      validation: (Rule) =>
        Rule.custom((venue, ctx) => {
          const doc = getDoc(ctx);
          if (doc.attendanceMode === 'online') return true;
          if (typeof venue !== 'string' || venue.trim().length < 2) return 'Venue is required';
          return true;
        }),
    }),

    defineField({
      name: 'buttonSecondary',
      title: 'Secondary Button',
      type: 'ctaButton',
    }),
    defineField({
      name: 'buttonTertiary',
      title: 'Tertiary Button',
      type: 'ctaButton',
    }),

    defineField({
      name: 'eventImage',
      title: 'Event Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'introHeading',
      title: 'Intro Heading',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'videoHeading',
      title: 'Video Heading',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      name: 'videoLink',
      title: 'Video Link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    }),

    defineField({
      name: 'bodyHeading',
      title: 'Body Heading',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'audience',
      title: 'Who is this Event for',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: asList(AUDIENCE_LIST), layout: 'grid' },
    }),

    defineField({
      name: 'agendaHeading',
      title: 'Agenda Heading',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      name: 'agendaDescription',
      title: 'Agenda Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'agenda',
      title: 'Agenda',
      type: 'array',
      of: [defineArrayMember({ type: 'agendaDay' })],
    }),

    defineField({
      name: 'speakersHeading',
      title: 'Speakers Heading',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'speakersText',
      title: 'Speakers Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'contributorSingle' }],
        }),
      ],
    }),

    defineField({
      name: 'steeringCommitteeHeading',
      title: 'Steering Committee Heading',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'steeringCommitteeText',
      title: 'Steering Committee Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'steeringCommittee',
      title: 'Steering Committee',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'contributorSingle' }],
        }),
      ],
    }),

    defineField({
      name: 'partnersHeading',
      title: 'Partners Heading',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'partnersText',
      title: 'Partners Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'partnerGroup',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Hosted by', value: 'hostedBy' },
                  { title: 'Event Partners', value: 'eventPartners' },
                  { title: 'Knowledge Partners', value: 'knowledgePartners' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Partners',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'reference',
                  to: [{ type: 'partnersSingle' }],
                }),
              ],
            }),
          ],
          preview: {
            select: { type: 'type', count: 'items.length' },
            prepare({ type, count }) {
              return {
                title: type || 'partners',
                subtitle: typeof count === 'number' ? `${count} items` : '',
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'registrationHeading',
      title: 'Registration Heading',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      name: 'registrationText',
      title: 'Registration Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: asList(TOPICS_LIST), layout: 'grid' },
    }),
  ],
});
