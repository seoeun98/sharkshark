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
import { useDispatch } from 'react-redux';
import { getUserID } from '../api/common';
import CodingTestAnalysis from '../components/layouts/codingTest/CodingTestAnalysis';
import { CodingTestDefault } from '../components/layouts/codingTest/CodingTestDefault';
import CodingTestMain from '../components/layouts/codingTest/CodingTestMain';

export const CodeTestPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Box>
      {/* image & slogan */}
      <Center
        bgImage={useColorModeValue(
          'url(/assets/header/CT_header_light.png)',
          'url(/assets/header/CT_header.png)',
        )}
        bgSize="cover"
        bgPos="center"
        h="35vh"
        textAlign="center"
      >
        <VStack spacing="1vh">
          <Box fontSize="32px" pt="4vh" fontWeight={useColorModeValue(800, 700)}>
            나만의 실전 연습, 모의 코딩 테스트
          </Box>
          <Box fontSize="16px" fontWeight={useColorModeValue(500, 200)}>
            {getUserID()} 님의 실력을 분석해 모의 코딩 테스트를 준비했습니다.
            <br />
            실제 코딩 테스트처럼 연습해보고, 실력을 점검해보세요!
          </Box>
        </VStack>
      </Center>
      {/* main body */}
      <Box ml="24vw" my="6vh">
        <Tabs index={tabIndex} onChange={handleTabsChange}>
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
