import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  site: process.env.PUBLIC_SITE_URL || 'https://clinic-growth-os.pages.dev',
  integrations: [],
});
