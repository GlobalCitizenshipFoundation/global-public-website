import type { PortableTextBlock } from "../sanity/portableText";
import type { ArticleListItemType } from "./article";
import type { EventCard } from "./event";

export interface ContributorCard {
  _id: string;
  member?: string;
  slug?: { current: string };
  name?: string;

  photo?: {
    asset: {
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
          aspectRatio: number;
        };
        lqip?: string;
      };
    };
  };

  designation?: string;
  organization?: string;
  country?: string;
}

export interface ContributorSingleType {
  _id: string;
  member?: string;
  title?: string;
  name?: string;
  slug?: { current: string };

  photo?: {
    asset: {
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
          aspectRatio: number;
        };
        lqip?: string;
      };
    };
  };

  gender?: "male" | "female";
  designation?: string;
  organization?: string;
  country?: string;

  emailId?: string;
  emailDisplay?: boolean;
  orcidId?: string;

  twitter?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  website?: string;

  featuredProfile?: boolean;
  shortBio?: string;
  bio?: PortableTextBlock;

  relatedProfiles?: Array<{
    _id: string;
    name: string;
    title?: string;
    slug?: { current: string };
  }>;

  articleDisplay?: boolean;
  eventsDisplay?: boolean;

  articles?: Array<ArticleListItemType>;
  events?: Array<EventCard>;
  tags?: Array<string>;
  mentors?: Array<ContributorCard>;
  mentees?: Array<ContributorCard>;

  header?: string;
  profileColour?: string;
  textColour?: string;
}

export type RelatedContributorsType = Pick<
  ContributorSingleType,
  "_id" | "member" | "slug" | "name" | "photo" | "designation" | "organization" | "country"
>;
