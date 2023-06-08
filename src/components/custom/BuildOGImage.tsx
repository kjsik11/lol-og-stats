import { MatchInfo } from '@/lib/get-match-info';
import { SummonerInfo } from '@/lib/get-summoner-info';

type Props = {
  summonerInfo: SummonerInfo;
  matchInfoList: MatchInfo[];
};

export default function BuildOGImage({ summonerInfo, matchInfoList }: Props) {
  return (
    <>
      <div>{JSON.stringify(summonerInfo)}</div>
      <div>{JSON.stringify(matchInfoList)}</div>
    </>
  );
}
