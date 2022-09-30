import {
  Center,
  useColorModeValue,
  VStack,
  Image,
  Text,
  Box,
  Flex,
  Link,
  HStack,
} from '@chakra-ui/react';
import FooterWave from './FooterWave';

const Footer = () => {
  const image = useColorModeValue('/assets/logo/logo_dark.svg', '/assets/logo/logo_light.svg');

  return (
    <Box w="100%" position="absolute" bottom={-20}>
      <VStack spacing={12} position="relative">
        <Image src={image} w="200px" />
        <Center alignItems="center">
          <Box color="12px" fontWeight={useColorModeValue(500, 200)}>
            본 웹사이트는 Baekjoon Online Judge 또는 solved.ac와 관련이 없으며, 비영리로 운영되는 팀
            프로젝트의 결과물입니다.
            <br />
            <Center>
              프로젝트의 자세한 내용은&nbsp;
              <Text
                bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
                bgClip="text"
                fontSize="16px"
                fontWeight={useColorModeValue(800, 700)}
                display="inline"
              >
                <Link href="https://lab.ssafy.com/s07-bigdata-recom-sub2/S07P22B205">
                  SharkShark Gitlab Repository
                </Link>
              </Text>{' '}
              를 참고해주세요.
            </Center>
          </Box>
        </Center>
        <HStack spacing={12}>
          <Center
            w="36px"
            h="36px"
            borderRadius={16}
            bg={useColorModeValue('black', 'white')}
            _hover={{ w: '40px', h: '40px', boxShadow: 'dark-xl' }}
          >
            <Image src="/assets/footer/gitlab.svg" w="24px" />
          </Center>
          <Center
            w="36px"
            h="36px"
            borderRadius={16}
            bg={useColorModeValue('black', 'white')}
            _hover={{ w: '40px', h: '40px', boxShadow: 'dark-xl' }}
          >
            <Image src="/assets/footer/github.svg" w="24px" />
          </Center>
          <Center
            w="36px"
            h="36px"
            borderRadius={16}
            bg={useColorModeValue('black', 'white')}
            _hover={{ w: '40px', h: '40px', boxShadow: 'dark-xl' }}
          >
            <Image src="/assets/footer/mail.svg" w="24px" />
          </Center>
        </HStack>

        <Center
          fontSize="12px"
          fontWeight="400"
          color={useColorModeValue('neutral.500', 'neutral.0')}
        >
          © 2022 SharkShark All Rights Reserved
        </Center>
      </VStack>
    </Box>
  );
};

export default Footer;
