import { Box, Button, Flex } from '@chakra-ui/react';
import { Problem } from '../../../types/DataTypes';
import { QuizTable } from './QuizTable';
import { QuizTableItem } from './QuizTableItem';

export const QuizMenuRival = () => {
  const testdata: Array<Problem> = [
    {
      star: false,
      level: 11,
      no: 1011,
      title: 'Fly me to the Alpha Centauri',
      tags: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
    {
      star: true,
      level: 16,
      no: 1011,
      title: 'Fly me to the Alpha Centauri',
      tags: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
    {
      star: false,
      level: 11,
      no: 1011,
      title: 'Fly me to the Alpha Centauri',
      tags: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
    {
      star: true,
      level: 16,
      no: 1011,
      title: 'Fly me to the Alpha Centauri',
      tags: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
    {
      star: false,
      level: 11,
      no: 1011,
      title: 'Fly me to the Alpha Centauri',
      tags: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
    {
      star: true,
      level: 16,
      no: 1011,
      title: 'Fly me to the Alpha Centauri',
      tags: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
    {
      star: false,
      level: 11,
      no: 1011,
      title: 'Fly me to the Alpha Centauri',
      tags: '수학 math',
      acceptedUserCnt: 24601,
      avgTries: 2.22,
    },
  ];

  return (
    <Box pos="relative">
      <Button pos="absolute" right="0">
        라이벌 추가 등록
      </Button>
      <Box fontSize="24px">라이벌 기반 추천 문제</Box>
      <Box fontSize="12px">
        지피지기(知彼知己)면 백전불태(百戰不殆) <br />
        라이벌이 풀었지만, 내가 풀지 않았던 문제를 알려드려요.
      </Box>
      <QuizTable />
    </Box>
  );
};
