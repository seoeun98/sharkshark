export type Problem = {
  star?: boolean;
  no: number;
  title: string;
  acceptedUserCnt: number;
  level: number;
  avgTries: number;
  isSolvable?: boolean;
  tags: string;
};

export type UserInfo = {
  id: string;
  token: string;
  git: string;
  dir: string;
};

export type rival = {
  tier: number;
  totalSolvedCnt?: number;
  userId: string;
  solvedCount?: number;
  userClass?: number;
  rating?: number;
  ratingByProblemsSum?: number;
  ratingByClass?: number;
  ratingBySolvedCount?: number;
  exp?: number;
  rivalCount?: number;
  reverseRivalCount?: number;
  maxStreak?: number;
  rank?: number;
  organization?: string;
};
