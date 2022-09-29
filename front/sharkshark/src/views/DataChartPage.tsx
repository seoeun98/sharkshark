import { Box, Center, useColorModeValue, VStack } from '@chakra-ui/react';

export const DataChartPage = () => {
  return (
    <Box>
      {/* image & slogan */}
      <Center
        bgImage={useColorModeValue(
          'url(/assets/header/analysis_header_light.png)',
          'url(/assets/header/analysis_header.png)',
        )}
        bgSize="cover"
        bgPos="center"
        h="35vh"
        textAlign="center"
      >
        <VStack spacing="1vh">
          <Box fontSize="32px" pt="4vh" fontWeight={useColorModeValue(800, 700)}>
            성장을 위한, 실력 분석
          </Box>
          <Box fontSize="16px" fontWeight={useColorModeValue(500, 200)}>
            푼 문제를 바탕으로 실력을 분석하여 보여드립니다.
            <br />
            나의 객관적인 지표로 알고리즘 풀이 실력을 점검해보세요.
          </Box>
        </VStack>
      </Center>
    </Box>
  );
};
