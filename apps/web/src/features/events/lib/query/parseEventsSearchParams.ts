import type { EventsSearchParams, ParsedEventsQuery } from './types';
import { DEFAULTS, EVENT_TYPES, SORTS, TABS } from './constants';

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

export function parseEventsSearchParams(sp: EventsSearchParams | undefined): ParsedEventsQuery {
  const q = asString(sp?.q, DEFAULTS.q);

  const typeRaw = asString(sp?.type, DEFAULTS.type);
  const tabRaw = asString(sp?.tab, DEFAULTS.tab);
  const sortRaw = asString(sp?.sort, DEFAULTS.sort);

  const type = isOneOf(EVENT_TYPES, typeRaw) ? typeRaw : DEFAULTS.type;
  const tab = isOneOf(TABS, tabRaw) ? tabRaw : DEFAULTS.tab;
  const sort = isOneOf(SORTS, sortRaw) ? sortRaw : DEFAULTS.sort;

  const page = asInt(sp?.page, DEFAULTS.page);
  const perPage = asInt(sp?.perPage, DEFAULTS.perPage);

  return { q, type, tab, sort, page, perPage };
}
