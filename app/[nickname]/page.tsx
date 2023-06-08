import { Metadata } from 'next';

import { NEXT_PUBLIC_RIOT_CHAMPION_IMAGE_URL, NEXT_PUBLIC_WEB_URL } from '@/consts/env';

import getMatchIds from '@/lib/\bget-match-ids';
import getMatchInfo from '@/lib/get-match-info';
import getSummonerInfo from '@/lib/get-summoner-info';
import getSummonerV4 from '@/lib/get-summoner-v4';

export const metadata: Metadata = {
  title: '롤 전적검색',
  openGraph: {
    title: '롤 전적검색',
    description: '리그오브레전드 한국서버 전적검색',
  },
};

type Params = { params: { nickname: string } };
export default async function Page({ params: { nickname } }: Params) {
  const summonerIds = await getSummonerV4(nickname);

  //@ts-ignore
  if (summonerIds?.status?.message)
    return (
      <div className="bg-black h-screen flex items-center min-h-[600px]">
        <div className="flex justify-center h-[600px] items-center w-[830px] m-auto bg-white rounded-md">
          <p className="text-2xl font-semibold">존재하지 않는 소환사입니다.</p>
        </div>
      </div>
    );

  const summonerInfo = await getSummonerInfo(summonerIds.id);

  //@ts-ignore
  if (summonerInfo === null)
    return (
      <div className="bg-black h-screen flex items-center min-h-[600px]">
        <div className="flex justify-center h-[600px] items-center w-[830px] m-auto bg-white rounded-md flex-col">
          <p className="text-2xl font-semibold">현재 5vs5랭크게임 전적검색만 지원하고있습니다.</p>
          <p className="text-2xl font-semibold">5vs5랭크게임 전적이 없는 소환사입니다.</p>
        </div>
      </div>
    );

  const matchIds = await getMatchIds(summonerIds.puuid, 10);
  const matchInfoList = await Promise.all(
    matchIds.map(async (matchId) => await getMatchInfo(matchId, summonerIds.puuid)),
  );

  return (
    <>
      <div className="bg-black flex items-center">
        <div className="flex justify-center items-center m-auto bg-white rounded-md my-8">
          <div>
            <div className="flex items-center flex-col md:flex-row">
              <img
                style={{
                  width: 171,
                  height: 194,
                }}
                alt={`lol ${summonerInfo.queueType} ${summonerInfo.tier} tier icon`}
                src={`${NEXT_PUBLIC_WEB_URL}/images/${summonerInfo.tier}.jpg`}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingLeft: '8px',
                }}
              >
                <p
                  style={{
                    fontSize: '18px',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {summonerInfo.summonerName} ({summonerInfo.queueType})
                </p>
                <p
                  style={{
                    fontSize: '24px',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {summonerInfo.tier} {summonerInfo.rank} | {summonerInfo.leaguePoints} LP
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {summonerInfo.wins}승 {summonerInfo.losses}패 | 승률{' '}
                  {((summonerInfo.wins / (summonerInfo.wins + summonerInfo.losses)) * 100).toFixed(
                    2,
                  )}
                  %
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 min-w-[300px] justify-center">
              {matchInfoList.map((matchInfo, idx) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 8,
                  }}
                  key={idx}
                >
                  <img
                    className="rounded w-40 h-40"
                    alt={`${matchInfo.championName} image`}
                    src={`${NEXT_PUBLIC_RIOT_CHAMPION_IMAGE_URL}/${matchInfo.championName}.png`}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      marginTop: 4,
                    }}
                  >
                    <p
                      style={{
                        fontSize: '18px',
                        padding: '1px 2px',
                        margin: '0 2px 0 0',
                        backgroundColor: matchInfo.win ? '#5383E8' : '#E84057',
                        fontWeight: 'bold',
                        color: 'white',
                        borderRadius: 4,
                      }}
                    >
                      {matchInfo.win ? '승리' : '패배'}
                    </p>
                    <p
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {matchInfo.kills} / {matchInfo.deaths} / {matchInfo.assists}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
