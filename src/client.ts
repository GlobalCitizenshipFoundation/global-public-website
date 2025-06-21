import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "b7aenutv",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-06-21",
});
