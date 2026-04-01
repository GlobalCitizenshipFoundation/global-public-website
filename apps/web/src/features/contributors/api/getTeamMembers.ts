import { sanityClient } from "@/shared/sanity/client";
import type { RelatedTeamMembersType } from "@gcf/types";

import { TEAM_MEMBERS_LIST_QUERY } from "./teamMembers.queries";

export async function getTeamMembers(): Promise<RelatedTeamMembersType[]> {
  return sanityClient.fetch(TEAM_MEMBERS_LIST_QUERY);
}
