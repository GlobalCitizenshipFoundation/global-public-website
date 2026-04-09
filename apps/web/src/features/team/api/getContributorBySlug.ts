import { sanityClient } from "@/shared/sanity/client";
import type { ProfileSingleType } from "@gcf/types";

import { CONTRIBUTOR_BY_SLUG_QUERY } from "./contributors.queries";

export async function getContributorBySlug(slug: string): Promise<ProfileSingleType | null> {
  if (!slug) return null;

  return sanityClient.fetch(CONTRIBUTOR_BY_SLUG_QUERY, { slug });
}
