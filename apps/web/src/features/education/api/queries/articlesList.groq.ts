const ARTICLES_LIST_FILTER = `
  _type == "article"
  && defined(slug.current)
  && ($q == "" || title match ("*" + $q + "*"))
  && ($categoryId == "" || category._ref == $categoryId)
`;

export const ARTICLES_LIST_BASE = `
{
  "total": count(*[${ARTICLES_LIST_FILTER}]),
  "items": *[${ARTICLES_LIST_FILTER}]
    | ORDER_CLAUSE
    [$start...$end]{
      _id,
      title,
      slug,
      description,
      readingLength,
      category -> {
    _id,
    name,
    description
  },
      publishedAt,
      coverImage{
        asset->{
          url,
          metadata{ dimensions, lqip }
        }
      }
    }
}
`;
