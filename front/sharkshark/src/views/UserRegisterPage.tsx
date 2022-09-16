import { Box, Button, Container, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkProfileMsgAPI, getProfileMsgAPI, registerAPI } from '../api/default';

export const UserRegisterPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const [checkMsg, setCheckMsg] = useState('');
  return (
    <Container>
      <Box>UserRegisterPage</Box>
      <Box>
        <Flex>
          <Input type="text" placeholder="id" value={id} onChange={e => setId(e.target.value)} />
          <Button onClick={() => getProfileMsgAPI(id).then(msg => setProfileMsg(msg))}>확인</Button>
        </Flex>
        {profileMsg ? (
          <Flex>
            <Box lineHeight="40px" w="full">
              다음으로 상태 메시지 설정 : {profileMsg}
            </Box>
            <Button onClick={() => checkProfileMsgAPI(id).then(msg => setCheckMsg(msg))}>
              확인
            </Button>
          </Flex>
        ) : (
          <Box lineHeight="40px" w="full">
            아이디를 입력하고 '확인' 을 클릭하세요.
          </Box>
        )}
        <Box lineHeight="40px" w="full">
          연동 상태 : {checkMsg}
        </Box>
        <Input
          isDisabled={checkMsg ? false : true}
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button onClick={() => registerAPI(id, password)}>회원가입</Button>
      </Box>
      <Link to="/home">홈으로 돌아가기</Link>
    </Container>
  );
};
