import { RIOT_API_KEY, RIOT_HOST_URL } from '@/consts/env';

import fetcher from './fetcher';

import type { SummonerIdsInfo } from '@/types/riot';

export default async function getSummonerV4(nickname: string): Promise<SummonerIdsInfo> {
  return await fetcher(`${RIOT_HOST_URL}/lol/sumoner/v4/summoners/by-name/${nickname}`, {
    headers: {
      ['X-Riot-Token']: RIOT_API_KEY,
    },
  }).json();
}
