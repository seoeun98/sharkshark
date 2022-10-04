import {
  Box,
  Center,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserID } from '../api/common';
import CodingTestAnalysis from '../components/layouts/codingTest/CodingTestAnalysis';
import { CodingTestDefault } from '../components/layouts/codingTest/CodingTestDefault';
import CodingTestMain from '../components/layouts/codingTest/CodingTestMain';

export const CodeTestPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    CTPList([]);
  };
  const compStatus = useSelector((state: any) => state.CTReducer.compStatus);
  const CTPList = useSelector((state: any) => state.CTReducer.CTPList);

  if (compStatus === 1 && tabIndex === 0) {
    setTabIndex(1);
  } else if (compStatus === 2 && tabIndex === 1) {
    setTabIndex(2);
  }

  const bgImage = useColorModeValue(
    'url(/assets/header/CT_header_light.png)',
    'url(/assets/header/CT_header.png)',
  );
  const mainFW = useColorModeValue(800, 700);
  const subFW = useColorModeValue(500, 200);

  return (
    <Box>
      {tabIndex === 1 ? (
        <Center bgImage={bgImage} bgSize="cover" bgPos="center" h="35vh" textAlign="center">
          <VStack spacing="1vh">
            <Box fontSize="32px" pt="4vh" fontWeight={mainFW}>
              나만의 실전 연습, 모의 코딩 테스트
            </Box>
            <Box fontSize="16px" fontWeight={subFW}>
              {getUserID()} 님의 실력을 분석해 모의 코딩 테스트를 준비했습니다.
              <br />
              실제 코딩 테스트처럼 연습해보고, 실력을 점검해보세요!
            </Box>
          </VStack>
        </Center>
      ) : (
        <Box h="8vh" />
      )}

      {/* main body */}
      <Box my="4vh">
        <Tabs index={tabIndex} onChange={handleTabsChange} isLazy={true}>
          <TabPanels>
            <TabPanel>
              <CodingTestDefault />
            </TabPanel>
            <TabPanel>
              <CodingTestMain />
            </TabPanel>
            <TabPanel>
              <CodingTestAnalysis />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
