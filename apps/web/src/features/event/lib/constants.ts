import type { PartnerGroupTypeKey } from "@gcf/types";

export const staticSocials = {
  twitter: "https://twitter.com/",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  linkedin: "https://www.linkedin.com/",
  youtube: "https://www.youtube.com/",
} as const;

export const PARTNER_LABEL: Record<PartnerGroupTypeKey, string> = {
  hostedBy: "Hosted by",
  eventPartners: "Event Partners",
  knowledgePartners: "Knowledge Partners",
};
