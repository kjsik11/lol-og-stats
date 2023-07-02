import { RIOT_API_KEY, RIOT_HOST_URL } from '@/consts/env';
import { SummonerInfoDetail } from '@/types/riot';

export type SummonerInfo = SummonerInfoDetail[0];
export default async function getSummonerInfoOnOG(
  summonerId: string,
): Promise<SummonerInfo | null> {
  return await fetch(`${RIOT_HOST_URL}/lol/league/v4/entries/by-summoner/${summonerId}`, {
    method: 'GET',
    headers: {
      ['X-Riot-Token']: RIOT_API_KEY,
    },
  })
    .then(async (data) => await data.json())
    .then((json: SummonerInfoDetail) => {
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
