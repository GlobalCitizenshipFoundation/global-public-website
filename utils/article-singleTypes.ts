import { PortableTextBlock } from '@portabletext/react';
import { RelatedContributorsType } from './contributor-singleTypes';
import { RelatedPartnersType } from './partners-singleTypes';

interface ImageDimensions {
  _type: 'sanity.imageDimensions';
  aspectRatio: number;
  width: number;
  height: number;
}

interface SanityImageAsset {
  url: string;
  metadata: {
    dimensions: ImageDimensions;
    lqip: string;
  };
}

interface SanityImage {
  asset: SanityImageAsset;
}

export interface ArticleSingleType {
  _id: string;
  articleHeading: PortableTextBlock[];
  slug?: {
    _type: 'slug';
    current: string;
  };
  articleImage?: SanityImage;
  introText?: PortableTextBlock[];
  readingLength?: number;
  authors: string[] //do podmiany na tablice autorow
  disclosureStatement: PortableTextBlock[];
  partners: RelatedPartnersType[];
  body?: PortableTextBlock[];
  endText?: PortableTextBlock[];
}

export type RelatedArticleProps = Pick<
  ArticleSingleType,
  '_id' | 'slug' | 'articleHeading' | 'articleImage'
>;
