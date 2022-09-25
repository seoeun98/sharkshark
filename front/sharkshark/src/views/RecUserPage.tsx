import {
  Box,
  Center,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';

export const RecUserPage = () => {
  const hoverColor = useColorModeValue('neutral.700', 'neutral.50');
  const selectedColor = useColorModeValue('black', 'white');
  const bgColor = useColorModeValue('#F1F3F5', 'neutral.500');
  const selectedfw = useColorModeValue(700, 500);
  const basicfw = useColorModeValue(400, 300);
  const titlefw = useColorModeValue(700, 500);

  return (
    <Box>
      {/* image & slogan */}
      <Center
        bgImage={useColorModeValue(
          'url(/assets/header/rival_header_light.png)',
          'url(/assets/header/rival_header.png)',
        )}
        bgSize="cover"
        bgPos="center"
        h="35vh"
        textAlign="center"
      >
        <VStack spacing="1vh">
          <Box fontSize="32px" pt="4vh" fontWeight={useColorModeValue(800, 700)}>
            지피지기(知彼知己)면 백전불태(百戰不殆)
          </Box>
          <Box fontSize="16px" fontWeight={useColorModeValue(500, 200)}>
            USERID 님과 비슷한 실력을 가진 라이벌을 추천해 드립니다.
            <br />
            실력 공유를 통해 함께 성장해보세요.
          </Box>
        </VStack>
      </Center>
      {/* main body */}
      <Box>
        <Tabs variant="unstyled" orientation="vertical" mx="10vw">
          <TabList w="10vw" my="6vh">
            <Tab
              w={180}
              h={12}
              fontSize="1rem"
              borderRadius="8px"
              marginBottom="8px"
              fontWeight={basicfw}
              color="neutral.200"
              _hover={{
                color: hoverColor,
              }}
              _selected={{
                color: selectedColor,
                fontWeight: selectedfw,
                bg: bgColor,
              }}
            >
              추천 목록
            </Tab>
            <Tab
              w={180}
              h={12}
              fontSize="1rem"
              borderRadius="8px"
              marginBottom="8px"
              fontWeight="400"
              color="neutral.200"
              _hover={{
                color: hoverColor,
              }}
              _selected={{
                color: selectedColor,
                fontWeight: 600,
                bg: bgColor,
              }}
            >
              라이벌 목록
            </Tab>
          </TabList>

          <TabPanels ml="4vw" marginTop="4vh" bg="">
            <TabPanel>
              <HStack fontWeight={titlefw} marginBottom="3rem">
                <Box
                  fontSize="22px"
                  fontWeight="800"
                  bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
                  bgClip="text"
                >
                  USERID
                </Box>
                <Box fontSize="24px">님의 라이벌 추천 목록</Box>
              </HStack>
              <Box h="44vh" bg="neutral.200" />
            </TabPanel>
            <TabPanel>
              <p>라이벌 목록</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
