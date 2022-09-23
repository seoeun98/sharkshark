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
      <Box px={136}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            borderRadius={8}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center">
            <Box>Logo</Box>
            <HStack as="nav" spacing={0} display={{ base: 'none', md: 'flex' }}>
              {menu.map(item => (
                <VStack spacing={0} justify="center">
                  <Center
                    fontWeight="400"
                    alignItems="center"
                    w={108}
                    h={16}
                    _hover={{
                      fontWeight: '600',
                      textDecoration: 'none',
                      bgColor: 'neutral.25',
                    }}
                    _selected={{ fontWeight: '600', textDecoration: 'none' }}
                  >
                    <Link to={item.url}>{item.text}</Link>
                  </Center>
                </VStack>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems="center">
            <ColorModeSwitcher />
            <Button variant="primary" size="cxs" marginLeft={4}>
              <Link to="login">로그인</Link>
            </Button>
            <Button variant="secondary" size="cxs" marginLeft={4}>
              <Link to="register">회원가입</Link>
            </Button>
            {/* 계정 관리 등등 */}
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

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {/* {Links.map(({ name, path }) => (
                // <NavLink key={path} path={path}>
                //   {name}
                // </NavLink>
              ))} */}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </div>
  );
};
