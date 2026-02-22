import {
  article,
  articleCategory,
  contributorSingle,
  eventSingle,
  magazinSingle,
  partnersSingle,
} from "./documents";
import {
  agendaDay,
  agendaPerson,
  agendaSession,
  audioCard,
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
  audioCard,

  // documents
  eventSingle,
  contributorSingle,
  partnersSingle,
  magazinSingle,
  article,
  articleCategory,
];
