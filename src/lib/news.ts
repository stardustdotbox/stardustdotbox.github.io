import { getCollection, type CollectionEntry } from 'astro:content';

export type News = CollectionEntry<'news'>;

// 公開する一面を新しい順に返す（本番のビルドでは下書きを除く）
export async function getPublishedNews(): Promise<News[]> {
  const news = await getCollection('news', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return news.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// 2026-10-10 → 2026-10-10 (SAT)
export function formatNewsDate(date: Date): string {
  const day = date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }).toUpperCase();
  return `${date.toISOString().slice(0, 10)} (${day})`;
}

// 2026-10-10 → 令和8年10月10日（makimono の表紙と同じく和暦も出す）
export function formatWareki(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
