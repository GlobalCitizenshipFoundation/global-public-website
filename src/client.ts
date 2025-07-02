import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'swpg1w6y',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-06-21',
});
