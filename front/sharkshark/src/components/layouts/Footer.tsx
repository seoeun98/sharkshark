import { Box } from '@chakra-ui/react';
import FooterWave from './FooterWave';

const Footer = () => {
  return (
    <Box h="14vh" w="100%" pos="absolute" bottom="0">
      <FooterWave />
    </Box>
  );
};

export default Footer;
