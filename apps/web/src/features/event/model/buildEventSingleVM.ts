import type { EventSingleType } from '@gcf/types';
import type { EventSingleVM } from './types';

import { getSocialLinksFromCMS } from '@/features/social/ui/getSocialMediaFromCMS';

import { staticSocials } from '../lib/constants';
import { uniqById } from '../lib/uniqById';
import { computeLifecycleStatus } from '../lib/computeLifecycleStatus';
import { getPartnerGroups } from '../lib/getPartnerGroups';
import { getEventTypeLabel } from '../lib/getEventTypeLabel';
import { pickDefined } from '../lib/pickDefined';

export function buildEventSingleVM(event: EventSingleType): EventSingleVM {
  const speakers = uniqById(event.speakers);
  const steering = uniqById(event.steeringCommittee);

  const combinedParticipants = uniqById([...steering, ...speakers]);

  const lifecycleStatus = computeLifecycleStatus(event);
  const socialLinks = getSocialLinksFromCMS(staticSocials);
  const partnerGroups = getPartnerGroups(event);

  const audience = event.audience ?? [];

  const headings = {
    intro: event.introHeading?.trim() || 'Introduction',
    video: event.videoHeading?.trim() || 'Intro Video',
    body: event.bodyHeading?.trim() || 'Details',
    agenda: event.agendaHeading?.trim() || 'Agenda',
    partners: event.partnersHeading?.trim() || 'Conference Partners',
    registration: event.registrationHeading?.trim() || 'Registration',
    speakers: event.speakersHeading?.trim() || 'Speakers',
    steering: event.steeringCommitteeHeading?.trim() || 'Steering Committee',
  };

  const show = {
    intro: Boolean(event.introText?.length),
    video: Boolean(event.videoLink),
    body: Boolean(event.body?.length),
    agenda: Boolean(
      event.agendaHeading?.trim() || event.agendaDescription?.length || event.agenda?.length
    ),
    topics: Boolean(event.topics?.length),
    registration: Boolean(event.registrationText?.length),
    audience: audience.length > 0,
  };

  const panelBase: EventSingleVM['panelBase'] = {
    eventHeading: event.eventHeading ?? 'Event',
    eventTypeLabel: getEventTypeLabel(event.eventType),
    pricing: event.pricing,
    attendanceMode: event.attendanceMode,
    startDateTime: event.startDateTime,
    ...pickDefined({
      endDateTime: event.endDateTime,
      lifecycleStatus,
      marketingMention: event.marketingMention,
      promoMessage: event.promoMessage,
      ctaUpcoming: event.panelCtaUpcoming,
      ctaStarted: event.panelCtaStarted,
      ctaEnded: event.panelCtaEnded,
      venue: event.venue,
    }),
  } as EventSingleVM['panelBase'];

  const hero = {
    imageUrl: event.eventImage?.asset?.url ?? null,
    alt: event.eventHeading ? `${event.eventHeading} image` : 'Event image',
  };

  return {
    speakers,
    steering,
    combinedParticipants,
    lifecycleStatus,
    socialLinks,
    partnerGroups,
    headings,
    show,
    panelBase,
    hero,
    audience,
  };
}
