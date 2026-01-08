import { sanityClient } from '@/client';
import { PartnerSingleType, RelatedPartnersType } from '../utils/partners-singleTypes';

export const getPartners = async (): Promise<RelatedPartnersType[]> => {
  return await sanityClient.fetch(`
    *[_type == "partnersSingle"]{
      _id,
      slug,
      title,
      logo {
        asset->{
          url
        }
      }
    }
  `);
};

export const getPartnerBySlug = async (slug: string): Promise<PartnerSingleType | null> => {
  return await sanityClient.fetch(
    `*[_type == "partnersSingle" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    country,
    headerImage{
      asset->{url}
    },
    logo{
      asset->{url}
    },
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
    partnerProfile,
  }`,
    { slug }
  );
};
