import 'server-only';
import { z } from 'zod';
import { publicEnv } from '@/shared/env/public';

const serverSchema = z.object({
  SANITY_API_READ_TOKEN: z.string().min(1).optional(),
});

const parsed = serverSchema.parse({
  SANITY_API_READ_TOKEN: process.env['SANITY_API_READ_TOKEN'],
});

export const serverEnv = {
  ...publicEnv,
  ...parsed,
};
