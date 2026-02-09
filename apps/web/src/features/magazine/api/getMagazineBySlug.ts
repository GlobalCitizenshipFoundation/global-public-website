import { sanityClient } from "@/shared/sanity/client";
import type { MagazinSingleType } from "@gcf/types";

import { MAGAZINE_BY_SLUG_QUERY } from "./magazine.queries";

export async function getMagazineBySlug(slug: string): Promise<MagazinSingleType | null> {
  if (!slug) return null;

  return sanityClient.fetch(MAGAZINE_BY_SLUG_QUERY, { slug });
}
