import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Image,
  TabList,
  Tabs,
  Tab,
  useColorModeValue,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { ColorText } from '../common/ColorText';
import { getUserID, logout } from '../../api/common';
import { SetStateAction, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCompStatus } from '../../reducers/CTReducer';

const menu = [
  { url: '/', text: 'HOME' },
  { url: 'recommend/quiz', text: '문제 추천' },
  { url: 'recommend/user', text: '라이벌 추천' },
  { url: 'codingtest', text: '모의 테스트' },
  { url: 'blogging', text: '블로그 포스팅' },
  { url: 'data/chart', text: '실력 분석' },
];

export const NavBar = (isLoggedIn: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fontWeight = useColorModeValue(700, 500);
  const fontColor = useColorModeValue('black', 'white');
  const fontColorBasic = useColorModeValue('neutral.300', 'neutral.50');
  const image = useColorModeValue('/assets/logo/logo_dark.png', '/assets/logo/logo_light.png');
  const colorChange = useColorModeValue('nuetral.25', 'neutral.800');

  // eslint-disable-next-line react/destructuring-assignment
  const [isLogin, setLoginin] = useState(isLoggedIn.status);
  const [tabIndex, setTabIndex] = useState(0);
  const compStatus = useSelector((state: any) => state.CTReducer.compStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = getUserID();
    if (userId !== '') {
      setLoginin(true);
    } else {
      setLoginin(false);
    }
  }, []);

  function Dologout() {
    logout();
    setLoginin(false);
  }
  const handleTabsChange = (index: SetStateAction<number>) => {
    setTabIndex(index);
    if (index === 3) {
      dispatch(setCompStatus(0));
    }
  };

  return (
    <div>
      <Box
        px="10vw"
        bg={useColorModeValue('rgba(255, 255, 255, 0.3)', 'rgba(0, 0, 0, 0.3)')}
        pos="fixed"
        top={0}
        w="100%"
        zIndex="popover"
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {isLogin ? (
            <IconButton
              size="md"
              borderRadius={32}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Open Menu"
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
          ) : null}
          <HStack alignItems="center">
            <Tabs
              variant="unstyled"
              isLazy={true}
              isManual
              index={tabIndex}
              onChange={handleTabsChange}
            >
              <TabList as="nav" display={{ base: 'none', md: 'flex' }}>
                {isLogin ? (
                  <>
                    {' '}
                    {menu.map((tab, index) =>
                      index === 0 ? (
                        <Center w={172} marginRight="4vw">
                          <Link to="/">
                            <Tab key={index}>
                              <Image src={image} />
                            </Tab>
                          </Link>
                        </Center>
                      ) : (
                        <Center>
                          <Link to={tab.url}>
                            <Tab
                              w={120}
                              h={16}
                              key={index}
                              fontSize="16px"
                              color={fontColorBasic}
                              // eslint-disable-next-line react-hooks/rules-of-hooks
                              fontWeight={useColorModeValue(500, 200)}
                              _hover={{
                                fontWeight: '700',
                                bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)',
                                bgClip: 'text',
                              }}
                              _selected={{
                                color: fontColor,
                                fontWeight: fontWeight,
                              }}
                            >
                              {tab.text}
                            </Tab>
                          </Link>
                        </Center>
                      ),
                    )}
                  </>
                ) : (
                  <>
                    {menu.map((tab, index) =>
                      index === 0 ? (
                        <Center w={172} marginRight="4vw">
                          <Link to="/">
                            <Tab key={index}>
                              <Image src={image} />
                            </Tab>
                          </Link>
                        </Center>
                      ) : (
                        <Center />
                      ),
                    )}
                  </>
                )}
              </TabList>
              {/* <TabIndicator mt="-4px" zIndex={-1} height="4px" bgGradient={isClicked} /> */}
            </Tabs>
          </HStack>
          <Flex alignItems="center">
            <ColorModeSwitcher />
            {isLogin ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  marginLeft={6}
                  transition="all 0.2s"
                >
                  <HStack>
                    <Image src="/assets/account/Avatar.svg" boxSize="32px" mr={1} />
                    <HStack fontSize="18px" fontWeight="700">
                      <ColorText children={getUserID()} />
                      <Text fontSize="16px" fontWeight="600">
                        님
                      </Text>
                    </HStack>
                  </HStack>
                </MenuButton>

                <MenuList marginTop={3} fontSize="16px" bgColor={colorChange} borderRadius={10}>
                  <Center
                    p={1.5}
                    _hover={{
                      fontWeight: '600',
                      bgGradient: 'linear(to-r, primary.purple0, primary.cyan50)',
                      bgClip: 'text',
                    }}
                  >
                    공지사항
                  </Center>

                  <Center
                    p={1.5}
                    _hover={{
                      bgGradient: 'linear(to-r, primary.purple0, primary.cyan50)',
                      bgClip: 'text',
                    }}
                  >
                    <Link to="/password-modify">비밀번호 변경</Link>
                  </Center>

                  <MenuDivider />

                  <Center
                    p={1.5}
                    color="warning.0"
                    onClick={() => Dologout()}
                    _hover={{
                      color: 'warning.50',
                    }}
                  >
                    로그아웃
                  </Center>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button variant="primary" size="cxs" marginLeft={6}>
                  <Link to="login">로그인</Link>
                </Button>
                <Button variant="secondary" size="cxs" marginLeft={4}>
                  <Link to="register">회원가입</Link>
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};
