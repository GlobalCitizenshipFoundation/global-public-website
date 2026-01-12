import { sanityClient } from '@/shared/sanity/client';
import type { MagazinSingleType } from '@gcf/types';

import { MAGAZINE_LIST_QUERY } from './magazine.queries';

export async function getMagazine(): Promise<MagazinSingleType[]> {
  return sanityClient.fetch(MAGAZINE_LIST_QUERY);
}
