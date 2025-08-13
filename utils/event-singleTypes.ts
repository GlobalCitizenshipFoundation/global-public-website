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

export interface EventSingleType {
  _id: string;
  eventHeading?: string;
  slug?: {
    _type: 'slug';
    current: string;
  };
  eventImage?: SanityImage;
  pricing?: string;
  status?: string;
  attedanceMode?: string;
  startDateTime?: string;
  endDateTime?: string;
  marketingMention?: PortableTextBlock[];
  price?: number;
  registrationDeadline?: string;
  seatingCapacity?: number;
  currentRegistrations?: number;
  registrationStatus?: string;
  financialAid?: PortableTextBlock[];
  buttonPrimary?: string;
  introText?: PortableTextBlock[];
  body?: PortableTextBlock[];
  venue?: string;
  promoMessage?: PortableTextBlock[];
  buttonSecondary?: string;
  buttonTertiary?: string;
  audience?: string[];
  agendaHeading?: string;
  agendaDescription?: PortableTextBlock[];
  endText?: PortableTextBlock[];
  addToCalendarUrl?: string;
  speakers: RelatedContributorsType[];
  steeringCommittee: RelatedContributorsType[];
  partners: RelatedPartnersType[];
  speakersText: PortableTextBlock[];
}

export type RelatedEventProps = Pick<
  EventSingleType,
  '_id' | 'slug' | 'eventHeading' | 'eventImage' | 'startDateTime'
>;
