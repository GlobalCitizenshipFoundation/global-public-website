import { sanityClient } from '@/client';
import { ArticleSingleType } from '../utils/article-singleTypes';

export const getArticleBySlug = async (slug: string): Promise<ArticleSingleType | null> => {
  return await sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0]{
      _id,
      articleHeading,
      slug,
      articleImage {
        asset->{
          url,
          metadata { dimensions, lqip }
        }
      },
      introText,
      readingLength,
      authors,
      disclosureStatement,
      partners[]->{
        _id,
        slug,
        title,
        logo {
          asset->{
            url
          }
        }
      },
      body,
      endText
    }`,
    { slug }
  );
};