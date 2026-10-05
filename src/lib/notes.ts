import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

// 公開する記事を新しい順に返す（本番のビルドでは下書きを除く）
export async function getPublishedNotes(): Promise<Note[]> {
  const notes = await getCollection('notes', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return notes.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// タグごとの記事数（多い順）
export function countTags(notes: Note[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const note of notes) {
    for (const tag of note.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
