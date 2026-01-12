type EnvKey = 'SANITY_STUDIO_PROJECT_ID' | 'SANITY_STUDIO_DATASET';

function readEnv(key: EnvKey): string {
  const v = process.env[key];
  if (!v || v.trim() === '') {
    throw new Error(`[CMS] Missing environment variable: ${key}`);
  }
  return v;
}

export const env = {
  projectId: readEnv('SANITY_STUDIO_PROJECT_ID'),
  dataset: readEnv('SANITY_STUDIO_DATASET'),
} as const;
