import { Box, Flex } from '@chakra-ui/react';
import { Problem } from '../../types/DataTypes';
import { QuizTable } from './QuizTable';
import { QuizTableItem } from './QuizTableItem';

export const QuizMenuDefault = () => {
  const testdata: Array<Problem> = [
    {
      star: false,
      level: 11,
      id: 1011,
      title: 'Fly me to the Alpha Centauri',
      tag: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
    {
      star: true,
      level: 16,
      id: 1011,
      title: 'Fly me to the Alpha Centauri',
      tag: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
    {
      star: false,
      level: 11,
      id: 1011,
      title: 'Fly me to the Alpha Centauri',
      tag: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
    {
      star: true,
      level: 16,
      id: 1011,
      title: 'Fly me to the Alpha Centauri',
      tag: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
    {
      star: false,
      level: 11,
      id: 1011,
      title: 'Fly me to the Alpha Centauri',
      tag: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
    {
      star: true,
      level: 16,
      id: 1011,
      title: 'Fly me to the Alpha Centauri',
      tag: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
    {
      star: false,
      level: 11,
      id: 1011,
      title: 'Fly me to the Alpha Centauri',
      tag: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
  ];

  return (
    <>
      <Box fontSize="24px">USERID 님을 위한 추천 문제</Box>
      <Box fontSize="12px">
        비슷한 실력을 가진 사용자를 기반으로 문제를 추천해드립니다. <br />
        본인의 목적에 맞는 문제를 찾아 풀어보세요.
      </Box>
      <QuizTable />
    </>
  );
};
