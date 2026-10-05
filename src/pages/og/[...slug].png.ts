import type { APIContext } from 'astro';
import { formatDate, getPublishedNotes, type Note } from '../../lib/notes';
import { renderOgImage } from '../../lib/og';

// /og/site.png（サイト全体）と /og/notes/<記事>.png（記事ごと）を作る
export async function getStaticPaths() {
  const notes = await getPublishedNotes();
  return [
    { params: { slug: 'site' }, props: { note: undefined } },
    ...notes.map((note) => ({ params: { slug: `notes/${note.id}` }, props: { note } })),
  ];
}

export async function GET({ props }: APIContext<{ note?: Note }>) {
  const { note } = props;
  const png = note
    ? await renderOgImage({
        title: note.data.title,
        kicker: [formatDate(note.data.pubDate), ...note.data.tags.map((t) => `#${t}`)].join('  '),
      })
    : await renderOgImage({ title: 'stardustdotbox', kicker: 'Notes · Projects · Onchain · Lab' });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
