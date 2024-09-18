import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://fenixtherapeuticservices.com',
  integrations: [
    partytown(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.85,
      lastmod: new Date(),
    }),
  ],
}); 