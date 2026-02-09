import type { TitledListValue } from "sanity";

export type EventType = "conference" | "consultation" | "panel_discussion" | "forum";

export const EVENT_TYPE_LIST = [
  { title: "Conference", value: "conference" },
  { title: "Consultation", value: "consultation" },
  { title: "Panel Discussion", value: "panel_discussion" },
  { title: "Forum", value: "forum" },
] as const satisfies readonly TitledListValue<EventType>[];
