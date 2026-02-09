import type { EventType, Tab, Sort } from "./types";

export const EVENT_TYPES = [
  "all",
  "conference",
  "consultation",
  "panel_discussion",
  "forum",
] as const;
export const TABS = ["all", "upcoming", "past"] as const;
export const SORTS = ["date_desc", "date_asc", "title_asc"] as const;

export const DEFAULTS: Readonly<{
  q: string;
  type: EventType;
  tab: Tab;
  sort: Sort;
  page: number;
  perPage: number;
}> = {
  q: "",
  type: "all",
  tab: "all",
  sort: "date_desc",
  page: 1,
  perPage: 9,
};
