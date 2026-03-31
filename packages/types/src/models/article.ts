import type { PortableTextBlock } from "@portabletext/types";
import type { PartnerSingleType } from "./partner";

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

export interface CategoryType {
  _id: string;
  name: string;
  description: string;
}

export interface ArticleListItemType {
  _id: string;
  title: string;
  slug?: Slug;
  description?: string;
  publishedAt: string;
  coverImage?: SanityImage;
  category?: CategoryType;
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
