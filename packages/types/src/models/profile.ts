import type { PortableTextBlock } from "../sanity/portableText";
import type { ArticleListItemType } from "./article";
import type { EventCard } from "./event";
import type { TagSingleType } from "./tags";

export type ProfileCard = {
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

  twitter?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
};

export interface ProfileSingleType extends ProfileCard {
  gender?: "male" | "female";
  emailId?: string;
  emailDisplay?: boolean;
  orcidId?: string;

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
  tags?: TagSingleType[];
  mentors?: Array<ProfileCard>;
  mentees?: Array<ProfileCard>;

  header?: string;
  profileColour?: string;
  textColour?: string;
}

export type ProfileCardType = Pick<
  ProfileSingleType,
  | "_id"
  | "member"
  | "slug"
  | "name"
  | "photo"
  | "designation"
  | "organization"
  | "country"
  | "twitter"
  | "linkedin"
  | "instagram"
  | "facebook"
  | "website"
>;
