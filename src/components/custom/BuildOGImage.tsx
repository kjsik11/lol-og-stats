import { MatchInfo } from '@/lib/get-match-info';
import { SummonerInfo } from '@/lib/get-summoner-v4';

type Props = {
  summonerInfo: SummonerInfo;
  matchInfoList: MatchInfo[];
};

export default function BuildOGImage({ summonerInfo }: Props) {
  return <div>{summonerInfo.accountId}</div>;
}
