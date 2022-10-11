import {
  Box,
  Button,
  Center,
  HStack,
  Text,
  useColorModeValue,
  VStack,
  Image,
  keyframes,
  Flex,
  Spacer,
  GridItem,
  Grid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ColorText } from '../components/common/ColorText';
import Footer from '../components/common/Footer';
import FooterWave from '../components/common/FooterWave';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getUserID } from '../api/common';

export const LandingPage = () => {
  const animationKeyframes = keyframes`
  0% { transform: rotate(0);  }
  25% { transform: rotate(0); }
  50% { transform: rotate(20deg);}
  75% { transform: rotate(-10deg); }
  100% { transform: rotate(0); }
`;

  const animationKeyframes5 = keyframes`
  0% { transform: rotate(-20deg);  }
  25% { transform: rotate(0); }
  50% { transform: rotate(-10deg);
  75% { transform: rotate(-20deg); }
  100% { transform: rotate(20deg); }
  `;

  const animationKeyframes8 = keyframes`
  0% { transform: rotate(20deg);  }
  50% { transform: rotate(22deg);}
  100% { transform: rotate(20deg); }
  `;

  const animationKeyframes6 = keyframes`
  0% { transform: rotate(2deg);  }
  50% { transform: rotate(-2deg);}
  100% { transform: rotate(2deg); }
  `;

  const animationKeyframes7 = keyframes`
0% { transform: rotate(-30deg);  }
50% { transform: rotate(-60deg);}
100% { transform: rotate(-30deg); }
`;

  const animationKeyframes2 = keyframes`
  0% { transform: rotate(0deg);  }
  100% { transform: rotate(-360deg); }
`;

  const animationKeyframes3 = keyframes`
  0% { transform: rotate(180deg);  }
  100% { transform: rotate(-180deg); }
`;

  const animationKeyframes4 = keyframes`
  0% { transform: scale(1) rotate(0);}
  25% { transform: scale(1.1) }
  100% { transform: scale(1) rotate(0); }
`;

  useEffect(() => {
    AOS.init();
  });

  const animation = `${animationKeyframes} 1s ease-in-out infinite`;
  const animation2 = `${animationKeyframes2} 30s ease-in-out infinite`;
  const animation3 = `${animationKeyframes3} 20s infinite`;
  const animation4 = `${animationKeyframes4} 1s ease-in-out infinite`;
  const animation5 = `${animationKeyframes5} 1s ease-in-out infinite`;
  const animation6 = `${animationKeyframes6} 4s ease-in-out infinite`;
  const animation7 = `${animationKeyframes7} 1s ease-in-out infinite`;
  const animation8 = `${animationKeyframes8} 4s ease-in-out infinite`;
  const color = useColorModeValue(800, 700);

  return (
    <Box>
      <Box h="700vh">
        <VStack>
          <Box w="100%">
            <Center h="100vh" w="100%" bgSize="cover">
              <Box as={motion.div} animation={animation2} w={300} pos="absolute" top={10} left={0}>
                <Image w={300} src="/assets/landing/left_circle_big.svg" />
              </Box>

              <Box as={motion.div} animation={animation4} w={20} pos="absolute" top={60} left={300}>
                <Image w={20} src="/assets/landing/left_small_circle1.svg" />
              </Box>
              <Box
                as={motion.div}
                animation={animation4}
                w={30}
                pos="absolute"
                top={360}
                left={200}
              >
                <Image w={30} src="/assets/landing/left_small_circle1.svg" />
              </Box>
              <Image
                src="/assets/landing/background_bottom.png"
                pos="absolute"
                top="32vh"
                right={0}
              />

              <Box
                as={motion.div}
                animation={animation2}
                w={800}
                pos="absolute"
                top="20vh"
                right={-80}
              >
                <Image w={800} src="/assets/landing/big_right_circle.svg" />
              </Box>
              <Box
                as={motion.div}
                animation={animation3}
                w={600}
                pos="absolute"
                top={540}
                right={-200}
              >
                <Image pos="absolute" w={240} src="/assets/landing/small_right_circle.svg" />
              </Box>

              <VStack spacing={32}>
                <VStack spacing={0}>
                  <Box as={motion.div} animation={animation5} w={10} ml="216px" mb={-6}>
                    <Image w={10} src="/assets/landing/star.svg" />
                  </Box>
                  <Flex fontSize="48px" fontWeight="700" alignItems="center">
                    원하는 문제만&nbsp;&nbsp;
                    <Box as={motion.div} animation={animation}>
                      <Text
                        bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
                        bgClip="text"
                        fontSize="60px"
                        fontWeight={useColorModeValue(800, 700)}
                        display="inline"
                      >
                        샥샥!&nbsp;
                      </Text>
                    </Box>
                    풀고 싶은
                  </Flex>

                  <Box fontSize="48px" fontWeight="700">
                    당신의 코딩 실력 향상을 위한 길잡이
                  </Box>
                </VStack>

                {getUserID() !== '' ? (
                  <Link to="/recommend/quiz">
                    <Button
                      w="300px"
                      h="60px"
                      borderRadius="52px"
                      fontSize="18px"
                      fontWeight={color}
                    >
                      시작하기
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button
                      w="300px"
                      h="60px"
                      borderRadius="52px"
                      fontSize="18px"
                      fontWeight={color}
                    >
                      시작하기
                    </Button>
                  </Link>
                )}
              </VStack>
            </Center>
            <Center
              m={0}
              h="300px"
              w="100%"
              bgGradient="linear(to-r, primary.purple0,primary.cyan50)"
            >
              <VStack fontSize="18px" color="white" data-aos="fade-up">
                <Center>
                  코딩테스트를 막힘없이{' '}
                  <Text fontWeight="700" fontSize="20px" color="#E2EAFF">
                    &nbsp;샥샥&nbsp;
                  </Text>{' '}
                  풀고 싶지 않으신가요?
                </Center>
                <Center>
                  원하는 문제를 원하는 문제를{' '}
                  <Text fontWeight="700" fontSize="20px" color="#E2EAFF">
                    &nbsp;알아서 잘 딱 깔끔하고 센스있게&nbsp;
                  </Text>{' '}
                </Center>
                <Center>
                  <Text fontWeight="700" fontSize="20px" color="#E2EAFF">
                    &nbsp;샥샥&nbsp;
                  </Text>{' '}
                  추천해드립니다.
                </Center>
              </VStack>
            </Center>
          </Box>
          <VStack spacing={0}>
            <Center h="88vh" w="64vw">
              <Flex justifyContent="space-between" w="100%">
                <Box data-aos="fade-right">
                  <Box fontSize="24px" fontWeight="800" pt="4vh" pb="2vh">
                    <ColorText>문제 추천</ColorText>
                  </Box>

                  <Box fontSize="44px" fontWeight={useColorModeValue(800, 700)} mb={24}>
                    오직 너만을 위한, <br />
                    추천 문제
                  </Box>
                  <Box fontSize="20px" fontWeight={useColorModeValue(500, 200)} ml={2}>
                    <Box mb={1}>BOJ 문제 풀이 이력과 유저 정보를 바탕으로</Box>
                    <Box mb={1}> 알고리즘 풀이 실력 향상을 위한 문제를</Box>
                    <Box>
                      <Text
                        fontSize="24px"
                        fontWeight={useColorModeValue(800, 600)}
                        display="inline"
                      >
                        샥샥
                      </Text>{' '}
                      모아 봤어요.
                    </Box>
                  </Box>
                </Box>
                <Flex data-aos="fade-left" w="30vw">
                  <Image
                    pos="absolute"
                    src="/assets/landing/gif/problem_2.gif"
                    shadow="base"
                    w={500}
                    h={260}
                    mt={240}
                    right={60}
                    borderRadius={10}
                    ml={-20}
                  />
                  <Image
                    src="/assets/landing/gif/problem_1.gif"
                    pos="absolute"
                    shadow="base"
                    right={30}
                    mt={10}
                    w={500}
                    h={260}
                    borderRadius={10}
                  />
                  <Image
                    pos="absolute"
                    h={280}
                    right={-20}
                    mt={240}
                    opacity="60%"
                    src="/assets/landing/problem_background.svg"
                  />
                  <Box w={360} mt={280} ml={72} as={motion.div} animation={animation6}>
                    <Image pos="absolute" w={360} src="/assets/landing/calculator.svg" />
                  </Box>
                </Flex>
              </Flex>
            </Center>
            <Center h="88vh" w="64vw">
              <Flex justifyContent="space-between" w="100%">
                <Flex data-aos="fade-right" w="40vw">
                  <Image
                    pos="absolute"
                    h={540}
                    opacity="60%"
                    src="/assets/landing/rival_background.svg"
                  />
                  <Image
                    src="/assets/landing/gif/rival_1.gif"
                    pos="absolute"
                    shadow="base"
                    mt={10}
                    w={460}
                    h={260}
                    left={20}
                    borderRadius={10}
                  />
                  <Image
                    pos="absolute"
                    src="/assets/landing/gif/rival_2.gif"
                    shadow="base"
                    w={460}
                    h={260}
                    mt={240}
                    left={80}
                    borderRadius={10}
                    ml={-20}
                  />
                  <Box w={220} pos="absolute" left={-30} as={motion.div} animation={animation6}>
                    <Image w={220} src="/assets/landing/rival_top.svg" />
                  </Box>
                  <Box
                    w={200}
                    mt={360}
                    pos="absolute"
                    right={0}
                    as={motion.div}
                    animation={animation6}
                  >
                    <Image w={200} src="/assets/landing/rival_2.svg" />
                  </Box>
                </Flex>

                <Box data-aos="fade-left">
                  <Box fontSize="24px" fontWeight="800" pt="4vh" pb="2vh">
                    <ColorText>라이벌 추천</ColorText>
                  </Box>
                  <Box fontSize="44px" fontWeight={useColorModeValue(800, 700)} mb={24}>
                    지피지기(知彼知己)면 <br />
                    백전불태(百戰不殆)
                  </Box>
                  <Box fontSize="20px" fontWeight={useColorModeValue(500, 300)} ml={2}>
                    <Box mb={1}>비슷한 실력을 가진 라이벌을 추천해 드립니다.</Box>
                    <Box mb={1}> 실력 공유를 통해 함께 성장해보세요.</Box>
                  </Box>
                </Box>
              </Flex>
            </Center>
            <HStack h="88vh" w="64vw">
              <Flex justifyContent="space-between" w="100%">
                <Box data-aos="fade-right">
                  <Box fontSize="24px" fontWeight="800" pt="4vh" pb="2vh">
                    <ColorText>코딩테스트</ColorText>
                  </Box>
                  <Box fontSize="44px" fontWeight={useColorModeValue(800, 700)} mb={24}>
                    나만의 실전 연습,
                    <br />
                    모의 코딩 테스트
                  </Box>
                  <Box fontSize="20px" fontWeight={useColorModeValue(500, 300)} ml={2}>
                    <Box mb={1}>실력을 반영한 모의 코딩 테스트를 준비했습니다.</Box>
                    <Box mb={1}>실제 코딩 테스트처럼 연습해보고,</Box>
                    <Box mb={1}>실력을 점검해보세요!</Box>
                  </Box>
                </Box>
                <Flex data-aos="fade-left" w="30vw">
                  <Image
                    pos="absolute"
                    src="/assets/landing/gif/test_2.gif"
                    shadow="base"
                    w={500}
                    h={260}
                    mt={10}
                    right={0}
                    borderRadius={10}
                    ml={-20}
                  />
                  <Image
                    src="/assets/landing/gif/test_1.gif"
                    pos="absolute"
                    shadow="base"
                    right={60}
                    mt={240}
                    w={500}
                    h={260}
                    borderRadius={10}
                  />
                  <Box
                    w={240}
                    ml={-15}
                    mt={-10}
                    pos="absolute"
                    as={motion.div}
                    animation={animation7}
                  >
                    <Image w={240} src="/assets/landing/trophy.svg" />
                  </Box>
                  <Box
                    w={340}
                    mt={280}
                    pos="absolute"
                    ml={72}
                    as={motion.div}
                    animation={animation6}
                  >
                    <Image w={340} src="/assets/landing/ide.svg" />
                  </Box>
                </Flex>
              </Flex>
            </HStack>
            <Center h="88vh" w="64vw">
              <Flex justifyContent="space-between" w="100%">
                <Flex data-aos="fade-right" w="40vw">
                  <Image
                    pos="absolute"
                    top={300}
                    left={400}
                    h={540}
                    opacity="60%"
                    src="/assets/landing/github_circle1.svg"
                  />
                  <Image
                    pos="absolute"
                    h={540}
                    opacity="60%"
                    src="/assets/landing/github_circle2.svg"
                  />
                  <Image
                    src="/assets/landing/gif/blogging_2.gif"
                    pos="absolute"
                    shadow="base"
                    mt={10}
                    w={500}
                    h={260}
                    left={20}
                    borderRadius={10}
                  />
                  <Image
                    src="/assets/landing/gif/blogging_3.gif"
                    pos="absolute"
                    shadow="base"
                    mt={200}
                    w={300}
                    h={240}
                    borderRadius={10}
                  />

                  <Box
                    w={360}
                    pos="absolute"
                    right={20}
                    mt={200}
                    as={motion.div}
                    animation={animation8}
                  >
                    <Image w={360} src="/assets/landing/github_landing.svg" />
                  </Box>
                </Flex>
                <Box data-aos="fade-left">
                  <Box fontSize="24px" fontWeight="800" pt="4vh" pb="2vh">
                    <ColorText>깃허브 자동 포스팅</ColorText>
                  </Box>
                  <Box fontSize="44px" fontWeight={useColorModeValue(800, 700)} mb={24}>
                    나의 풀이 기록을
                    <br /> 자동으로 간편하게!
                  </Box>
                  <Box fontSize="20px" fontWeight={useColorModeValue(500, 300)} ml={2}>
                    <Box mb={1}>문제 풀이 블로그를 작성하기 번거롭지 않으셨나요?</Box>
                    <Box mb={1}> 깃허브에 내가 푼 문제에 한해 자동 포스팅을 해드립니다.</Box>
                  </Box>
                </Box>
              </Flex>
            </Center>
            <Center h="88vh" w="64vw">
              <Flex justifyContent="space-between" w="100%">
                <Box data-aos="fade-right">
                  <Box fontSize="24px" fontWeight="800" pt="4vh" pb="2vh">
                    <ColorText>실력 분석</ColorText>
                  </Box>
                  <Box fontSize="44px" fontWeight={useColorModeValue(800, 700)} mb={24}>
                    당신의 성장을 위한, <br />
                    실력 분석
                  </Box>
                  <Box fontSize="20px" fontWeight={useColorModeValue(500, 300)} ml={2}>
                    <Box mb={1}>푼 문제를 바탕으로 실력을 분석하여 보여드립니다.</Box>
                    <Box mb={1}> 객관적인 지표로 알고리즘 풀이 실력을 점검해보세요.</Box>
                  </Box>
                </Box>
                <Flex data-aos="fade-left" w="30vw">
                  <Image
                    src="/assets/landing/gif/algo_analysis.gif"
                    pos="absolute"
                    shadow="base"
                    right={30}
                    mt={10}
                    w={400}
                    h={200}
                    borderRadius={10}
                  />
                  <Image
                    pos="absolute"
                    src="/assets/landing/gif/tier_analysis.gif"
                    shadow="base"
                    w={400}
                    h={200}
                    mt={120}
                    right={300}
                    borderRadius={10}
                  />

                  <Image
                    pos="absolute"
                    src="/assets/landing/gif/user_analysis.gif"
                    shadow="base"
                    w={400}
                    h={200}
                    mt={240}
                    right={100}
                    borderRadius={10}
                  />
                  <Box w={340} mt={280} pos="absolute" right={-100}>
                    <Image w={340} src="/assets/landing/WiC9.gif" />
                  </Box>
                </Flex>
              </Flex>
            </Center>
          </VStack>
          <Box h={20} />
          <HStack spacing={12}>
            <Center
              data-aos="zoom-in-right"
              flexDirection="column"
              w={380}
              h={200}
              bg={useColorModeValue('neutral.0', 'black')}
              borderRadius={10}
            >
              <Box fontWeight="600" fontSize="20px" mb={4}>
                문제 수
              </Box>
              <Center fontWeight="700" fontSize="28px">
                약&nbsp;&nbsp;
                <Box fontSize="40px" mr={1}>
                  <ColorText>23,000</ColorText>
                </Box>
                개
              </Center>
            </Center>
            <Center
              data-aos="zoom-in-up"
              flexDirection="column"
              w={380}
              h={200}
              bg={useColorModeValue('neutral.0', 'black')}
              borderRadius={10}
            >
              <Box fontWeight="600" fontSize="20px" mb={4}>
                사용자 수
              </Box>
              <Center fontWeight="700" fontSize="28px">
                약&nbsp;&nbsp;
                <Box fontSize="40px" mr={1}>
                  <ColorText>84,000</ColorText>
                </Box>
                명
              </Center>
            </Center>
            <Center
              data-aos="zoom-in-left"
              flexDirection="column"
              w={380}
              h={200}
              bg={useColorModeValue('neutral.0', 'black')}
              borderRadius={10}
            >
              <Box fontWeight="600" fontSize="20px" mb={4}>
                Interaction 수
              </Box>
              <Center fontWeight="700" fontSize="28px">
                약&nbsp;&nbsp;
                <Box fontSize="40px" mr={1}>
                  <ColorText>890만</ColorText>
                </Box>
                개
              </Center>
            </Center>
          </HStack>
          <Box h={40} />
          <Center
            h="320px"
            w="64vw"
            borderRadius="32px"
            bgGradient="linear(to-r, primary.purple0,primary.cyan50)"
            data-aos="flip-up"
          >
            <VStack fontSize="32px" color="white" fontWeight="600" spacing={8}>
              <Box>
                <Center>
                  <Text fontWeight="700" fontSize="32px" color="#E2EAFF">
                    &nbsp;바로 지금,&nbsp;
                  </Text>{' '}
                </Center>
                <Center>
                  <Text fontWeight="700" fontSize="40px" color="#E2EAFF">
                    &nbsp;샥샥
                  </Text>{' '}
                  과 함께 성장해보세요!
                </Center>
              </Box>

              {getUserID() !== '' ? (
                <Link to="/recommend/quiz">
                  <Button variant="secondary" h="60px" fontSize="18px">
                    <ColorText>바로 시작하기</ColorText>
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="secondary" h="60px" fontSize="18px">
                    <ColorText>바로 시작하기</ColorText>
                  </Button>
                </Link>
              )}
            </VStack>
          </Center>
        </VStack>{' '}
      </Box>

      <Footer />
      <Box w="100%" position="absolute" bottom={0}>
        <FooterWave />
      </Box>
    </Box>
  );
};
