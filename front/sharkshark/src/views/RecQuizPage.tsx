import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { QuizMenuDefault } from '../components/recquiz/QuizMenuDefault';
import { QuizMenuRival } from '../components/recquiz/QuizMenuRival';
import { QuizMenuTag } from '../components/recquiz/QuizMenuTag';

export const RecQuizPage = () => {
  return (
    <Box>
      {/* image & slogan */}
      <Box
        bgImage="https://bit.ly/3UuIGU9"
        bgSize="cover"
        bgPos="center"
        h="35vh"
        color="neutral.0"
        textAlign="center"
      >
        <Box fontSize="36px" pt="15vh">
          너만을 위한, 추천 문제
        </Box>
        <Box fontSize="18px">
          BOJ 문제 풀이 이력과 유저 정보를 바탕으로 <br />
          알고리즘 풀이 실력 향상을 위한 문제를{' '}
          <Text color="primary.purple0" fontSize="20px" fontWeight="600" display="inline">
            샥샥
          </Text>{' '}
          모아 봤어요.
        </Box>
      </Box>

      {/* main body */}
      <Box>
        <Tabs orientation="vertical" mx="10vw" my="5vh">
          <TabList w="11vw" bg="neutral.200">
            <Tab>전체</Tab>
            <Tab>라이벌 기반 추천 문제</Tab>
            <Tab>유형별 추천 문제</Tab>
          </TabList>

          <TabPanels bg="neutral.100" ml="5vw">
            <TabPanel>
              <QuizMenuDefault />
            </TabPanel>
            <TabPanel>
              <QuizMenuRival />
            </TabPanel>
            <TabPanel>
              <QuizMenuTag />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
