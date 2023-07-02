import { RIOT_API_KEY } from '@/consts/env';

import fetcher from './fetcher';

export default async function getMatchIds(puuid: string, count?: number): Promise<string[]> {
  return await fetcher(
    `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${
      count || 5
    }`,
    {
      headers: {
        ['X-Riot-Token']: RIOT_API_KEY,
      },
    },
  ).json();
}
