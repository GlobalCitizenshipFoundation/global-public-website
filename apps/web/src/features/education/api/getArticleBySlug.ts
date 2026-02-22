import type { ArticleSingleCmsType } from "@gcf/types";
import { sanityClient } from "@/shared/sanity/client";

import { ARTICLE_BY_SLUG_QUERY } from "./queries/articleBySlug.groq";

export async function getArticleBySlug(slug: string): Promise<ArticleSingleCmsType | null> {
  if (!slug) return null;

  return sanityClient.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
}
