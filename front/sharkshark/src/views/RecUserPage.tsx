import {
  Box,
  Center,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Sidebar } from '../components/common/Sidebar';
import { getUserID } from '../api/common';
import { RivalRecDefault } from '../components/recRival/RivalRecDefault';
import { RivalListDefault } from '../components/recRival/RivalListDefault';

export const RecUserPage = () => {
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
          <TabPanels ml="4vw" bg="" mb="10vh">
            <TabPanel>
              <RivalRecDefault />
            </TabPanel>
            <TabPanel>
              <RivalListDefault />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
