type EnvKey =
  | "SANITY_STUDIO_PROJECT_ID"
  | "SANITY_STUDIO_DATASET"
  | "SANITY_PROJECT_ID"
  | "SANITY_DATASET"
  | "SANITY_STUDIO_APP_ID"
  | "SANITY_APP_ID";

function readEnv(...keys: EnvKey[]): string {
  for (const key of keys) {
    const v = process.env[key];
    if (v && v.trim() !== "") return v;
  }
  throw new Error(`[CMS] Missing env var. Tried: ${keys.join(", ")}`);
}

export const env = {
  projectId: readEnv("SANITY_STUDIO_PROJECT_ID", "SANITY_PROJECT_ID"),
  dataset: readEnv("SANITY_STUDIO_DATASET", "SANITY_DATASET"),
  appId: readEnv("SANITY_STUDIO_APP_ID", "SANITY_APP_ID"),
} as const;
