import { Box, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerAPI } from '../api/default';

export const UserRegisterPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <Box>UserRegisterPage</Box>
      <Box w="300px">
        <Input type="text" placeholder="id" value={id} onChange={e => setId(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button onClick={() => registerAPI(id, password)}>회원가입</Button>
      </Box>
      <Link to="/home">홈으로 돌아가기</Link>
    </div>
  );
};
