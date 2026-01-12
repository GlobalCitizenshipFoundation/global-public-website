import { sanityClient } from '@/shared/sanity/client';
import type { EventSingleType } from '@gcf/types';

import { EVENT_BY_SLUG_QUERY } from './events.queries';

export async function getEventBySlug(slug: string): Promise<EventSingleType | null> {
  if (!slug) return null;

  return sanityClient.fetch(EVENT_BY_SLUG_QUERY, { slug });
}
