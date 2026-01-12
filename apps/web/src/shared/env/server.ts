import 'server-only';
import { z } from 'zod';

const serverSchema = z.object({
  SANITY_API_READ_TOKEN: z.string().min(1).optional(),
});

export const serverEnv = serverSchema.parse({
  SANITY_API_READ_TOKEN: process.env['SANITY_API_READ_TOKEN'],
});
