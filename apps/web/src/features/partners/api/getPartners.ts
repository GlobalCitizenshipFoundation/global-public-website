import { sanityClient } from '@/shared/sanity/client';
import type { RelatedPartnersType } from '@gcf/types';

import { PARTNERS_LIST_QUERY } from './partners.queries';

export async function getPartners(): Promise<RelatedPartnersType[]> {
  return sanityClient.fetch(PARTNERS_LIST_QUERY);
}
