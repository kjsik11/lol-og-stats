import { RIOT_API_KEY, RIOT_HOST_URL } from '@/consts/env';

export type SummonerInfo = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
};
export default async function getSummonerV4(nickname: string): Promise<SummonerInfo> {
  return await fetch(`${RIOT_HOST_URL}/lol/summoner/v4/summoners/by-name/${nickname}`, {
    method: 'GET',
    headers: {
      ['X-Riot-Token']: RIOT_API_KEY,
    },
  }).then(async (data) => await data.json());
}
