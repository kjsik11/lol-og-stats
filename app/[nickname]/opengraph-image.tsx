import { ImageResponse } from 'next/server';

export const size = { width: 1200, height: 600 };
export const alt = 'League of Legends Summoner Record';
export const contentType = 'image/png';
export const runtime = 'edge';

export default function og({ params: { nickname } }: { params: { nickname: string } }) {
  return new ImageResponse(<div>{nickname}</div>);
}
