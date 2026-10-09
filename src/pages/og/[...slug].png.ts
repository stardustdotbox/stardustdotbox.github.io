import type { APIContext } from 'astro';
import { formatDate, getPublishedNotes, type Note } from '../../lib/notes';
import { formatNewsDate, formatWareki, getPublishedNews, type News } from '../../lib/news';
import { renderNewsOgImage, renderOgImage } from '../../lib/og';

type Props = { note?: Note; news?: News; number?: number };

// /og/site.png（サイト全体）、/og/notes/<記事>.png（記事ごと）、/og/news/<号>.png（星屑新報の号ごと）を作る
export async function getStaticPaths() {
  const notes = await getPublishedNotes();
  const news = await getPublishedNews();
  return [
    { params: { slug: 'site' }, props: {} },
    ...notes.map((note) => ({ params: { slug: `notes/${note.id}` }, props: { note } })),
    // 号数はページと同じく、古い順に 1 から数える（news は新しい順）
    ...news.map((item, i) => ({ params: { slug: `news/${item.id}` }, props: { news: item, number: news.length - i } })),
  ];
}

export async function GET({ props }: APIContext<Props>) {
  const { note, news, number } = props;
  let png: Buffer;
  if (news) {
    // 記事の見出し（### の行）を本文から取り出す
    const headlines = [...(news.body ?? '').matchAll(/^### (.+)$/gm)].map((m) => m[1].trim());
    png = await renderNewsOgImage({
      dateline: `第${String(number).padStart(3, '0')}号 / ${formatWareki(news.data.date)} / ${formatNewsDate(news.data.date)}`,
      headlines,
    });
  } else if (note) {
    png = await renderOgImage({
      title: note.data.title,
      kicker: [formatDate(note.data.pubDate), ...note.data.tags.map((t) => `#${t}`)].join('  '),
    });
  } else {
    png = await renderOgImage({ title: 'Stardust✨のおもちゃ箱', kicker: 'News · Notes · Projects · Onchain · Lab' });
  }
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
