import { ImageResponse } from 'next/server';

import BuildOGImage from '@/components/custom/BuildOGImage';

import getMatchIds from '@/lib/\bget-match-ids';
import clearKakaoOGCache from '@/lib/clear-kakao-og-cache';
import getMatchInfo from '@/lib/get-match-info';
import getSummonerInfo from '@/lib/get-summoner-info';
import getSummonerV4 from '@/lib/get-summoner-v4';

export const size = { width: 1200, height: 600 };
export const alt = 'League of Legends Summoner Record';
export const contentType = 'image/png';
export const runtime = 'edge';

export default async function og({ params: { nickname } }: { params: { nickname: string } }) {
  await clearKakaoOGCache(nickname);

  const summonerIds = await getSummonerV4(nickname);

  //@ts-ignore
  if (summonerIds?.status?.message)
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '1200px',
            height: '600px',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 64,
            fontWeight: 'bold',
          }}
        >
          존재하지 않는 소환사입니다.
        </div>
      ),
    );
  const summonerInfo = await getSummonerInfo(summonerIds.id);
  if (summonerInfo === null)
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '1200px',
            height: '600px',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 56,
            fontWeight: 'bold',
          }}
        >
          <p
            style={{
              padding: 0,
              margin: 0,
            }}
          >
            현재 5vs5랭크게임 전적검색만 지원하고있습니다.
          </p>
          <p
            style={{
              padding: 0,
              margin: 0,
            }}
          >
            5vs5랭크게임 전적이 없는 소환사입니다.
          </p>
        </div>
      ),
    );
  const matchIds = await getMatchIds(summonerIds.puuid);
  const matchInfoList = await Promise.all(
    matchIds.map(async (matchId) => await getMatchInfo(matchId, summonerIds.puuid)),
  );

  return new ImageResponse(
    <BuildOGImage summonerInfo={summonerInfo} matchInfoList={matchInfoList} />,
  );
}
