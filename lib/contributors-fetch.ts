import { sanityClient } from "@/client";
import { ContributorSingleType, RelatedContributorsType } from "../utils/contributor-singleTypes";

export const getContributors = async (): Promise<RelatedContributorsType[]> => {
  return await sanityClient.fetch(`
    *[_type == "contributorSingle"]{
      _id,
      name,
      slug,
      designation,
      photo { asset->{ url, metadata { dimensions } } }
    }
  `);
};

export const getContributorBySlug = async (slug: string): Promise<ContributorSingleType | null> => {
  return await sanityClient.fetch(
    `*[_type == "contributorSingle" && slug.current == $slug][0]{
      _id,
      title,
      name,
      slug,
      photo { asset->{ url, metadata { dimensions, lqip } } },
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
      event->{
        _id,
        title,
        slug
      },
      "events": *[_type == "eventSingle" && references(^._id)]{
        _id,
        eventHeading,
        slug,
        startDateTime,
        eventImage { asset->{ url } }
      },
      header,
      profileColour,
      textColour
    }`,
    { slug }
  );
};
