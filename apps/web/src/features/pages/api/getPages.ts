import { sanityClient } from "@/shared/sanity/client";
import type { PageSingleType } from "@gcf/types";

import { PAGES_LIST_QUERY } from "./pages.queries";

export async function getPages(): Promise<PageSingleType[]> {
  return sanityClient.fetch(PAGES_LIST_QUERY);
}
