import type { PortableTextBlock } from '../sanity/portableText';
import type { SanityImage } from '../sanity/image';
import type { RelatedContributorsType } from './contributor';
import type { RelatedPartnersType } from './partner';

export interface EventSingleType {
  _id: string;
  eventHeading?: string;
  slug?: { _type: 'slug'; current: string };
  eventImage?: SanityImage;

  pricing?: string;
  status?: string;
  attendanceMode?: string;
  startDateTime?: string;
  endDateTime?: string;
  eventType?: 'conference' | 'consultation' | 'panel_discussion' | 'forum';

  marketingMention?: PortableTextBlock[];
  price?: { amount?: number; currency?: string } | null;
  registrationDeadline?: string;
  seatingCapacity?: number;
  currentRegistrations?: number;
  registrationStatus?: string;

  financialAid?: PortableTextBlock[];
  buttonPrimary?: string;
  introText?: PortableTextBlock[];
  videoLink?: string | null;
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
  hostedBy: RelatedPartnersType[];
  eventPartners: RelatedPartnersType[];
  knowledgePartners: RelatedPartnersType[];

  speakersText: PortableTextBlock[];
}

export type RelatedEventProps = Pick<
  EventSingleType,
  '_id' | 'slug' | 'eventHeading' | 'eventImage' | 'startDateTime'
> & {
  eventType?: 'conference' | 'consultation' | 'panel_discussion' | 'forum';
};
