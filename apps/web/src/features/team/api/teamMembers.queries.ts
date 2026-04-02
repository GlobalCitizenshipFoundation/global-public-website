export const TEAM_MEMBERS_LIST_QUERY = `
  *[_type == "teamMember"] | order(name asc) {
    _id,
    "member": "teamMember",
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

export const TEAM_MEMBERS_BY_SLUG_QUERY = `
  *[_type == "teamMember" && slug.current == $slug][0]{
    _id,
    "member": "teamMember",
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
    header,
    profileColour,
    textColour
  }
`;
