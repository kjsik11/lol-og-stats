import { ImageResponse } from 'next/server';

import BuildOGImage from '@/components/custom/BuildOGImage';

import getMatchIds from '@/lib/\bget-match-ids';
import getMatchInfo from '@/lib/get-match-info';
import getSummonerV4 from '@/lib/get-summoner-v4';

export const size = { width: 1200, height: 600 };
export const alt = 'League of Legends Summoner Record';
export const contentType = 'image/png';
export const runtime = 'edge';

export default async function og({ params: { nickname } }: { params: { nickname: string } }) {
  const summonerData = await getSummonerV4(nickname);
  const matchIds = await getMatchIds(summonerData.puuid);
  const matchInfoList = await Promise.all(
    matchIds.map(async (matchId) => await getMatchInfo(matchId, summonerData.puuid)),
  );

  // return new ImageResponse(<div>{JSON.stringify(matchInfoList)}</div>);
  return new ImageResponse(
    <BuildOGImage summonerInfo={summonerData} matchInfoList={matchInfoList} />,
  );
}
