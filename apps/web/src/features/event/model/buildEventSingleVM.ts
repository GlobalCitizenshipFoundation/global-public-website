import type { EventSingleType } from "@gcf/types";
import { getSocialLinksFromCMS } from "@/features/social/ui/getSocialMediaFromCMS";
import { computeLifecycleStatus } from "../lib/computeLifecycleStatus";

import { staticSocials } from "../lib/constants";
import { getEventTypeLabel } from "../lib/getEventTypeLabel";
import { getPartnerGroups } from "../lib/getPartnerGroups";
import { pickDefined } from "../lib/pickDefined";
import { uniqById } from "../lib/uniqById";
import type { EventSingleVM } from "./types";

/**
 * Senior 2026 rule:
 * - UI should not need non-null assertions.
 * - VM should carry "safe snapshots" of optional CMS fields (or null),
 *   so rendering can be based on vm.show + vm.<field> consistently.
 */
export function buildEventSingleVM(event: EventSingleType): EventSingleVM {
  const speakers = uniqById(event.speakers);
  const steering = uniqById(event.steeringCommittee);
  const combinedParticipants = uniqById([...steering, ...speakers]);

  const lifecycleStatus = computeLifecycleStatus(event);
  const socialLinks = getSocialLinksFromCMS(staticSocials);
  const partnerGroups = getPartnerGroups(event);

  const audience = event.audience ?? [];

  // Safe "snapshots" (avoid UI doing `event.foo!`)
  const introText = event.introText?.length ? event.introText : null;
  const videoLink =
    typeof event.videoLink === "string" && event.videoLink.trim() ? event.videoLink : null;
  const body = event.body?.length ? event.body : null;

  const agendaDescription = event.agendaDescription?.length ? event.agendaDescription : null;
  const agenda = event.agenda?.length ? event.agenda : null;

  const topics = event.topics?.length ? event.topics : null;

  const registrationText = event.registrationText?.length ? event.registrationText : null;

  const headings = {
    intro: event.introHeading?.trim() || "Introduction",
    video: event.videoHeading?.trim() || "Intro Video",
    body: event.bodyHeading?.trim() || "Details",
    agenda: event.agendaHeading?.trim() || "Agenda",
    partners: event.partnersHeading?.trim() || "Conference Partners",
    registration: event.registrationHeading?.trim() || "Registration",
    speakers: event.speakersHeading?.trim() || "Speakers",
    steering: event.steeringCommitteeHeading?.trim() || "Steering Committee",
  };

  const show = {
    intro: Boolean(introText),
    video: Boolean(videoLink),
    body: Boolean(body),
    agenda: Boolean(
      (event.agendaHeading?.trim() && event.agendaHeading.trim().length > 0) ||
        agendaDescription ||
        agenda,
    ),
    topics: Boolean(topics),
    registration: Boolean(registrationText),
    audience: audience.length > 0,
  };

  const panelBase: EventSingleVM["panelBase"] = {
    eventHeading: event.eventHeading ?? "Event",
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
  } as EventSingleVM["panelBase"];

  const hero = {
    imageUrl: event.eventImage?.asset?.url ?? null,
    alt: event.eventHeading ? `${event.eventHeading} image` : "Event image",
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

    // expose snapshots for UI
    introText,
    videoLink,
    body,
    agendaDescription,
    agenda,
    topics,
    registrationText,
  };
}
