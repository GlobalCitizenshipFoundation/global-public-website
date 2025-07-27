import { PortableTextBlock } from "@portabletext/react"
import { EventSingleType, RelatedEventProps } from "./event-singleTypes"

export interface ContributorSingleType {
  _id: string
  title?: string
  name?: string
  slug?: {
    current: string
  }
  photo?: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
          aspectRatio: number
        }
        lqip?: string
      }
    }
  }
  gender?: 'male' | 'female'
  designation?: string
  organization?: string
  country?: string
  emailId?: string
  emailDisplay?: boolean
  orcidId?: string
  twitter?: string
  linkedin?: string
  instagram?: string
  facebook?: string
  website?: string
  featuredProfile?: boolean
  shortBio?: string
  bio?: PortableTextBlock
  relatedProfiles?: Array<{
    _id: string
    name: string
    title?: string
    slug?: {
      current: string
    }
  }>
  articleDisplay?: boolean
  eventsDisplay?: boolean
  events?: Array<
    Pick<
      EventSingleType,
      "_id" | "slug" | "eventHeading" | "eventImage" | "startDateTime"
    >
  >;
  header?: string
  profileColour?: string
  textColour?: string
}

export type RelatedContributorsType = Pick<ContributorSingleType, "_id" | "slug" | "name" | "photo" | "designation">;

