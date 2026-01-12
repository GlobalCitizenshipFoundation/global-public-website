export interface SanityImageDimensions {
  _type: 'sanity.imageDimensions';
  aspectRatio: number;
  width: number;
  height: number;
}

export interface SanityImageAsset {
  url: string;
  metadata?: {
    dimensions?: SanityImageDimensions;
    lqip?: string;
  };
}

export interface SanityImage {
  asset: SanityImageAsset;
}
