import { RIOT_API_KEY } from '@/consts/env';

export default async function getMatchIds(puuid: string): Promise<string[]> {
  return await fetch(
    `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
    {
      method: 'GET',
      headers: {
        ['X-Riot-Token']: RIOT_API_KEY,
      },
    },
  ).then(async (data) => await data.json());
}
