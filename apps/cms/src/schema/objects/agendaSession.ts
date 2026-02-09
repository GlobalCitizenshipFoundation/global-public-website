import { defineArrayMember, defineField, defineType } from "sanity";
import { portableTextField } from "../fields";
import { isRecord } from "../helpers";
import { asDate } from "../helpers/dates";
import { listOf } from "../helpers/listOf";
import { AGENDA_SESSION_TYPE_LIST } from "../lists";

export const agendaSession = defineType({
  name: "agendaSession",
  title: "Agenda Session",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Session Type",
      type: "string",
      options: { list: listOf(AGENDA_SESSION_TYPE_LIST), layout: "dropdown" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(160),
    }),
    defineField({
      name: "startAt",
      title: "Start (date & time)",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endAt",
      title: "End (date & time)",
      type: "datetime",
      validation: (Rule) =>
        Rule.required().custom((end, ctx) => {
          const parent = ctx.parent;
          const start = isRecord(parent) ? parent["startAt"] : undefined;

          const startD = asDate(start);
          const endD = asDate(end);
          if (!startD || !endD) return true;
          return endD.getTime() > startD.getTime() ? true : "End must be after start";
        }),
    }),
    portableTextField("description", "Description"),
    defineField({
      name: "moderators",
      title: "Moderators",
      type: "array",
      of: [defineArrayMember({ type: "agendaPerson" })],
    }),
    defineField({
      name: "panelists",
      title: "Panelists",
      type: "array",
      of: [defineArrayMember({ type: "agendaPerson" })],
    }),
  ],
  preview: {
    select: {
      title: "title",
      startAt: "startAt",
      endAt: "endAt",
      type: "type",
    },
    prepare({ title, startAt, endAt, type }) {
      const s = typeof startAt === "string" ? startAt.slice(11, 16) : "??:??";
      const e = typeof endAt === "string" ? endAt.slice(11, 16) : "??:??";
      return {
        title: title || "Session",
        subtitle: `${type || "session"} - ${s}-${e}`.trim(),
      };
    },
  },
});
