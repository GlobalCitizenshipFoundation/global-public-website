import { createClient } from "@sanity/client";

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export const sanityWriteClient = createClient({
  projectId: requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: requireEnv("NEXT_PUBLIC_SANITY_DATASET"),
  apiVersion: requireEnv("NEXT_PUBLIC_SANITY_API_VERSION"),
  token: requireEnv("SANITY_WRITE_TOKEN"),
  useCdn: false,
});
