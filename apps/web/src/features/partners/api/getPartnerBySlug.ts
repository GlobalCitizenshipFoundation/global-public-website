import { sanityClient } from "@/shared/sanity/client";
import type { PartnerSingleType } from "@gcf/types";

import { PARTNER_BY_SLUG_QUERY } from "./partners.queries";

export async function getPartnerBySlug(slug: string): Promise<PartnerSingleType | null> {
  if (!slug) return null;

  return sanityClient.fetch(PARTNER_BY_SLUG_QUERY, { slug });
}
