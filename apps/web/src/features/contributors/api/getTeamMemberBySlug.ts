import { sanityClient } from "@/shared/sanity/client";
import type { TeamMemberSingleType } from "@gcf/types";

import { TEAM_MEMBERS_BY_SLUG_QUERY } from "./teamMembers.queries";

export async function getTeamMemberBySlug(slug: string): Promise<TeamMemberSingleType | null> {
  if (!slug) return null;

  return sanityClient.fetch(TEAM_MEMBERS_BY_SLUG_QUERY, { slug });
}
