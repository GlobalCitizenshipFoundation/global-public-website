import type { PortableTextBlock } from "../sanity/portableText";

export interface PartnerSingleType {
  _id: string;
  title: string;
  slug: { current: string };
  country: string;
  headerImage?: { asset: { url: string } };
  logo?: { asset: { url: string } };
  shotrDescription?: string;
  body?: PortableTextBlock;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  websiteText?: string;
  websiteUrl?: string;
  quote?: string;
  partnerProfile?: string;
}

export type RelatedPartnersType = Pick<PartnerSingleType, "_id" | "slug" | "logo" | "title">;
