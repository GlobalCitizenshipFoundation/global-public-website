import type { ArticleListItemType } from "@gcf/types";
import { sanityClient } from "@/shared/sanity/client";
import { ARTICLES_LIST_BASE } from "./queries/articlesList.groq";

type ArticlesQuery = {
  q?: string;
  sort?: "date_desc" | "date_asc" | "title_asc";
  page?: number;
  perPage?: number;
};

type ArticlesListResult<T> = { items: T[]; total: number };

function getOrderClause(sort: ArticlesQuery["sort"]) {
  switch (sort) {
    case "title_asc":
      return "order(title asc, publishedAt desc)";
    case "date_asc":
      return "order(publishedAt asc, title asc)";
    case "date_desc":
    default:
      return "order(publishedAt desc, title asc)";
  }
}

export async function getArticles(
  query: ArticlesQuery = {},
): Promise<ArticlesListResult<ArticleListItemType>> {
  const { q = "", sort = "date_desc", page = 1, perPage = 8 } = query;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const groq = ARTICLES_LIST_BASE.replace("ORDER_CLAUSE", getOrderClause(sort));

  const res = await sanityClient.fetch(groq, {
    q: q.trim(),
    start,
    end,
  });

  return { items: res?.items ?? [], total: res?.total ?? 0 };
}
