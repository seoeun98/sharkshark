import {
  Box,
  Center,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from '../components/common/Sidebar';
import { setAnalysisCompStatus } from '../reducers/CTReducer';
import DataChartPage from './DataChartPage';
import { DataRivalPage } from './DataRivalPage';
import { DataRoadPage } from './DataRoadPage';

export const DataChartMainPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const analysisCompStatus = useSelector((state: any) => state.CTReducer.analysisCompStatus);

  const dispatch = useDispatch();

  const handleTabsChange = (index: SetStateAction<number>) => {
    setTabIndex(index);
  };

  useEffect(() => {
    console.log(analysisCompStatus);
    if (analysisCompStatus === 2) {
      setTabIndex(2);
    }
    dispatch(setAnalysisCompStatus(0));
  });

  return (
    <Box>
      {/* image & slogan */}
      <Center
        bgImage={useColorModeValue(
          'url(/assets/header/analysis_header_light.png)',
          'url(/assets/header/analysis_header.png)',
        )}
        bgSize="cover"
        bgPos="center"
        h="35vh"
        textAlign="center"
      >
        <VStack spacing="1vh">
          <Box fontSize="32px" pt="4vh" fontWeight={useColorModeValue(800, 700)}>
            성장을 위한, 실력 분석
          </Box>
          <Box fontSize="16px" fontWeight={useColorModeValue(500, 200)}>
            푼 문제를 바탕으로 실력을 분석하여 보여드립니다.
            <br />
            나의 객관적인 지표로 알고리즘 풀이 실력을 점검해보세요.
          </Box>
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
          <Sidebar first="알고리즘 실력 분석" second="티어 로드맵" third="라이벌 분석" />
          <TabPanels ml="4vw" bg="" mb="10vh">
            <TabPanel>
              <DataChartPage />
            </TabPanel>
            <TabPanel>
              <DataRoadPage />
            </TabPanel>
            <TabPanel>
              <DataRivalPage />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
