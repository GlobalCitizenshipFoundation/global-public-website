import type { PortableTextBlock } from "../sanity/portableText";

export interface TeamMemberSingleType {
  _id: string;
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

  header?: string;
  profileColour?: string;
  textColour?: string;
}

export type RelatedTeamMembersType = Pick<
  TeamMemberSingleType,
  "_id" | "slug" | "name" | "photo" | "designation" | "organization" | "country"
>;
