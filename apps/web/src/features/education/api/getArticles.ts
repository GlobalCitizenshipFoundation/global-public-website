import type { ArticleListItemType } from "@gcf/types";
import { sanityClient } from "@/shared/sanity/client";
import { ARTICLES_LIST_BASE } from "./queries/articlesList.groq";

type ArticlesQuery = {
  q?: string;
  sort?: "date_desc" | "date_asc" | "title_asc";
  page?: number;
  perPage?: number;
  categoryId?: string;
};

type ArticlesListResult<T> = { items: T[]; total: number };

const ORDER: Record<NonNullable<ArticlesQuery["sort"]>, string> = {
  date_desc: "order(publishedAt desc, title asc)",
  date_asc: "order(publishedAt asc, title asc)",
  title_asc: "order(title asc, publishedAt desc)",
};

function getOrderClause(sort: ArticlesQuery["sort"]) {
  return ORDER[sort ?? "date_desc"];
}

export async function getArticles(
  query: ArticlesQuery = {},
): Promise<ArticlesListResult<ArticleListItemType>> {
  const { q = "", sort = "date_desc", page = 1, perPage = 8, categoryId = "" } = query;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const groq = ARTICLES_LIST_BASE.replace("ORDER_CLAUSE", getOrderClause(sort));

  const res = await sanityClient.fetch(groq, {
    q: q.trim(),
    start,
    end,
    categoryId,
  });

  return { items: res?.items ?? [], total: res?.total ?? 0 };
}
