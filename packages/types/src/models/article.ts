import type { PartnerSingleType } from "./partner";
import type { PortableTextBlock } from "@portabletext/types";

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

type Slug = {
  _type: "slug";
  current: string;
};

export interface ArticleListItemType {
  _id: string;
  title: string;
  slug?: Slug;
  description?: string;
  publishedAt: string;
  coverImage?: SanityImage;

  // ✅ z CMS (webhook go uzupełnia)
  readingLength?: number;
}

export interface ArticleSingleCmsType {
  _id: string;
  title: string;
  slug?: Slug;
  description?: string;
  publishedAt: string;
  coverImage?: SanityImage;
  audioUrl?: string;
  body?: PortableTextBlock[];
  endText?: PortableTextBlock[];
  sources?: PortableTextBlock[];
  authors?: string[];
  partners?: PartnerSingleType[];
  // ✅ z CMS (webhook go uzupełnia)
  readingLength?: number;
}
