import {
  Box,
  Center,
  useColorModeValue,
  VStack,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Sidebar } from '../components/common/Sidebar';
import { BlogSetting } from '../components/layouts/blogging/BlogSetting';
import { setAuthToken } from '../reducers/ghAPIReducer';
export const BloggingPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const authToken = useSelector((state: any) => state.ghAPIReducer.authToken);
  const repo = useSelector((state: any) => state.ghAPIReducer.repo);

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');

    if (authorizationCode) {
      setTabIndex(1);
    } else {
      console.log('==BloggingPage==');
      console.log(authToken);
      console.log(repo);
      //token과 repo 설정이 되어있으면 tab0, 아니면 tab1
      if (authToken && repo) setTabIndex(0);
      else setTabIndex(1);
    }
  }, []);

  return (
    <Box>
      {/* image & slogan */}
      <Center
        bgImage={useColorModeValue(
          'url(/assets/header/github_header_light.png)',
          'url(/assets/header/github_header.png)',
        )}
        bgSize="cover"
        bgPos="center"
        h="35vh"
        textAlign="center"
      >
        <VStack spacing="1vh">
          <Box fontSize="32px" pt="4vh" fontWeight={useColorModeValue(800, 700)}>
            깃허브 블로그 포스팅
          </Box>
          <Box fontSize="16px" fontWeight={useColorModeValue(500, 200)}>
            문제 풀이 블로그를 작성하기 번거롭지 않으셨나요?
            <br />
            깃허브 블로그에 내가 푼 문제에 한해 자동 포스팅을 해드립니다.
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
          <Sidebar first="블로그 포스팅" second="블로그 계정 설정" third="" />

          <TabPanels ml="5vw">
            <TabPanel>..</TabPanel>
            <TabPanel>
              <BlogSetting />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};
