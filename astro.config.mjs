// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 独自ドメイン（public/CNAME と合わせる）
  site: 'https://stardust.box',

  integrations: [sitemap()],
});