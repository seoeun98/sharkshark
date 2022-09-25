import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import React from 'react';

const menu = [
  { url: '/', text: 'HOME' },
  { url: 'recommend/quiz', text: '문제 추천' },
  { url: 'recommend/user', text: '라이벌 추천' },
  { url: 'codingtest', text: '모의 테스트' },
  { url: 'blogging', text: '블로그 포스팅' },
  { url: 'data/chart', text: '실력 분석' },
];

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fontWeight = useColorModeValue(700, 500);
  const fontColor = useColorModeValue('black', 'white');
  const fontColorBasic = useColorModeValue('neutral.300', 'neutral.50');
  const image = useColorModeValue('/assets/logo/logo_dark.png', '/assets/logo/logo_light.png');

  return (
    <div>
      <Box px="10vw" bg="" pos="fixed" w="100%" zIndex="popover">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            borderRadius={32}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack alignItems="center">
            <Tabs variant="unstyled" isLazy={true} isManual>
              <TabList as="nav" display={{ base: 'none', md: 'flex' }}>
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
              </TabList>
              {/* <TabIndicator mt="-4px" zIndex={-1} height="4px" bgGradient={isClicked} /> */}
            </Tabs>
          </HStack>

          <Flex alignItems="center">
            <ColorModeSwitcher />
            <Button variant="primary" size="cxs" marginLeft={6}>
              <Link to="login">로그인</Link>
            </Button>
            <Button variant="secondary" size="cxs" marginLeft={4}>
              <Link to="register">회원가입</Link>
            </Button>
            {/* 계정 관리 등 */}
            {/* <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
                <Avatar
                  size="sm"
                  src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                />
              </MenuButton>
              <MenuList marginTop={3}>
                <MenuItem>계정 관리</MenuItem>
                <MenuItem>계정 관리</MenuItem>
                <MenuDivider />
                <MenuItem>계정 관리</MenuItem>
              </MenuList>
            </Menu> */}
          </Flex>
        </Flex>

        {/* 모바일 버전 */}
        {/* {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4} />
          </Box>
        ) : null} */}
      </Box>
    </div>
  );
};
