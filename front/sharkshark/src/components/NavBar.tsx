import { ReactNode } from 'react';
import { Box, Center, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  const menu = [
    { url: 'recommend/quiz', text: '문제 추천' },
    { url: 'recommend/user', text: '라이벌 추천' },
    { url: 'codingtest', text: '모의 테스트' },
    { url: 'blogging', text: '블로그 포스팅' },
    { url: 'data/chart', text: '실력 분석' },
  ];

  return (
    <Box h="80px" bg="gray.50">
      <Flex>
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
      </Flex>
    </Box>
  );
};
