import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
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
      level: 18,
      id: 1011,
      title: 'Fly me to the Alpha Centauri',
      tag: '수학 math,다이나믹 프로그래밍 DP',
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
      <Box p="8px" bg={useColorModeValue('neutral.100', 'neutral.800')} borderRadius="10px">
        <Flex>
          {/* star */}
          <Box w="24px" ml="24px" />
          {/* level */}
          <Box ml="16px">레벨</Box>
          {/* id */}
          <Box ml="16px">ID</Box>
          {/* title */}
          <Box ml="16px">제목</Box>
        </Flex>
      </Box>
      <Box
        h="400px"
        my="8px"
        overflow="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-track': {
            background: useColorModeValue('#CBCDD6', '#18181A'),
            borderRadius: '12px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(0deg, #997BED 0%, #4AE2DE 100%)',
            borderRadius: '12px',
          },
        }}
      >
        {testdata.map((item, index) => (
          <Box mb="8px" mr="8px" key={index}>
            <QuizTableItem problem={item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
