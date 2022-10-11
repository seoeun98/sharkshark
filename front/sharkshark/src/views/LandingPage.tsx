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

  useEffect(() => {
    AOS.init();
  });

  const animation = `${animationKeyframes} 1s ease-in-out infinite`;
  const color = useColorModeValue(800, 700);

  return (
    <Box>
      <Box h="5400px">
        <VStack>
          <Box w="100%">
            <Center
              h="1000px"
              bgImage="url(/assets/landing/background.png)"
              w="100%"
              bgSize="cover"
            >
              <Image src="/assets/landing/background_circle.svg" pos="absolute" top={0} left={0} />

              <Image
                src="/assets/landing/background_circle2.svg"
                pos="absolute"
                top={220}
                w={1200}
                right={0}
              />

              <VStack spacing={32}>
                <VStack spacing={0}>
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
            <Center h="650px" w="64vw">
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

                <Image data-aos="fade-left" src="/assets/landing/problem_Rec.svg" h="450px" />
              </Flex>
            </Center>
            <Center h="650px" w="64vw">
              <Flex justifyContent="space-between" w="100%">
                <Image src="/assets/landing/rival_rec.svg" h="450px" data-aos="fade-right" />
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
            <HStack h="650px" w="64vw">
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
                    <Box mb={1}>사용자 실력을 분석해 모의 코딩 테스트를 진행합니다.</Box>
                    <Box mb={1}> 실제 코딩 테스트처럼 연습해보고, 실력을 점검해보세요!</Box>
                  </Box>
                </Box>

                <Image data-aos="fade-left" src="/assets/landing/test.svg" h="450px" />
              </Flex>
            </HStack>
            <Center h="650px" w="64vw">
              <Flex justifyContent="space-between" w="100%">
                <Image data-aos="fade-right" src="/assets/landing/github.svg" h="450px" />
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
            <Center h="650px" w="64vw">
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

                <Image data-aos="fade-left" src="/assets/landing/analysis.svg" h="450px" />
              </Flex>
            </Center>
          </VStack>
          <Box h={20} />
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
                    <ColorText>지금 바로 시작하기</ColorText>
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="secondary" h="60px" fontSize="18px">
                    <ColorText>지금 바로 시작하기</ColorText>
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
