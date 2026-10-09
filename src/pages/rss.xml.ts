import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedNotes } from '../lib/notes';

export async function GET(context: APIContext) {
  const notes = await getPublishedNotes();
  return rss({
    title: 'Stardust✨のおもちゃ箱',
    description: 'Web3・AI・セキュリティを少し離れたところから観察して、見つけたものと作ったものを詰め込む箱',
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
