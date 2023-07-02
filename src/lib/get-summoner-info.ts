import { RIOT_API_KEY, RIOT_HOST_URL } from '@/consts/env';

import fetcher from './fetcher';

export type SummonerInfoDetail = {
  queueType: string;
  summonerName: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}[];

export type SummonerInfo = SummonerInfoDetail[0];
export default async function getSummonerInfo(summonerId: string): Promise<SummonerInfo | null> {
  return await fetcher(`${RIOT_HOST_URL}/lol/league/v4/entries/by-summoner/${summonerId}`, {
    headers: {
      ['X-Riot-Token']: RIOT_API_KEY,
    },
  })
    .json<SummonerInfoDetail>()
    .then((json) => {
      const summonerInfo = json.find(
        ({ queueType }) => queueType === 'RANKED_SOLO_5x5',
      ) as SummonerInfo;

      if (summonerInfo === undefined) return null;
      return {
        queueType: summonerInfo.queueType,
        summonerName: summonerInfo.summonerName,
        tier: summonerInfo.tier,
        rank: summonerInfo.rank,
        leaguePoints: summonerInfo.leaguePoints,
        wins: summonerInfo.wins,
        losses: summonerInfo.losses,
      };
    });
}
