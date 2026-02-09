import type { TitledListValue } from "sanity";

export type AgendaSessionType = "panel_discussion" | "learning_session";

export const AGENDA_SESSION_TYPE_LIST = [
  { title: "Panel Discussion", value: "panel_discussion" },
  { title: "Learning Session", value: "learning_session" },
] as const satisfies readonly TitledListValue<AgendaSessionType>[];
