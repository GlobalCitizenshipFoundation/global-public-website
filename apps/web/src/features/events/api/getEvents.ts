import type { EventCard } from "@gcf/types";
import { sanityClient } from "@/shared/sanity/client";
import { EVENTS_LIST_BASE } from "./queries/eventsList.groq";

type EventsQuery = {
  q?: string;
  type?: "all" | "conference" | "consultation" | "panel_discussion" | "forum";
  tab?: "all" | "upcoming" | "past";
  sort?: "date_desc" | "date_asc" | "title_asc";
  page?: number;
  perPage?: number;
};

type EventsListResult<T> = { items: T[]; total: number };

const ORDER: Record<NonNullable<EventsQuery["sort"]>, string> = {
  date_desc: "order(startDateTime desc, eventHeading asc)",
  date_asc: "order(startDateTime asc, eventHeading asc)",
  title_asc: "order(eventHeading asc, startDateTime desc)",
};

function getOrderClause(sort: EventsQuery["sort"]) {
  return ORDER[sort ?? "date_desc"];
}

export async function getEvents(query: EventsQuery = {}): Promise<EventsListResult<EventCard>> {
  const { q = "", type = "all", tab = "all", sort = "date_desc", page = 1, perPage = 9 } = query;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const groq = EVENTS_LIST_BASE.replace("ORDER_CLAUSE", getOrderClause(sort));

  const res = await sanityClient.fetch(groq, {
    q: q.trim(),
    type,
    tab,
    start,
    end,
  });

  return { items: res?.items ?? [], total: res?.total ?? 0 };
}
