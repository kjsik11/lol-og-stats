import { ImageResponse } from 'next/server';

import BuildOGImage from '@/components/custom/BuildOGImage';

import getMatchIdsOnOG from '@/lib/og/get-match-ids-on-og';
import getMatchInfoOnOG from '@/lib/og/get-match-info-on-og';
import getSummonerInfoOnOG from '@/lib/og/get-summoner-info-on-og';
import getSummonerV4OnOG from '@/lib/og/get-summoner-v4-on-og';

import type { MatchInfo, SummonerInfo } from '@/types/riot';

export const size = { width: 1200, height: 600 };
export const alt = 'League of Legends Summoner Match History';
export const contentType = 'image/jpg';

function InternalServerError() {
  return (
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
      요청중 알 수 없는 문제가 발생했습니다.
    </div>
  );
}

function NoSuchSummoner() {
  return (
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
  );
}

function NoSuchRankgame() {
  return (
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
  );
}

export default async function og({ params: { nickname } }: { params: { nickname: string } }) {
  let summonerInfo: SummonerInfo | null = null;
  let matchInfoList: MatchInfo[] | null = null;

  try {
    const summonerIds = await getSummonerV4OnOG(nickname);

    //@ts-ignore
    if (summonerIds?.status?.message)
      return new ImageResponse(<NoSuchSummoner />, {
        ...size,
      });
    summonerInfo = await getSummonerInfoOnOG(summonerIds.id);

    if (summonerInfo === null)
      return new ImageResponse(<NoSuchRankgame />, {
        ...size,
      });

    const matchIds = await getMatchIdsOnOG(summonerIds.puuid);
    matchInfoList = await Promise.all(
      matchIds.map(async (matchId) => await getMatchInfoOnOG(matchId, summonerIds.puuid)),
    );

    // clearKakaoOGCache(nickname);
  } catch (e) {
    console.error(e);
  }

  if (summonerInfo === null || matchInfoList === null)
    return new ImageResponse(<InternalServerError />, {
      ...size,
    });

  return new ImageResponse(
    <BuildOGImage summonerInfo={summonerInfo} matchInfoList={matchInfoList} />,
    {
      ...size,
    },
  );
}
