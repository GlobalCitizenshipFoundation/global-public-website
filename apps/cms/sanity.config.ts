import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { env } from "./src/env";
import { schemaTypes } from "./src/schema/schemaTypes";

export default defineConfig({
  name: "default",
  title: "CMS",

  projectId: env.projectId,
  dataset: env.dataset,

  plugins: [structureTool(), visionTool()],

  schema: { types: schemaTypes },
});
