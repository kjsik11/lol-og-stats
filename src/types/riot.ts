export type MatchInfoDetail = {
  metadata: {
    matchId: string;
    participants: string[];
  };
  info: {
    gameDuration: number;
    gameMode: string;
    participants: {
      puuid: string;
      assists: number;
      challenges: {
        kda: number;
      };
      championName: string;
      deaths: number;
      kills: number;
      win: boolean;
    }[];
  };
};

export type MatchInfo = {
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
};

export type SummonerInfo = {
  queueType: string;
  summonerName: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
};

export type SummonerIdsInfo = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
};
