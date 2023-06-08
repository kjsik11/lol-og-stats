import { NEXT_PUBLIC_RIOT_CHAMPION_IMAGE_URL, NEXT_PUBLIC_WEB_URL } from '@/consts/env';

import getMatchIds from '@/lib/\bget-match-ids';
import getMatchInfo from '@/lib/get-match-info';
import getSummonerInfo from '@/lib/get-summoner-info';
import getSummonerV4 from '@/lib/get-summoner-v4';

type Params = { params: { nickname: string } };
export default async function Page({ params: { nickname } }: Params) {
  const summonerIds = await getSummonerV4(nickname);
  const summonerInfo = await getSummonerInfo(summonerIds.id);
  const matchIds = await getMatchIds(summonerIds.puuid, 10);
  const matchInfoList = await Promise.all(
    matchIds.map(async (matchId) => await getMatchInfo(matchId, summonerIds.puuid)),
  );

  return (
    <div className="flex justify-center h-screen min-h-[600px] items-center max-w-[830px] mx-auto">
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '600px',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
          }}
        >
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
              {((summonerInfo.wins / (summonerInfo.wins + summonerInfo.losses)) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            margin: '8px',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            {matchInfoList.slice(0, 5).map((matchInfo, idx) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 8,
                }}
                key={idx}
              >
                <img
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 4,
                  }}
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
          <div
            style={{
              display: 'flex',
            }}
          >
            {matchInfoList.slice(5).map((matchInfo, idx) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 8,
                }}
                key={idx}
              >
                <img
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 4,
                  }}
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
                      justifyContent: 'center',
                      textAlign: 'center',
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
  );
}
