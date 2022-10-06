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
import { RivalListDefault } from '../components/layouts/recRival/setting/RivalListDefault';
import { SetStateAction, useState } from 'react';
import RivalRecMain from '../components/layouts/recRival/recommend/RivalRecMain';
import RivalCompareChart from '../components/layouts/dataChart/rival/RivalCompareChart';
import { useDispatch, useSelector } from 'react-redux';
import { setCompStatus, setGoHome } from '../reducers/rivalAPIReducer';
import { ColorText } from '../components/common/ColorText';

export const RecUserPage = () => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [tabIndex2, setTabIndex2] = useState(0);
  const [tabIndex3, setTabIndex3] = useState(0);
  let mb = '10vh';
  const compStatus = useSelector((state: any) => state.rivalAPIReducer.compStatus);
  const goHome = useSelector((state: any) => state.rivalAPIReducer.goHome);
  const registed = useSelector((state: any) => state.rivalAPIReducer.registed);

  const handleTabsChange = (index: SetStateAction<number>) => {
    setTabIndex2(0);
    setTabIndex3(0);
    setTabIndex(index);
  };

  const handleTabsChange2 = (index: SetStateAction<number>) => {
    setTabIndex2(index);
  };
  const handleTabsChange3 = (index: SetStateAction<number>) => {
    setTabIndex3(index);
  };
  if (compStatus === 'RivalCompare' && tabIndex2 === 0 && tabIndex === 0) {
    setTabIndex2(1);
    dispatch(setCompStatus(''));
  }

  if (compStatus === 'RivalCompare' && tabIndex3 === 0 && tabIndex === 1) {
    setTabIndex3(1);
    dispatch(setCompStatus(''));
  }

  if (goHome === true && tabIndex3 === 1 && tabIndex === 1) {
    setTabIndex3(0);
    dispatch(setGoHome(false));
  }

  if (goHome === true && tabIndex2 === 1 && tabIndex === 0) {
    setTabIndex2(0);
    dispatch(setGoHome(false));
  }
  if (compStatus === 'RivalAccount' && tabIndex === 0) {
    setTabIndex(1);
    setTabIndex3(0);
    dispatch(setCompStatus(''));
  }

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
            <Box p="0" m="0">
              <ColorText>{getUserID()}</ColorText> 님과 비슷한 실력을 가진 라이벌을 추천해 드립니다.
              <br />
              실력 공유를 통해 함께 성장해보세요.
            </Box>
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
          isLazy={true}
        >
          <Sidebar first="라이벌 추천 목록" second="라이벌 관리" third="" />
          <TabPanels ml="4vw" bg="" mb={mb}>
            <TabPanel>
              <Tabs index={tabIndex2} onChange={handleTabsChange2} isLazy={true}>
                <TabPanels>
                  <TabPanel>
                    <RivalRecMain />
                  </TabPanel>
                  <TabPanel>
                    <RivalCompareChart Rectype={registed} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Tabs index={tabIndex3} onChange={handleTabsChange3} isLazy={true}>
                <TabPanels>
                  <TabPanel>
                    <RivalListDefault />
                  </TabPanel>
                  <TabPanel>
                    <RivalCompareChart Rectype="" />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
