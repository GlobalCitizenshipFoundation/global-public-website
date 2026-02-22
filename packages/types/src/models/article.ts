interface ImageDimensions {
  _type: "sanity.imageDimensions";
  aspectRatio: number;
  width: number;
  height: number;
}

interface SanityImageAsset {
  url: string;
  metadata: {
    dimensions: ImageDimensions;
    lqip?: string;
  };
}

interface SanityImage {
  asset: SanityImageAsset;
}

export interface ArticleListItemType {
  _id: string;
  title: string;
  slug?: {
    _type: "slug";
    current: string;
  };
  description?: string;
  publishedAt: string;
  coverImage?: SanityImage;
}

interface ImageDimensions {
  _type: "sanity.imageDimensions";
  aspectRatio: number;
  width: number;
  height: number;
}

interface SanityImageAsset {
  url: string;
  metadata: {
    dimensions: ImageDimensions;
    lqip?: string;
  };
}

interface SanityImage {
  asset: SanityImageAsset;
}

export interface ArticleSingleCmsType {
  _id: string;
  title: string;
  slug?: {
    _type: "slug";
    current: string;
  };
  description?: string;
  publishedAt: string;
  coverImage?: SanityImage;
  audioUrl?: string;
  body?: import("@portabletext/react").PortableTextBlock[];
}
