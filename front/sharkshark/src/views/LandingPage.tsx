import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Footer from '../components/layouts/Footer';

export const LandingPage = () => {
  return (
    <Box m={0} p={0}>
      <Box h="120vh">
        {' '}
        <Text fontSize="3xl"> Title </Text>
        LandingPage
      </Box>

      <Footer />
    </Box>
  );
};
