import {
  article,
  articleCategory,
  contributorSingle,
  eventSingle,
  magazinSingle,
  partnersSingle,
  teamMember,
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
  teamMember,
  partnersSingle,
  magazinSingle,
  article,
  articleCategory,
];
