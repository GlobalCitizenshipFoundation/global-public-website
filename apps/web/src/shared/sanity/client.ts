import { createClient } from '@sanity/client';
import { publicEnv } from '../env/public';

export const sanityClient = createClient({
  projectId: publicEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: publicEnv.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: publicEnv.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
});
