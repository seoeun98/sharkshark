import { Box, Center, Flex, Spacer } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const menu = [
    { url: 'recommend/quiz', text: '문제 추천' },
    { url: 'recommend/user', text: '라이벌 추천' },
    { url: 'codingtest', text: '모의 테스트' },
    { url: 'blogging', text: '블로그 포스팅' },
    { url: 'data/chart', text: '실력 분석' },
  ];

  const pathname = useLocation().pathname;

  return (
    <Box h="80px" bg="" pos="fixed" zIndex="popover">
      <Flex>
        {/* logo */}
        <Center h="80px" mx="20px">
          <Link to="home">
            <Box fontSize="24px"> Logo </Box>
          </Link>
        </Center>

        {/* menu */}
        {menu.map(item => (
          <Center h="80px" mx="10px">
            <Link to={item.url}>{item.text}</Link>
          </Center>
        ))}
        <Spacer />

        {/* buttons */}
        <Center h="80px" mx="20px">
          {pathname === '/home' ? (
            <Flex>
              <Link to="login">Login</Link>
              <Box w="10px" />
              <Link to="register">Register</Link>
            </Flex>
          ) : (
            <Link to="setting">Setting</Link>
          )}
        </Center>
      </Flex>
    </Box>
  );
};
