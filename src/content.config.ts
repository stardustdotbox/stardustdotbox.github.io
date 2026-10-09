import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Notes: Web3 の観察記録（src/content/notes/*.md）
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // true の記事は本番のビルドに出さない（npm run dev では表示する）
    draft: z.boolean().default(false),
  }),
});

// News: 星屑新報（src/content/news/YYYY-MM-DD.md、画像があれば YYYY-MM-DD/index.md と images/）。
// Codex が下書きを書き、Stardust が確かめて公開する。images/CREDITS.md などは読まない
const news = defineCollection({
  loader: glob({ pattern: ['*.md', '*/index.md'], base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // その日の一面を 1 文で（一覧と OGP の説明に使う）
    summary: z.string(),
    // true の一面は本番のビルドに出さない（npm run dev では表示する）
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes, news };
