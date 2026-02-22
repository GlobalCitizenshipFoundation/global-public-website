import type {
  AttendanceMode,
  EventLifecycleStatus,
  EventPartnerGroup,
  EventSingleType,
} from "@gcf/types";
import type { PortableTextBlock } from "@portabletext/types";

import type { getSocialLinksFromCMS } from "@/features/social/ui/getSocialMediaFromCMS";

export type EventSpeaker = NonNullable<EventSingleType["speakers"]>[number];
export type EventSteeringMember = NonNullable<EventSingleType["steeringCommittee"]>[number];
export type EventParticipant = EventSpeaker | EventSteeringMember;

export type PanelBaseVM = {
  eventHeading?: string;
  eventTypeLabel?: string;

  attendanceMode: AttendanceMode;

  startDateTime: string;
  endDateTime?: string;

  marketingMention?: PortableTextBlock[];
  promoMessage?: PortableTextBlock[];

  lifecycleStatus: EventLifecycleStatus;

  ctaUpcoming?: { label?: string | null; url?: string | null } | null;
  ctaStarted?: { label?: string | null; url?: string | null } | null;
  ctaEnded?: { label?: string | null; url?: string | null } | null;

  // jeśli masz venue w panelBase, dodaj:
  // venue?: EventSingleType["venue"];
};

export type EventSingleVM = {
  speakers: EventSpeaker[];
  steering: EventSteeringMember[];
  combinedParticipants: EventParticipant[];

  lifecycleStatus: EventLifecycleStatus;
  socialLinks: ReturnType<typeof getSocialLinksFromCMS>;
  partnerGroups: EventPartnerGroup[];

  audience: NonNullable<EventSingleType["audience"]>;

  headings: {
    intro: string;
    video: string;
    body: string;
    agenda: string;
    partners: string;
    registration: string;
    speakers: string;
    steering: string;
  };

  show: {
    intro: boolean;
    video: boolean;
    body: boolean;
    agenda: boolean;
    topics: boolean;
    registration: boolean;
    audience: boolean;
  };

  panelBase: PanelBaseVM;

  hero: {
    imageUrl: string | null;
    alt: string;
  };

  introText: EventSingleType["introText"] | null;
  videoLink: string | null;
  body: EventSingleType["body"] | null;

  agendaDescription: EventSingleType["agendaDescription"] | null;
  agenda: EventSingleType["agenda"] | null;

  topics: EventSingleType["topics"] | null;

  registrationText: EventSingleType["registrationText"] | null;
};
