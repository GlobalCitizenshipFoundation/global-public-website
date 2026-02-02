export type EventsQuery = {
  q?: string;
  type?: 'all' | 'conference' | 'consultation' | 'panel_discussion' | 'forum';
  tab?: 'all' | 'upcoming' | 'past';
  sort?: 'date_desc' | 'date_asc' | 'title_asc';
  page?: number;
  perPage?: number;
};

export type EventsListResult<T> = {
  items: T[];
  total: number;
};
