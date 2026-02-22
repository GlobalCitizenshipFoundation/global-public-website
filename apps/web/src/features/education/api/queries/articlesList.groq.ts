export const ARTICLES_LIST_BASE = `
{
  "total": count(*[
    _type == "article"
    && defined(slug.current)
    && ($q == "" || title match ("*" + $q + "*"))
  ]),
  "items": *[
    _type == "article"
    && defined(slug.current)
    && ($q == "" || title match ("*" + $q + "*"))
  ]
  | ORDER_CLAUSE
  [$start...$end]{
    _id,
    title,
    slug,
    description,
    readingLength,
    publishedAt,
    coverImage{ asset->{ url, metadata{ dimensions, lqip } } }
  }
}
`;
