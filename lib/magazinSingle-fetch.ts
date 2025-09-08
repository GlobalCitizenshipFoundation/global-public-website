import { sanityClient } from '@/client';
import { MagazinSingleType } from '../utils/magazin-singleTypes';

export const getMagazinBySlug = async (slug: string): Promise<MagazinSingleType | null> => {
  return await sanityClient.fetch(
    `*[_type == "eventSingle" && slug.current == $slug][0]{
            _id,
            slug,
            issue,
            magazinImage,
            introText,
            shortIntro,
            data,
            downloadPdf,
            downloadEpub,
            mastheadHeading
        }`,
    { slug }
  );
};
