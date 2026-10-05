import satori from 'satori';
import sharp from 'sharp';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// Google Fonts から、画像に使う文字だけを含む Noto Sans JP を取ってくる（ビルドのときだけ動く）
async function loadFont(text: string, weight: 400 | 700): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@${weight}&text=${encodeURIComponent(text)}`;
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

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      backgroundColor: '#111111',
      backgroundImage: 'linear-gradient(135deg, #111111 0%, #1d1538 100%)',
      color: '#e8e8e8',
      fontFamily: 'Noto Sans JP',
    },
    [
      h('div', { display: 'flex', fontSize: 30, color: '#a58bff' }, kicker || ' '),
      h(
        'div',
        { display: 'flex', fontSize: titleSize(title), fontWeight: 700, lineHeight: 1.3 },
        title,
      ),
      h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }, [
        h('div', { display: 'flex', fontSize: 40, fontWeight: 700 }, siteName),
        h('div', { display: 'flex', fontSize: 26, color: '#999999' }, tagline),
      ]),
    ],
  );

  const regularText = kicker + tagline;
  const boldText = title + siteName;
  const svg = await satori(tree as never, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      { name: 'Noto Sans JP', data: await loadFont(regularText, 400), weight: 400, style: 'normal' },
      { name: 'Noto Sans JP', data: await loadFont(boldText, 700), weight: 700, style: 'normal' },
    ],
  });
  return sharp(Buffer.from(svg)).png().toBuffer();
}
