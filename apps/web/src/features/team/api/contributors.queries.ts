export const CONTRIBUTORS_LIST_QUERY = `
  *[_type == "contributorSingle"] | order(name asc) {
    _id,
    "member": "contributor",
    name,
    slug,
    designation,
    photo {
      asset->{
        url,
        metadata { dimensions }
      }
    }
  }
`;

export const CONTRIBUTOR_BY_SLUG_QUERY = `
  *[_type == "contributorSingle" && slug.current == $slug][0]{
    _id,
    "member": "contributor",
    title,
    name,
    slug,
    photo {
      asset->{
        url,
        metadata { dimensions, lqip }
      }
    },
    gender,
    designation,
    organization,
    country,
    emailId,
    emailDisplay,
    orcidId,
    twitter,
    linkedin,
    instagram,
    facebook,
    website,
    featuredProfile,
    shortBio,
    bio,
    relatedProfiles[]->{
      _id,
      name,
      title,
      slug
    },
    articleDisplay,
    eventsDisplay,
    tags[]->{
      _id,
      title,
      slug
    },
    "events": *[_type == "eventSingle" && references(^._id)] | order(startDateTime desc) {
      _id,
      slug,
      eventHeading,
      startDateTime,
      eventImage { asset->{ url } }
    },
    header,
    profileColour,
    textColour
  }
`;
