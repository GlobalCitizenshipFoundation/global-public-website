import { createClient } from "@sanity/client";

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export const sanityWriteClient = createClient({
  projectId: requireEnv("SANITY_PROJECT_ID"),
  dataset: requireEnv("SANITY_DATASET"),
  apiVersion: requireEnv("SANITY_API_VERSION"),
  token: requireEnv("SANITY_WRITE_TOKEN"),
  useCdn: false,
});
