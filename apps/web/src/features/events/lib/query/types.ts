export type EventType = 'all' | 'conference' | 'consultation' | 'panel_discussion' | 'forum';
export type Tab = 'all' | 'upcoming' | 'past';
export type Sort = 'date_desc' | 'date_asc' | 'title_asc';

export type EventsSearchParams = {
  q?: string;
  type?: string;
  tab?: string;
  sort?: string;
  page?: string;
  perPage?: string;
};

export type ParsedEventsQuery = {
  q: string;
  type: EventType;
  tab: Tab;
  sort: Sort;
  page: number;
  perPage: number;
};
