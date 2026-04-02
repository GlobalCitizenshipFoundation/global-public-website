import { sanityClient } from "@/shared/sanity/client";
import type { ProfileCardType } from "@gcf/types";

import { TEAM_MEMBERS_LIST_QUERY } from "./teamMembers.queries";

export async function getTeamMembers(): Promise<ProfileCardType[]> {
  return sanityClient.fetch(TEAM_MEMBERS_LIST_QUERY);
}
