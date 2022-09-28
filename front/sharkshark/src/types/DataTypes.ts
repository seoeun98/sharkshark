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
  userId: string;
  level: number;
  class: string;
};
