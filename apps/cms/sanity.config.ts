import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { schemaTypes } from './schemaTypes';
import { env } from './src/env';

export default defineConfig({
  name: 'default',
  title: 'CMS',

  projectId: env.projectId,
  dataset: env.dataset,

  plugins: [structureTool(), visionTool()],

  schema: { types: schemaTypes },
});
