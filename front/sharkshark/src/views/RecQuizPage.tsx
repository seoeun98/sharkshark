import {
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { QuizMenuDefault } from '../components/recquiz/QuizMenuDefault';
import { QuizMenuRival } from '../components/recquiz/QuizMenuRival';
import { QuizMenuTag } from '../components/recquiz/QuizMenuTag';

export const RecQuizPage = () => {
  const hoverColor = useColorModeValue('neutral.700', 'neutral.50');
  const selectedColor = useColorModeValue('black', 'white');
  const bgColor = useColorModeValue('#F1F3F5', 'neutral.500');
  const selectedfw = useColorModeValue(700, 500);
  const basicfw = useColorModeValue(400, 300);
  const titlefw = useColorModeValue(700, 500);

  const TabStyle = {
    w: 180,
    h: 12,
    fontSize: '1rem',
    borderRadius: '8px',
    marginBottom: '8px',
    fontWeight: { basicfw },
    color: 'neutral.200',
    _hover: {
      color: hoverColor,
    },
    _selected: {
      color: selectedColor,
      fontWeight: selectedfw,
      bg: bgColor,
    },
  };
  // <Tab sx={TabStyle}>전체</Tab>
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
        <Tabs variant="unstyled" orientation="vertical" mx="10vw" my="6vh">
          <TabList w="10vw">
            <Tab sx={TabStyle}>전체</Tab>
            <Tab sx={TabStyle}>사용자 기반 추천 문제</Tab>
            <Tab sx={TabStyle}>유형별 추천 문제</Tab>
          </TabList>

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
