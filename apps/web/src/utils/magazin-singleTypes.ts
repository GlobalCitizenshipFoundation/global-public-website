import { PortableTextBlock } from '@portabletext/react';

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

export interface MagazinSingleType {
  _id: string;
  title: string;
  slug?: {
    _type: 'slug';
    current: string;
  };
  issue: number;
  magazinImage?: SanityImage;
  introText?: PortableTextBlock[];
  shortIntro?: string;
  date: string;
  downloadPdf: string;
  downloadEpub: string;
  mastheadHeading: string;
}

export type RelatedMagazinType = Pick<MagazinSingleType, '_id' | 'slug' | 'magazinImage' | 'date'>;
