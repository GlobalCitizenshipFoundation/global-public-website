import { defineCliConfig } from "sanity/cli";

function readCliEnv(key: string) {
  const v = process.env[key];
  return v && v.trim() !== "" ? v : undefined;
}

const projectId = readCliEnv("SANITY_STUDIO_PROJECT_ID") ?? readCliEnv("SANITY_PROJECT_ID");

const dataset = readCliEnv("SANITY_STUDIO_DATASET") ?? readCliEnv("SANITY_DATASET");

const appId = readCliEnv("SANITY_STUDIO_APP_ID") ?? readCliEnv("SANITY_APP_ID");

const deployment = appId ? { autoUpdates: true, appId } : undefined;

export default defineCliConfig({
  api: { projectId: projectId ?? "MISSING_PROJECT_ID", dataset: dataset ?? "MISSING_DATASET" },
  studioHost: "gctf",
  ...(deployment ? { deployment } : {}),
});
