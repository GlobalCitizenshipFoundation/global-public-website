export const MAGAZINE_LIST_QUERY = `
  *[_type == "magazinSingle"] | order(date desc) {
    _id,
    slug,
    date,
    title,
    magazinImage{
      asset->{ url }
    }
  }
`;

export const MAGAZINE_BY_SLUG_QUERY = `
  *[_type == "magazinSingle" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    issue,
    magazinImage{ asset->{ url } },
    introText,
    shortIntro,
    date,
    downloadPdf,
    downloadEpub,
    mastheadHeading
  }
`;
