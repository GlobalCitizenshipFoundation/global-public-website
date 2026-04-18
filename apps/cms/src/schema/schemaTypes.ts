import {
  article,
  articleCategory,
  contributorSingle,
  eventSingle,
  magazinSingle,
  pages,
  partnersSingle,
  tag,
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
  tag,
  teamMember,
  partnersSingle,
  magazinSingle,
  pages,
  article,
  articleCategory,
];
