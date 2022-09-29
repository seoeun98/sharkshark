import { Box, Center, useColorModeValue, VStack } from '@chakra-ui/react';
export const BloggingPage = () => {
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
    </Box>
  );
};
