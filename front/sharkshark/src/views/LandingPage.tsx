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
                top={150}
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
                <Button
                  w="300px"
                  h="60px"
                  borderRadius="52px"
                  fontSize="18px"
                  fontWeight={useColorModeValue(800, 700)}
                >
                  <Link to="/login">시작하기</Link>
                </Button>
              </VStack>
            </Center>
            <Center
              m={0}
              data-aos="fade-up"
              h="300px"
              w="100%"
              bgGradient="linear(to-r, primary.purple0,primary.cyan50)"
            >
              <VStack fontSize="18px" color="white">
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
                  <Box fontSize="40px" pt="4vh" fontWeight={useColorModeValue(800, 700)} mb={24}>
                    오직 너만을 위한, <br />
                    추천 문제
                  </Box>
                  <Box fontSize="24px" fontWeight={useColorModeValue(500, 200)} ml={2}>
                    BOJ 문제 풀이 이력과 유저 정보를 바탕으로 <br />
                    알고리즘 풀이 실력 향상을 위한 문제를
                    <br />
                    <Text
                      bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
                      bgClip="text"
                      fontSize="32px"
                      fontWeight={useColorModeValue(800, 700)}
                      display="inline"
                    >
                      샥샥
                    </Text>{' '}
                    모아 봤어요.
                  </Box>
                </Box>

                <Image data-aos="fade-left" src="/assets/landing/problem_Rec.svg" h="450px" />
              </Flex>
            </Center>
            <Center h="650px" w="64vw">
              <Flex justifyContent="space-between" w="100%">
                <Image src="/assets/landing/rival_rec.svg" h="450px" data-aos="fade-right" />
                <Box data-aos="fade-left">
                  <Box fontSize="40px" pt="4vh" fontWeight={useColorModeValue(800, 700)} mb={24}>
                    지피지기(知彼知己)면 <br />
                    백전불태(百戰不殆)
                  </Box>
                  <Box fontSize="24px" fontWeight={useColorModeValue(500, 200)} ml={2}>
                    비슷한 실력을 가진 라이벌을 추천해 드립니다. <br />
                    실력 공유를 통해 함께 성장해보세요.
                  </Box>
                </Box>
              </Flex>
            </Center>
            <HStack h="650px" w="64vw">
              <Flex justifyContent="space-between" w="100%">
                <Box data-aos="fade-right">
                  <Box fontSize="40px" pt="4vh" fontWeight={useColorModeValue(800, 700)} mb={24}>
                    나만의 실전 연습,
                    <br />
                    모의 코딩 테스트
                  </Box>
                  <Box fontSize="24px" fontWeight={useColorModeValue(500, 200)} ml={2}>
                    사용자 실력을 분석해 모의 코딩 테스트를 진행합니다. <br />
                    실제 코딩 테스트처럼 연습해보고
                    <br />
                    실력을 점검해보세요!
                  </Box>
                </Box>

                <Image data-aos="fade-left" src="/assets/landing/test.svg" h="450px" />
              </Flex>
            </HStack>
            <Center h="650px" w="64vw">
              <Flex justifyContent="space-between" w="100%">
                <Image data-aos="fade-right" src="/assets/landing/github.svg" h="450px" />
                <Box data-aos="fade-left">
                  <Box fontSize="40px" pt="4vh" fontWeight={useColorModeValue(800, 700)} mb={24}>
                    깃허브 블로그 포스팅
                  </Box>
                  <Box fontSize="24px" fontWeight={useColorModeValue(500, 200)} ml={2}>
                    문제 풀이 블로그를 작성하기 번거롭지 않으셨나요? <br />
                    깃허브 블로그에 내가 푼 문제에 한해
                    <br />
                    자동 포스팅을 해드립니다.
                  </Box>
                </Box>
              </Flex>
            </Center>
            <Center h="650px" w="64vw">
              <Flex justifyContent="space-between" w="100%">
                <Box data-aos="fade-right">
                  <Box fontSize="40px" pt="4vh" fontWeight={useColorModeValue(800, 700)} mb={24}>
                    당신의 성장을 위한, <br />
                    실력 분석
                  </Box>
                  <Box fontSize="24px" fontWeight={useColorModeValue(500, 200)} ml={2}>
                    푼 문제를 바탕으로 실력을 분석하여 보여드립니다. <br />
                    나의 객관적인 지표로 <br />
                    알고리즘 풀이 실력을 점검해보세요.
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

              <Button variant="secondary" h="60px" fontSize="18px">
                <ColorText>
                  <Link to="/login">지금 바로 시작하기</Link>
                </ColorText>
              </Button>
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
