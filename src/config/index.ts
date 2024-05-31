import { createConfigLoader } from '@neato/config';
import { configSchema } from '@/config/schema';
import { fragments } from './fragments';

export const version = process.env.npm_package_version ?? 'unknown';

export const conf = createConfigLoader()
  .addFromEnvironment('PST_')
  .addFromCLI('pst-')
  .addFromFile('.env', {
    prefix: 'PST_',
  })
  .addFromFile('config.json')
  .addConfigFragments(fragments)
  .setFragmentKey('USE_PRESETS')
  .addZodSchema(configSchema)
  .load();
