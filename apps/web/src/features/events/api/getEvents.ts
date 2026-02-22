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

function getOrderClause(sort: EventsQuery["sort"]) {
  switch (sort) {
    case "title_asc":
      return "order(eventHeading asc, startDateTime desc)";
    case "date_asc":
      return "order(startDateTime asc, eventHeading asc)";
    case "date_desc":
    default:
      return "order(startDateTime desc, eventHeading asc)";
  }
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
