import { ListFormat } from 'typescript';

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
  tier: string;
  userId: string;
  userClass: number;
  totalSolvedCnt?: number;
  solvedCount?: number;
  rating?: number;
  ratingByProblemsSum?: number;
  ratingByClass?: number;
  ratingBySolvedCount?: number;
  exp: number;
  rivalCount?: number;
  reverseRivalCount?: number;
  maxStreak?: number;
  rank?: number;
  organization?: string;
  no?: number;
  problems?: string;
};

export type CTproblem = {
  no: number;
  title: string;
  acceptedUserCnt: number;
  level: number;
  avgTries: number;
  isSolvable: Boolean;
  tags: string; // "implementation,arithmetic,math"
};

export type solvedData = {
  solved: Boolean;
  time_sort_list?: ListFormat;
};
