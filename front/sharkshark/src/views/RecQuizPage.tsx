import {
  Box,
  Center,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { ColorText } from '../components/common/ColorText';
import { Sidebar } from '../components/common/Sidebar';
import { QuizMenuDefault } from '../components/layouts/recquiz/QuizMenuDefault';
import { QuizMenuRival } from '../components/layouts/recquiz/QuizMenuRival';
import { QuizMenuTag } from '../components/layouts/recquiz/QuizMenuTag';

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
            <Text fontSize="18px" display="inline">
              <ColorText>샥샥</ColorText>
            </Text>{' '}
            모아 봤어요.
          </Box>
        </VStack>
      </Center>

      {/* main body */}
      <Box>
        <Tabs variant="unstyled" orientation="vertical" mx="10vw" my="6vh" isLazy>
          <Sidebar first="실력별 추천" second="풀이 유형별 추천" third="주요 알고리즘 문제" />

          <TabPanels ml="5vw">
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
