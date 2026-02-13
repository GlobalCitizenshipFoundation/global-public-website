import { sanityClient } from '@/client';
import { ArticleSingleType, RelatedArticleProps } from '../utils/article-singleTypes';

export const getArticles = async (): Promise<RelatedArticleProps[]> => {
  return await sanityClient.fetch(`
    *[_type == "article"]{
      _id,
      slug,
      articleHeading,
      articleImage {
        asset->{
          url,
          metadata { dimensions }
        }
      },
      "readingLength": readingLength
    }
  `);
};

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
      endText,
      sources
    }`,
    { slug }
  );
};