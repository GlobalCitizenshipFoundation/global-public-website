export const ARTICLE_BY_SLUG_QUERY = `
*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  publishedAt,
  category -> {
    _id,
    title,
    description
  },
  coverImage{
    asset->{ url, metadata{ dimensions, lqip } }
  },
  "audioUrl": audio.asset->url,
  body,
  endText,
  sources,
  readingLength,
  "authors": authors[]->{
  name,
  title,
  photo { asset->{ url } },
  slug
},
  partners[]->{
    _id,
    title,
    slug,
    logo{ asset->{ url } }
  }
}
`;
