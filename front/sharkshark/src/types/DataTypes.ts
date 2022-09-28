export type Problem = {
  star?: boolean;
  no: number;
  title: string;
  acceptedUserCnt: number;
  level: number;
  avgTries: number;
  isSolvable?: boolean;
  tag: string;
};
