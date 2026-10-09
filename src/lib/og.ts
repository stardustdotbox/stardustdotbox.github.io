import satori from 'satori';
import sharp from 'sharp';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// Google Fonts から、画像に使う文字だけを含む書体を取ってくる（ビルドのときだけ動く）。既定は Noto Sans JP
async function loadFont(text: string, weight: 400 | 700, family = 'Noto+Sans+JP'): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!src) throw new Error(`フォントを取得できませんでした: ${url}`);
  const res = await fetch(src);
  if (!res.ok) throw new Error(`フォントを取得できませんでした: ${res.status} ${src}`);
  return res.arrayBuffer();
}

// satori に渡す要素（React を使わずに書く）
type Node = { type: string; props: Record<string, unknown> & { children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

interface OgOptions {
  title: string;
  // タイトルの上に小さく出す行（日付・タグなど）
  kicker?: string;
}

// タイトルの長さで文字の大きさを変える（最後の 1〜2 文字だけが次の行に落ちないように）
function titleSize(title: string): number {
  if (title.length <= 14) return 76;
  if (title.length <= 24) return 60;
  return 52;
}

export async function renderOgImage({ title, kicker = '' }: OgOptions): Promise<Buffer> {
  const siteName = 'stardust.box';
  const tagline = 'Web3 を、少し離れたところから観察する';

  // サイト共通の見た目（#166）: 白地に墨、シアンとピンクは文字だけ。書体は M PLUS 1 Code
  const ink = '#0f172a';
  const cyan = '#0891b2';
  const pink = '#db2777';
  const muted = '#64748b';
  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 72px',
      backgroundColor: '#ffffff',
      color: ink,
      fontFamily: 'M PLUS 1 Code',
    },
    [
      h('div', { display: 'flex', fontSize: 26, letterSpacing: 6, color: pink }, kicker || ' '),
      h(
        'div',
        { display: 'flex', fontSize: titleSize(title), fontWeight: 700, lineHeight: 1.35, letterSpacing: 2 },
        title,
      ),
      h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 20, borderTop: `4px solid ${ink}` }, [
        h('div', { display: 'flex', fontSize: 40, fontWeight: 700, letterSpacing: 6 }, [
          h('span', {}, 'STARDUST'),
          h('span', { color: cyan }, '.BOX'),
        ]),
        h('div', { display: 'flex', fontSize: 24, color: muted }, tagline),
      ]),
    ],
  );

  const text = kicker + tagline + title + 'STARDUST.BOX' + siteName;
  const family = 'M+PLUS+1+Code';
  const svg = await satori(tree as never, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      { name: 'M PLUS 1 Code', data: await loadFont(text, 400, family), weight: 400, style: 'normal' },
      { name: 'M PLUS 1 Code', data: await loadFont(text, 700, family), weight: 700, style: 'normal' },
    ],
  });
  return sharp(Buffer.from(svg)).png().toBuffer();
}

interface NewsOgOptions {
  // 第001号 / 令和8年10月10日 / 2026-10-10 (SAT)
  dateline: string;
  // その日の記事の見出し（先頭の 3 本を載せる）
  headlines: string[];
}

// 星屑新報の共有用の画像。ページと同じく、書体は M PLUS 1 Code、色は墨とシアンの 2 色
export async function renderNewsOgImage({ dateline, headlines }: NewsOgOptions): Promise<Buffer> {
  const ink = '#0f172a';
  const cyan = '#0891b2';
  const muted = '#64748b';
  const pink = '#db2777';
  const eyebrow = 'CRYPTO ・ AI ・ SECURITY ・ JAPAN';
  const top = headlines.slice(0, 3).map((t) => (t.length > 34 ? `${t.slice(0, 33)}…` : t));

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '56px 72px',
      backgroundColor: '#ffffff',
      color: ink,
      fontFamily: 'M PLUS 1 Code',
    },
    [
      h('div', { display: 'flex', justifyContent: 'center', fontSize: 20, letterSpacing: 8, color: pink }, eyebrow),
      // 題字は「星屑新報」の漢字 4 文字だけ（ページと同じ）
      h('div', { display: 'flex', justifyContent: 'center', marginTop: 8, paddingLeft: 36, fontSize: 104, fontWeight: 700, letterSpacing: 36 }, '星屑新報'),
      h('div', { display: 'flex', justifyContent: 'center', marginTop: 12, paddingBottom: 18, borderBottom: `4px solid ${ink}`, fontSize: 22, color: muted }, dateline),
      h(
        'div',
        { display: 'flex', flexDirection: 'column', marginTop: 28, gap: 14 },
        top.map((t, i) =>
          h('div', { display: 'flex', fontSize: i === 0 ? 34 : 28, fontWeight: i === 0 ? 700 : 400 }, [
            h('span', { color: cyan, fontWeight: 700, marginRight: 20 }, String(i + 1).padStart(2, '0')),
            h('span', {}, t),
          ]),
        ),
      ),
      h('div', { display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', fontSize: 22, color: muted }, 'stardust.box/news'),
    ],
  );

  const text = eyebrow + '星屑新報0123456789stardust.box/news' + dateline + top.join('') + '…';
  const family = 'M+PLUS+1+Code';
  const svg = await satori(tree as never, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      { name: 'M PLUS 1 Code', data: await loadFont(text, 400, family), weight: 400, style: 'normal' },
      { name: 'M PLUS 1 Code', data: await loadFont(text, 700, family), weight: 700, style: 'normal' },
    ],
  });
  return sharp(Buffer.from(svg)).png().toBuffer();
}
