import { sanityClient } from '@/shared/sanity/client';
import type { ContributorSingleType } from '@gcf/types';

import { CONTRIBUTOR_BY_SLUG_QUERY } from './contributors.queries';

export async function getContributorBySlug(slug: string): Promise<ContributorSingleType | null> {
  if (!slug) return null;

  return sanityClient.fetch(CONTRIBUTOR_BY_SLUG_QUERY, { slug });
}
