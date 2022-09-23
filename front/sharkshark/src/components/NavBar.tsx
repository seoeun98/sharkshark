import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Image,
  Stack,
  Center,
  VStack,
  TabList,
  Tabs,
  Tab,
  TabIndicator,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link, useLocation } from 'react-router-dom';

const menu = [
  { url: 'recommend/quiz', text: '문제 추천' },
  { url: 'recommend/user', text: '라이벌 추천' },
  { url: 'codingtest', text: '모의 테스트' },
  { url: 'blogging', text: '블로그 포스팅' },
  { url: 'data/chart', text: '실력 분석' },
];

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Link to="/">
              <Box w={152} marginRight={24}>
                <Image
                  src={useColorModeValue('assets/logo/logo_dark.png', 'assets/logo/logo_light.png')}
                />
              </Box>
            </Link>
            <Tabs variant="unstyled" isManual>
              <TabList as="nav" display={{ base: 'none', md: 'flex' }}>
                {menu.map(item => (
                  <Link to={item.url}>
                    <Tab
                      w={120}
                      h={16}
                      fontSize="16px"
                      fontWeight="400"
                      _hover={{
                        fontWeight: '600',
                        bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)',
                        bgClip: 'text',
                      }}
                      _selected={{
                        fontWeight: '600',
                      }}
                    >
                      {item.text}
                    </Tab>
                  </Link>
                ))}
              </TabList>
              <TabIndicator
                mt="-4px"
                zIndex={-1}
                height="4px"
                bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
              />
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
