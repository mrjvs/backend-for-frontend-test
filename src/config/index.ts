import { createConfigLoader } from '@neato/config';
import { configSchema } from '@/config/schema';

export const version = process.env.npm_package_version ?? 'unknown';

export const conf = createConfigLoader()
  .addFromEnvironment('PST_')
  .addFromCLI('pst-')
  .addFromFile('.env', {
    prefix: 'PST_',
  })
  .addFromFile('config.json')
  .addZodSchema(configSchema)
  .load();
