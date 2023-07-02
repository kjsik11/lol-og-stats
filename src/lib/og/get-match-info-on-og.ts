import { RIOT_API_KEY } from '@/consts/env';

import type { MatchInfo, MatchInfoDetail } from '@/types/riot';

export default async function getMatchInfoOnOG(
  matchId: string,
  userPuuid: string,
): Promise<MatchInfo> {
  return (await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
    method: 'GET',
    headers: {
      ['X-Riot-Token']: RIOT_API_KEY,
    },
  })
    .then(async (data) => await data.json())
    .then((json: MatchInfoDetail) => {
      const matchJson = json.info?.participants.find(
        ({ puuid }) => puuid === userPuuid,
      ) as MatchInfoDetail['info']['participants'][0];
      return {
        championName: matchJson.championName,
        kills: matchJson.kills,
        deaths: matchJson.deaths,
        assists: matchJson.assists,
        win: matchJson.win,
      };
    })) as MatchInfo;
}
