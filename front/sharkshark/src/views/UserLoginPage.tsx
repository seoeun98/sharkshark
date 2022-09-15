import { Box, Button, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const UserLoginPage = () => {
  return (
    <div>
      <Box>UserLoginPage</Box>

      <Box w="300px">
        <Input type="text" placeholder="id" />
        <Input type="password" placeholder="password" />
        <Button>로그인</Button>
      </Box>
      <Link to="/home">홈으로 돌아가기</Link>
    </div>
  );
};
