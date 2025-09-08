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

export interface MagazinSingleType {
  _id: string;
  slug?: {
    _type: 'slug';
    current: string;
  };
  issue: number;
  magazinImage?: SanityImage;
  introText?: PortableTextBlock[];
  shortIntro?: string;
  data: string;
  downloadPdf: string;
  downloadEpub: string;
  mastheadHeading: string;
}
