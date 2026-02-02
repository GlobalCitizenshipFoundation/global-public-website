import ContainerBig from '@/shared/ui/ContainerBig';
import { getEvents } from '@/features/events/api/getEvents';
import type { Metadata } from 'next';

import EventsToolbar from '@/features/events/ui/EventsToolbar';
import EventsGrid from '@/features/events/ui/EventsGrid';
import EventsPagination from '@/features/events/ui/EventsPagination';

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

type EventType = 'all' | 'conference' | 'consultation' | 'panel_discussion' | 'forum';
type Tab = 'all' | 'upcoming' | 'past';
type Sort = 'date_desc' | 'date_asc' | 'title_asc';

const EVENT_TYPES = ['all', 'conference', 'consultation', 'panel_discussion', 'forum'] as const;
const TABS = ['all', 'upcoming', 'past'] as const;
const SORTS = ['date_desc', 'date_asc', 'title_asc'] as const;

function isOneOf<T extends readonly string[]>(arr: T, v: string): v is T[number] {
  return (arr as readonly string[]).includes(v);
}

function asInt(v: string | undefined, fallback: number) {
  const n = Number.parseInt(v ?? '', 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function asString(v: string | undefined, fallback: string) {
  return (v ?? fallback).trim();
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const page = asInt(sp.page, 1);

  return {
    title: page > 1 ? `Events - Page ${page}` : 'Events',
  };
}

const EventsPage = async ({ searchParams }: PageProps) => {
  const sp = await searchParams;

  const q = asString(sp.q, '');

  const typeRaw = asString(sp.type, 'all');
  const tabRaw = asString(sp.tab, 'all');
  const sortRaw = asString(sp.sort, 'date_desc');

  const type: EventType = isOneOf(EVENT_TYPES, typeRaw) ? typeRaw : 'all';
  const tab: Tab = isOneOf(TABS, tabRaw) ? tabRaw : 'all';
  const sort: Sort = isOneOf(SORTS, sortRaw) ? sortRaw : 'date_desc';

  const page = asInt(sp.page, 1);
  const perPage = asInt(sp.perPage, 9);

  const { items, total } = await getEvents({ q, type, tab, sort, page, perPage });

  return (
    <div className="bg-background-darker py-16 md:py-24">
      <ContainerBig>
        <EventsToolbar title="All Events" />

        <EventsGrid items={items} />
        <EventsPagination page={page} total={total} perPage={perPage} />
      </ContainerBig>
    </div>
  );
};

export default EventsPage;
