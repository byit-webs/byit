import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), partytown({
    config: {
      forward: ["dataLayer.push", "gtag"],
      debug: false,
    }
  })],
  output: 'static',
  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
  }
});