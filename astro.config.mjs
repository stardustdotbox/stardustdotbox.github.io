// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 独自ドメイン（public/CNAME と合わせる）
  site: 'https://stardust.box',

  integrations: [sitemap()],

  // 消した記事の URL を、まとめた先の記事へ移す
  redirects: {
    '/notes/2026-10-05-start': '/notes/2026-10-05-rebuild-with-astro/',
  },
});