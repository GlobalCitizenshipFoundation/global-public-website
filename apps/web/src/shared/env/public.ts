import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1),
});

function env(name: keyof typeof publicSchema.shape) {
  return process.env[name];
}

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: env("NEXT_PUBLIC_SITE_URL"),
  NEXT_PUBLIC_SANITY_PROJECT_ID: env("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  NEXT_PUBLIC_SANITY_DATASET: env("NEXT_PUBLIC_SANITY_DATASET"),
  NEXT_PUBLIC_SANITY_API_VERSION: env("NEXT_PUBLIC_SANITY_API_VERSION"),
});
