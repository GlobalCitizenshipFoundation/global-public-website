import type { Metadata } from "next";

import { getEvents, parseEventsSearchParams, EventsListPage } from "@/features/events";

type PageProps = {
  searchParams: Promise<{
    q?: string;
    type?: string;
    tab?: string;
    sort?: string;
    page?: string;
    perPage?: string;
  }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const { page } = parseEventsSearchParams(sp);
  return { title: page > 1 ? `Events - Page ${page}` : "Events" };
}

export default async function EventsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const parsed = parseEventsSearchParams(sp);

  const { items, total } = await getEvents(parsed);

  return (
    <EventsListPage
      title="All Events"
      items={items}
      total={total}
      page={parsed.page}
      perPage={parsed.perPage}
    />
  );
}
