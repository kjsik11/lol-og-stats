import { ImageResponse } from 'next/server';

import BuildOGImage from '@/components/custom/BuildOGImage';

import getMatchIds from '@/lib/\bget-match-ids';
import getMatchInfo, { MatchInfo } from '@/lib/get-match-info';
import getSummonerInfo, { SummonerInfo } from '@/lib/get-summoner-info';
import getSummonerV4 from '@/lib/get-summoner-v4';

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
    const summonerIds = await getSummonerV4(nickname);

    //@ts-ignore
    if (summonerIds?.status?.message)
      return new ImageResponse(<NoSuchSummoner />, {
        ...size,
      });
    summonerInfo = await getSummonerInfo(summonerIds.id);

    if (summonerInfo === null)
      return new ImageResponse(<NoSuchRankgame />, {
        ...size,
      });

    const matchIds = await getMatchIds(summonerIds.puuid);
    matchInfoList = await Promise.all(
      matchIds.map(async (matchId) => await getMatchInfo(matchId, summonerIds.puuid)),
    );
  } catch (e) {
    return new ImageResponse(<InternalServerError />, {
      ...size,
    });
  }

  // clearKakaoOGCache(nickname);

  return new ImageResponse(
    <BuildOGImage summonerInfo={summonerInfo} matchInfoList={matchInfoList} />,
    {
      ...size,
    },
  );
}
