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
import { RivalListDefault } from '../components/recRival/setting/RivalListDefault';
import { SetStateAction, useState } from 'react';
import RivalRecMain from '../components/recRival/recommend/RivalRecMain';
import { RivalCompareDetail } from '../components/recRival/recommend/RivalCompareDetail';

export const RecUserPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const highFunction = (text: any) => {
    console.log(text);
    if (text === 'RivalList') {
      setTabIndex(1);
    } else if (text === 'RivalCompare') {
      setTabIndex(0);
      setComp(RivalCompareDetail);
    } else {
      setTabIndex(1);
      setComp2(RivalCompareDetail);
    }
  };

  const [comp, setComp] = useState(<RivalRecMain propFunction={highFunction} />);
  const [comp2, setComp2] = useState(<RivalListDefault topPropFunction={highFunction} />);

  const handleTabsChange = (index: SetStateAction<number>) => {
    setTabIndex(index);
    if (index === 0) {
      setComp(<RivalRecMain propFunction={highFunction} />);
    } else {
      setComp2(<RivalListDefault topPropFunction={highFunction} />);
    }
  };

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
          <Center fontSize="16px" fontWeight={useColorModeValue(500, 200)} textAlign="center">
            {getUserID()} 님과 비슷한 실력을 가진 라이벌을 추천해 드립니다.
            <br />
            실력 공유를 통해 함께 성장해보세요.
          </Center>
        </VStack>
      </Center>
      {/* main body */}
      <Box>
        <Tabs
          variant="unstyled"
          orientation="vertical"
          mx="10vw"
          my="6vh"
          index={tabIndex}
          onChange={handleTabsChange}
        >
          <Sidebar first="라이벌 추천 목록" second="라이벌 관리" third="" />
          <TabPanels ml="4vw" bg="" mb="10vh">
            <TabPanel>
              <Box children={comp} />
            </TabPanel>
            <TabPanel>
              <Box children={comp2} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
