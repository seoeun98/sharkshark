import { ListFormat } from 'typescript';

export type Problem = {
  no: number;
  title: string;
  acceptedUserCnt: number;
  level: number;
  avgTries: number;
  isSolvable?: boolean;
  tags: string;
};

export type ProblemDetail = {
  probNo: number;
  problem_description: string;
  input_description: string;
  output_description: string;
  in_list: string[];
  out_list: string[];
};

export type UserInfo = {
  id: string;
  pw?: string;
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
  exp?: number;
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

export type Markdown = {
  tier?: number;
  title: string;
  no: number;
  problem_description?: string;
  input_description?: string;
  output_description?: string;
  example?: string;
  tags?: string;
  code: string;
  lang: string;
};

export type solvedData = {
  solved: Boolean;
  time_sort_list?: ListFormat;
};
