import { Box, Text } from '@chakra-ui/react';
import Footer from '../components/common/Footer';
import FooterWave from '../components/common/FooterWave';

export const LandingPageAfterLogin = () => {
  return (
    <Box>
      <Box h="120vh">
        {' '}
        <Text fontSize="3xl"> Title </Text>
        LandingPage
      </Box>

      <Footer />
      <Box w="100%" position="absolute" bottom={0}>
        <FooterWave />
      </Box>
    </Box>
  );
};
