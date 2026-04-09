import { sanityClient } from "@/shared/sanity/client";
import type { ProfileCardType } from "@gcf/types";

import { CONTRIBUTORS_LIST_QUERY } from "./contributors.queries";

export async function getContributors(): Promise<ProfileCardType[]> {
  return sanityClient.fetch(CONTRIBUTORS_LIST_QUERY);
}
