import { NEXT_PUBLIC_RIOT_CHAMPION_IMAGE_URL, NEXT_PUBLIC_WEB_URL } from '@/consts/env';

import { MatchInfo } from '@/lib/get-match-info';
import { SummonerInfo } from '@/lib/get-summoner-info';

type Props = {
  summonerInfo: SummonerInfo;
  matchInfoList: MatchInfo[];
};

export default function BuildOGImage({ summonerInfo, matchInfoList }: Props) {
  return (
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
            width: 210,
            height: 240,
          }}
          alt={`lol ${summonerInfo.queueType} ${summonerInfo.tier} tier icon`}
          src={`${NEXT_PUBLIC_WEB_URL}/images/${summonerInfo.tier}.jpg`}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 40,
          }}
        >
          <p
            style={{
              fontSize: 36,
              padding: 0,
              margin: 0,
            }}
          >
            {summonerInfo.summonerName} ({summonerInfo.queueType})
          </p>
          <p
            style={{
              fontSize: 60,
              padding: 0,
              margin: 0,
            }}
          >
            {summonerInfo.tier} {summonerInfo.rank} | {summonerInfo.leaguePoints} LP
          </p>
          <p
            style={{
              fontSize: 32,
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
                margin: 4,
              }}
              key={idx}
            >
              <img
                style={{
                  width: 230,
                  height: 230,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
                alt={`${matchInfo.championName} image`}
                src={`${NEXT_PUBLIC_RIOT_CHAMPION_IMAGE_URL}/${matchInfo.championName}.png`}
              />

              <div
                style={{
                  display: 'flex',
                  fontSize: '32px',
                  textAlign: 'center',
                  padding: '1px 2px',
                  backgroundColor: matchInfo.win ? '#5383E8' : '#E84057',
                  fontWeight: 'bold',
                  justifyContent: 'center',
                  color: 'white',
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                }}
              >
                {matchInfo.win ? '승리' : '패배'}
              </div>
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
                    justifyContent: 'center',
                    fontSize: 30,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      color: matchInfo.win ? '#1651d0' : '#E84057',
                      marginRight: 6,
                    }}
                  >
                    {matchInfo.kills}K
                  </span>
                  <span
                    style={{
                      marginRight: 6,
                    }}
                  >
                    {matchInfo.deaths}D
                  </span>
                  <span
                    style={{
                      marginRight: 6,
                    }}
                  >
                    {matchInfo.assists}A
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
