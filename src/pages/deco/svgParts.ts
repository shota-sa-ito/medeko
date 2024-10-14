export const parts = [
  {
    name: 'ハート',
    type: 'svg',
    content: (color: string) => `
      <defs>
        <radialGradient id="heartGradient" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="10%" style="stop-color:${color};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
        </radialGradient>
      </defs>
      <path d="M36 64.05l-4.35-3.96C16.2 46.08 6 36.84 6 25.5 6 16.26 13.26 9 22.5 9c5.22 0 10.23 2.43 13.5 6.27C39.27 11.43 44.28 9 49.5 9 58.74 9 66 16.26 66 25.5c0 11.34-10.2 20.58-25.65 34.62L36 64.05z" fill="url(#heartGradient)"/>
      <path d="M36 64.05l-4.35-3.96C16.2 46.08 6 36.84 6 25.5 6 16.26 13.26 9 22.5 9c5.22 0 10.23 2.43 13.5 6.27C39.27 11.43 44.28 9 49.5 9 58.74 9 66 16.26 66 25.5c0 11.34-10.2 20.58-25.65 34.62L36 64.05z" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
      <path d="M15 20 Q36 40 57 20" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>
    `,
  },
  {
    name: 'クリスタルハート',
    type: 'image',
    content: (color: string) => 'parts/heart.png', // 画像のパスを指定
  },
  {
    name: '星',
    type: 'svg',
    content: (color: string) => `
      <defs>
        <radialGradient id="starGradient" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
          <stop offset="0%" style="stop-color:rgb(255,255,200);stop-opacity:1" />
          <stop offset="10%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(255,215,0);stop-opacity:1" />
        </radialGradient>
      </defs>
      <path d="M36 51.81L54.54 63l-4.92-21.09L66 27.72l-21.57-1.83L36 6 27.57 25.89 6 27.72l16.38 14.19L17.46 63z" fill="url(#starGradient)"/>
      <path d="M36 51.81L54.54 63l-4.92-21.09L66 27.72l-21.57-1.83L36 6 27.57 25.89 6 27.72l16.38 14.19L17.46 63z" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
      <path d="M20 30 L36 15 L52 30" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>
    `,
  },
  {
    name: '羽',
    type: 'svg',
    content: (color: string) => `
      <path d="M36 6C25 6 15 16 12 30C20 22 28 18 36 18C44 18 52 22 60 30C57 16 47 6 36 6Z" fill="white" stroke="#ccc" stroke-width="1"/>
      <path d="M24 12C28 16 32 18 36 18C40 18 44 16 48 12" fill="none" stroke="#eee" stroke-width="2"/>
    `,
  },
  {
    name: '宝石',
    type: 'svg',
    content: (color: string) => `
      <defs>
        <radialGradient id="gemGradient" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
          <stop offset="0%" style="stop-color:rgb(200,255,255);stop-opacity:1" />
          <stop offset="10%" style="stop-color:rgb(100,200,255);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(0,100,255);stop-opacity:1" />
        </radialGradient>
      </defs>
      <path d="M36 6L6 30L36 66L66 30L36 6Z" fill="url(#gemGradient)"/>
      <path d="M36 6L6 30L36 66L66 30L36 6Z" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
      <path d="M16 25L36 15L56 25" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>
    `,
  },
  {
    name: 'リボン',
    type: 'svg',
    content: (color: string) => `
      <path d="M36 12C30 12 24 18 24 24C24 30 30 36 36 36C42 36 48 30 48 24C48 18 42 12 36 12Z" fill="#ff69b4" stroke="#ff1493" stroke-width="1.5"/>
      <path d="M24 24C18 30 15 39 18 48C24 45 30 42 36 42C42 42 48 45 54 48C57 39 54 30 48 24" fill="#ff69b4" stroke="#ff1493" stroke-width="1.5"/>
      <path d="M30 18C33 21 36 22 36 22C36 22 39 21 42 18" fill="none" stroke="#ffb6c1" stroke-width="2"/>
    `,
  },
  // 他のSVGパーツを追加
];
