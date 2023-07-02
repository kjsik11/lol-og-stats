import { RIOT_API_KEY, RIOT_HOST_URL } from '@/consts/env';

import fetcher from './fetcher';

export type SummonerIdsInfo = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
};
export default async function getSummonerV4(nickname: string): Promise<SummonerIdsInfo> {
  return await fetcher(`${RIOT_HOST_URL}/lol/sumoner/v4/summoners/by-name/${nickname}`, {
    headers: {
      ['X-Riot-Token']: RIOT_API_KEY,
    },
  }).json();
}
