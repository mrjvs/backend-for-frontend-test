import { zodCoercedBoolean } from '@neato/config';
import { z } from 'zod';

export const configSchema = z.object({
  server: z
    .object({
      port: z.coerce.number().default(8080),
      basePath: z.string().default('/'),
    })
    .default({}),
  logging: z
    .object({
      format: z.enum(['json', 'pretty']).default('pretty'),
      debug: zodCoercedBoolean().default(false),
    })
    .default({}),
  db: z.object({
    filePathUrl: z.string(), // has to be "file:/my/path/to/thefile.db"
  }),
  crypto: z.object({
    jwtSecret: z.string(),
  }),
});
