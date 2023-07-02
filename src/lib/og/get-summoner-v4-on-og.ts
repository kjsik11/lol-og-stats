import { RIOT_API_KEY, RIOT_HOST_URL } from '@/consts/env';

export type SummonerIdsInfo = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
};
export default async function getSummonerV4OnOG(nickname: string): Promise<SummonerIdsInfo> {
  return await fetch(`${RIOT_HOST_URL}/lol/sumoner/v4/summoners/by-name/${nickname}`, {
    method: 'GET',
    headers: {
      ['X-Riot-Token']: RIOT_API_KEY,
    },
  }).then(async (data) => await data.json());
}
