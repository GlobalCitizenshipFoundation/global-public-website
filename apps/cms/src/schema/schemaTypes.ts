import {
  article,
  contributorSingle,
  eventSingle,
  magazinSingle,
  partnersSingle,
} from "./documents";
import {
  agendaDay,
  agendaPerson,
  agendaSession,
  ctaButton,
  richImage,
  venueLocation,
} from "./objects";

export const schemaTypes = [
  // objects
  ctaButton,
  venueLocation,
  agendaPerson,
  agendaSession,
  agendaDay,
  richImage,

  // documents
  eventSingle,
  contributorSingle,
  partnersSingle,
  magazinSingle,
  article,
];
