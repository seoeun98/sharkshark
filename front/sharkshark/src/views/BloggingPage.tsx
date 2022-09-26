import { Box, Button, Center, useColorModeValue, VStack } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { Tier } from '../components/common/Tier';
import { QuizTable } from '../components/recquiz/QuizTable';
import { Problem } from '../types/DataTypes';
export const BloggingPage = () => {
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
  ];

  return (
    <Box>
      {/* image & slogan */}
      <Center
        bgImage={useColorModeValue(
          'url(/assets/header/github_header_light.png)',
          'url(/assets/header/github_header.png)',
        )}
        bgSize="cover"
        bgPos="center"
        h="35vh"
        textAlign="center"
      >
        <VStack spacing="1vh">
          <Box fontSize="32px" pt="4vh" fontWeight={useColorModeValue(800, 700)}>
            깃허브 블로그 포스팅
          </Box>
          <Box fontSize="16px" fontWeight={useColorModeValue(500, 200)}>
            문제 풀이 블로그를 작성하기 번거롭지 않으셨나요?
            <br />
            깃허브 블로그에 내가 푼 문제에 한해 자동 포스팅을 해드립니다.
          </Box>
        </VStack>
      </Center>

      {/* main body */}
      <Box mx="10vw" my="6vh">
        {/* 초기 설정 */}
        <Box mb="6vh">
          <Box fontSize="24px">블로그 계정 초기 설정</Box>
          <Box fontSize="12px" mt="2vh" mb="4vh">
            깃허브 블로그 포스팅을 위해 계정 연동이 필요합니다.
            <br />
            GitHub에 로그인 하여 계정을 인증해주세요.
          </Box>
          <Box ml="2vw">
            <Button borderRadius="8px" px="40px">
              <FaGithub fontSize="20px" /> &nbsp; Github 계정 연동
            </Button>
          </Box>
        </Box>

        {/* 문제 선택 */}
        <Box mb="6vh">
          <Box fontSize="24px">문제 선택</Box>
          <Box fontSize="12px" mt="2vh" mb="4vh">
            계정에 올릴 문제를 선택해주세요.
            <br />
            최근 풀이한 문제 5개 중 하나를 선택할 수 있습니다.
          </Box>
          <Box ml="2vw">
            {testdata.map((item, index) => (
              <Box key={index} bg="neutral.500" borderRadius="10px">
                {/* level */}
                <Box ml="16px" w="24px">
                  <Tier level={item.level} size="auto" />
                </Box>

                {/* id */}
                <Box ml="24px">{item.id}</Box>

                {/* title */}
                <Box ml="16px">
                  <Box mb="16px">{item.title}</Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
