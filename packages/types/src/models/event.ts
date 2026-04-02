import type { SanityImage } from "../sanity/image";
import type { PortableTextBlock } from "../sanity/portableText";
import type { RelatedPartnersType } from "./partner";
import type { ProfileCardType } from "./profile";

export type EventType = "conference" | "consultation" | "panel_discussion" | "forum";
export type PricingStatus = "free" | "paid";
export type AttendanceMode = "onSite" | "online" | "hybrid";
export type AgendaSessionType = "panel_discussion" | "learning_session";

export type EventCard = Pick<
  EventSingleType,
  "_id" | "slug" | "eventHeading" | "eventType" | "eventImage" | "startDateTime" | "endDateTime"
>;

export type CtaButton = {
  label?: string;
  url?: string;
} | null;

export type Money = {
  amount?: number;
  currency: string;
};

export type PartnerGroupTypeKey = "hostedBy" | "eventPartners" | "knowledgePartners";

export type EventPartnerGroup = {
  _key: string;
  type: PartnerGroupTypeKey;
  items: RelatedPartnersType[];
};

export type AgendaPerson = {
  _key: string;
  person: ProfileCardType;
};

export type AgendaSession = {
  _key: string;
  type: AgendaSessionType;
  title: string;
  startAt: string;
  endAt: string;
  description?: PortableTextBlock[];
  moderators?: AgendaPerson[];
  panelists?: AgendaPerson[];
};

export type AgendaDay = {
  _key: string;
  date: string;
  sessions: AgendaSession[];
};

type EventSingleBase = {
  _id: string;

  eventHeading: string;
  slug: { _type: "slug"; current: string };

  eventType: EventType;
  pricing: PricingStatus;

  attendanceMode: AttendanceMode;
  venue?: string;

  startDateTime: string;
  endDateTime?: string;

  eventImage?: SanityImage;

  marketingMention?: PortableTextBlock[];

  introHeading?: string;
  introText?: PortableTextBlock[];

  bodyHeading?: string;
  body: PortableTextBlock[];

  promoMessage?: PortableTextBlock[];

  videoHeading?: string;
  videoLink?: string;

  audience?: string[];
  topics?: string[];

  agendaHeading?: string;
  agendaDescription?: PortableTextBlock[];
  agenda?: AgendaDay[];

  speakersHeading?: string;
  speakersText?: PortableTextBlock[];
  speakers?: ProfileCardType[];

  steeringCommitteeHeading?: string;
  steeringCommitteeText?: PortableTextBlock[];
  steeringCommittee?: ProfileCardType[];

  partnersHeading?: string;
  partnersText?: PortableTextBlock[];
  partners?: EventPartnerGroup[];

  registrationHeading?: string;
  registrationText?: PortableTextBlock[];

  buttonSecondary?: CtaButton;
  buttonTertiary?: CtaButton;

  panelCtaUpcoming?: CtaButton;
  panelCtaStarted?: CtaButton;
  panelCtaEnded?: CtaButton;

  price?: Money;
};

export type EventSingleFree = EventSingleBase & { pricing: "free" };

export type EventSinglePaid = EventSingleBase & { pricing: "paid"; price: Money };

export type EventSingleType = EventSingleFree | EventSinglePaid;

export type EventLifecycleStatus = "upcoming" | "started" | "ended";

export type EventSingleViewModel = EventSingleType & {
  lifecycleStatus: EventLifecycleStatus;
};
