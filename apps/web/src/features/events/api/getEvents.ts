import { sanityClient } from '@/shared/sanity/client';
import type { RelatedEventProps } from '@gcf/types';

import { EVENTS_LIST_QUERY } from './events.queries';

export async function getEvents(): Promise<RelatedEventProps[]> {
  return sanityClient.fetch(EVENTS_LIST_QUERY);
}
