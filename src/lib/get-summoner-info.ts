import { RIOT_API_KEY, RIOT_HOST_URL } from '@/consts/env';

import fetcher from './fetcher';

import type { SummonerInfo } from '@/types/riot';

export default async function getSummonerInfo(summonerId: string): Promise<SummonerInfo | null> {
  return await fetcher(`${RIOT_HOST_URL}/lol/league/v4/entries/by-summoner/${summonerId}`, {
    headers: {
      ['X-Riot-Token']: RIOT_API_KEY,
    },
  })
    .json<SummonerInfo[]>()
    .then((json) => {
      const summonerInfo = json.find(({ queueType }) => queueType === 'RANKED_SOLO_5x5');

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
