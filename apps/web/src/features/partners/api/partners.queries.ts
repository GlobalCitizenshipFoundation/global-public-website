export const PARTNERS_LIST_QUERY = `
  *[_type == "partnersSingle"] | order(title asc) {
    _id,
    slug,
    title,
    logo {
      asset->{
        url
      }
    }
  }
`;

export const PARTNER_BY_SLUG_QUERY = `
  *[_type == "partnersSingle" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    country,
    headerImage{ asset->{url} },
    logo{ asset->{url} },
    shotrDescription,
    body,
    twitter,
    instagram,
    facebook,
    youtube,
    linkedin,
    websiteText,
    websiteUrl,
    quote,
    partnerProfile
  }
`;
