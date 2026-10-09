import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedNotes } from '../lib/notes';

export async function GET(context: APIContext) {
  const notes = await getPublishedNotes();
  return rss({
    title: 'Stardust✨のおもちゃ箱',
    description: 'Stardust✨ が Web3 を観察する場所',
    site: context.site!,
    items: notes.map((note) => ({
      title: note.data.title,
      pubDate: note.data.pubDate,
      description: note.data.description,
      categories: note.data.tags,
      link: `/notes/${note.id}/`,
    })),
    customData: '<language>ja</language>',
  });
}
