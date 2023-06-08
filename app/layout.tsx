import clsx from 'clsx';
import { Metadata } from 'next';
import { Noto_Serif_KR } from 'next/font/google';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

import '@/styles/globals.css';
/**
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css
 */

const notoSerif = Noto_Serif_KR({
  weight: ['200', '300'], // extra-light, light
  subsets: ['latin'],
  variable: '--font-noto-serif',
});

const pretendard = localFont({
  src: [
    {
      path: './fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '롤 전적 검색',
  description: '롤 전적 검색',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={clsx(notoSerif.variable, pretendard.variable)}>
      <body>{children}</body>
    </html>
  );
}
