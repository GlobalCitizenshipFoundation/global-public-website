import { defineCliConfig } from "sanity/cli";

function read(key: string) {
  const v = process.env[key];
  return v && v.trim() !== "" ? v : undefined;
}

const projectId = read("SANITY_STUDIO_PROJECT_ID") ?? read("SANITY_PROJECT_ID") ?? "swpg1w6y";

const dataset = read("SANITY_STUDIO_DATASET") ?? read("SANITY_DATASET") ?? "production";

const appId = read("SANITY_STUDIO_APP_ID") ?? read("SANITY_APP_ID");

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "gctf",
  ...(appId ? { deployment: { autoUpdates: true, appId } } : { deployment: { autoUpdates: true } }),
});
