import { sanityClient } from '@/client';
import { MagazinSingleType } from '../utils/magazin-singleTypes';

export const getMagazin = async (): Promise<MagazinSingleType[]> => {
  return await sanityClient.fetch(`
    *[_type == "magazinSingle"]{
      _id,
      slug,
      date,
      title,
      magazinImage{
        asset->{url}
      },
    }
  `);
};

export const getMagazinBySlug = async (slug: string): Promise<MagazinSingleType | null> => {
  return await sanityClient.fetch(
    `*[_type == "magazinSingle" && slug.current == $slug][0]{
            _id,
            title,
            slug,
            issue,
            magazinImage{
              asset->{url}
            },
            introText,
            shortIntro,
            date,
            downloadPdf,
            downloadEpub,
            mastheadHeading
        }`,
    { slug }
  );
};
