import { sanityClient } from '@/shared/sanity/client';
import type { RelatedContributorsType } from '@gcf/types';

import { CONTRIBUTORS_LIST_QUERY } from './contributors.queries';

export async function getContributors(): Promise<RelatedContributorsType[]> {
  return sanityClient.fetch(CONTRIBUTORS_LIST_QUERY);
}
