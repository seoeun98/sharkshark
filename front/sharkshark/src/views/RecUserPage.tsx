import {
  Box,
  Center,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { Sidebar } from '../components/common/Sidebar';
import { getUserID } from '../api/common';
import { ColorText } from '../components/common/ColorText';

export const RecUserPage = () => {
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
            {getUserID()} 님과 비슷한 실력을 가진 라이벌을 추천해 드립니다.
            <br />
            실력 공유를 통해 함께 성장해보세요.
          </Box>
        </VStack>
      </Center>
      {/* main body */}
      <Box>
        <Tabs variant="unstyled" orientation="vertical" mx="10vw" my="6vh">
          <Sidebar first="라이벌 추천 목록" second="라이벌 관리" third="" />
          <TabPanels ml="4vw" bg="">
            <TabPanel>
              <HStack fontSize="24px" fontWeight={titlefw} marginBottom="3rem">
                <ColorText>{getUserID()}</ColorText>
                <Box>님의 라이벌 추천 목록</Box>
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
