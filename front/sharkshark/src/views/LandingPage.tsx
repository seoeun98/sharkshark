import { Box, Center, Text } from '@chakra-ui/react';
import { ColorText } from '../components/common/ColorText';
import Footer from '../components/common/Footer';
import FooterWave from '../components/common/FooterWave';

export const LandingPage = () => {
  return (
    <Box>
      <Box h="120vh">
        {' '}
        <Text fontSize="3xl"> Title </Text>
        LandingPage
      </Box>

      {/* <Center h="100%">
        <ColorText>샥샥!</ColorText>
        <Box>막힘 없는</Box>
        <Box>알고리즘 문제 풀이를 위한</Box>
        <Box>문제 추천 서비스</Box>
      </Center> */}
      <Footer />
      <Box w="100%" position="absolute" bottom={0}>
        <FooterWave />
      </Box>
    </Box>
  );
};
