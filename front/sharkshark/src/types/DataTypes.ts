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
  example: string;
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

export type Markdown = {
  tier?: number;
  title: string;
  no: number;
  problem_description?: string;
  input_description?: string;
  output_description?: string;
  example?: string[];
  tags?: string;
  code: string;
  lang: string;
};
