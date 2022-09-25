import { Box, Button, Flex } from '@chakra-ui/react';
import { Problem } from '../../types/DataTypes';
import { QuizTableItem } from './QuizTableItem';

export const QuizTable = () => {
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
    <Box>
      <Box p="8px" bg="gray.500" borderRadius="10px">
        <Flex>
          {/* star */}
          <Box w="24px" ml="16px" />
          {/* level */}
          <Box ml="16px">레벨</Box>
          {/* id */}
          <Box ml="16px">ID</Box>
          {/* title */}
          <Box ml="16px">제목</Box>
        </Flex>
      </Box>
      <Box h="400px" overflow="auto">
        {testdata.map((item, index) => (
          <Box my="8px">
            <QuizTableItem problem={item} key={index} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
