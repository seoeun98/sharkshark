export type Problem = {
  star: boolean;
  level: number;
  id: number;
  title: string;
  tag: string;
  acceptedUserCnt: number;
  avgTries: number;
};

export type RivalInfo = {
  id: string;
  tier: string;
  class: string;
  totalSolvedCount: number;
  rank: number;
  rating: number;
};
