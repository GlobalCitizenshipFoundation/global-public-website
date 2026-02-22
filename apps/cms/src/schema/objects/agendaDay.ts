import { defineArrayMember, defineField, defineType } from "sanity";
import { isRecord } from "../helpers";
import { asSessionLike } from "../helpers/asSessionLike";
import { asYmdLocal } from "../helpers/dates";

export const agendaDay = defineType({
  name: "agendaDay",
  title: "Agenda Day",
  type: "object",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sessions",
      title: "Sessions",
      type: "array",
      of: [defineArrayMember({ type: "agendaSession" })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((dayObj) => {
      if (!isRecord(dayObj)) return true;

      const dayYMD = asYmdLocal(dayObj["date"]);
      const sessionsUnknown = dayObj["sessions"];

      if (!dayYMD || !Array.isArray(sessionsUnknown)) return true;

      for (const sess of sessionsUnknown) {
        if (!isRecord(sess)) continue;

        const s = asSessionLike(sess);
        if (!s) continue;

        const startYMD = asYmdLocal(s.startAt);
        const endYMD = asYmdLocal(s.endAt);

        if (!startYMD || !endYMD) continue;

        if (startYMD !== dayYMD || endYMD !== dayYMD) {
          return "Each session must start and end on the same agenda day date";
        }
      }

      return true;
    }),
  preview: {
    select: { date: "date", count: "sessions.length" },
    prepare({ date, count }) {
      return {
        title: date || "Agenda day",
        subtitle: typeof count === "number" ? `${count} sessions` : "",
      };
    },
  },
});
