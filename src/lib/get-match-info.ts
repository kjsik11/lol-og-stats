import { RIOT_API_KEY } from '@/consts/env';

import fetcher from './fetcher';

import type { MatchInfo, MatchInfoDetail } from '@/types/riot';

export default async function getMatchInfo(matchId: string, userPuuid: string): Promise<MatchInfo> {
  return (await fetcher(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
    headers: {
      ['X-Riot-Token']: RIOT_API_KEY,
    },
  })
    .json<MatchInfoDetail>()
    .then((json) => {
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
