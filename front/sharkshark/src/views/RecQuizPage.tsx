import {
  Box,
  Center,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { QuizItem } from '../components/QuizItem';
import { Problem } from '../types/DataTypes';

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

export const RecQuizPage = () => {
  return (
    <Box>
      {/* image & slogan */}
      <Center
        bgImage={useColorModeValue(
          'url(/assets/header/problem_header_light.png)',
          'url(/assets/header/problem_header.png)',
        )}
        bgSize="cover"
        bgPos="center"
        h="35vh"
        textAlign="center"
      >
        <VStack spacing="1vh">
          <Box fontSize="32px" pt="4vh" fontWeight={useColorModeValue(800, 700)}>
            너만을 위한, 추천 문제
          </Box>
          <Box fontSize="16px" fontWeight={useColorModeValue(500, 200)}>
            BOJ 문제 풀이 이력과 유저 정보를 바탕으로 <br />
            알고리즘 풀이 실력 향상을 위한 문제를{' '}
            <Text
              bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
              bgClip="text"
              fontSize="18px"
              fontWeight={useColorModeValue(800, 700)}
              display="inline"
            >
              샥샥
            </Text>{' '}
            모아 봤어요.
          </Box>
        </VStack>
      </Center>

      {/* main body */}
      <Box>
        <Tabs orientation="vertical" mx="10vw" my="5vh">
          <TabList w="11vw" bg="neutral.200">
            <Tab>전체</Tab>
            <Tab>사용자 기반 추천 문제</Tab>
            <Tab>유형별 추천 문제</Tab>
          </TabList>

          <TabPanels bg="neutral.100" ml="5vw">
            <TabPanel>
              <Box fontSize="24px">USERID 님을 위한 추천 문제</Box>
              <Box fontSize="12px">
                비슷한 실력을 가진 사용자를 기반으로 문제를 추천해드립니다. <br />
                본인의 목적에 맞는 문제를 찾아 풀어보세요.
              </Box>
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
                      <QuizItem problem={item} key={index} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
