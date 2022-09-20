import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkProfileMsgAPI, getProfileMsgAPI, registerAPI } from '../api/default';

export const UserRegisterPage = () => {
  const [id, setId] = useState('');
  const [idAlert, setIdAlert] = useState(
    "아이디 연동을 위해 '연동'을 눌러 백준 연동을 진행해주세요.",
  );

  const [profileMsg, setProfileMsg] = useState('');
  const [pMsgStatus, setPMsgStatus] = useState(true);

  const [password, setPassword] = useState('');
  const [checkMsg, setCheckMsg] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(profileMsg);

  const checkId = async () => {
    if (id === '') {
      setIdAlert('아이디를 입력해주세요.');
      return;
    }
    const msg = await getProfileMsgAPI(id);
    if (msg == '-1') {
      setIdAlert('없는 백준 아이디입니다. 아이디를 정확하게 입력해주세요');
      return;
    }
    setPMsgStatus(true);
    setProfileMsg(msg);
    onOpen();
  };

  const checkProfileMsg = async () => {
    const msg = await checkProfileMsgAPI(id);

    if (msg === 'OK') {
      setPMsgStatus(true);
      setCheckMsg(msg);
    } else {
      setPMsgStatus(false);
    }
  };

  return (
    <Container>
      <Box>UserRegisterPage</Box>
      <Box my="100px">
        {/* id */}
        <Box> 아이디 </Box>
        <Box fontSize="12px"> 백준 연동을 위해 백준 아이디로 입력해주세요. </Box>
        <Flex>
          <Input type="text" placeholder="백준 아이디 입력" onChange={e => setId(e.target.value)} />
          <Button onClick={checkId}>연동</Button>
        </Flex>
        <Box fontSize="12px"> {idAlert} </Box>
        <br />

        {/* pw */}
        <Box> 비밀번호 </Box>
        <Input
          isDisabled={checkMsg ? false : true}
          type="password"
          placeholder="비밀번호 입력"
          onChange={e => setPassword(e.target.value)}
        />

        {/* pw check */}
        <Box> 비밀번호 확인 </Box>
        <Input
          isDisabled={checkMsg ? false : true}
          type="password"
          placeholder="비밀번호 확인"
          onChange={e => setPwCheck(e.target.value)}
        />
        <Box fontSize="12px">
          {' '}
          {password && pwCheck === password
            ? '비밀번호 확인.'
            : '비밀번호가 일치하지 않습니다.'}{' '}
        </Box>
        <br />

        <Button onClick={() => registerAPI(id, password)}>회원가입</Button>
      </Box>
      <Link to="/home">홈으로 돌아가기</Link>

      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody textAlign="center" margin="10px">
            <Box fontSize="20px">Logo</Box>
            <Box>
              {id} 님, {pMsgStatus ? '반가워요!' : '연동을 다시 진행해주세요 :('}
            </Box>

            {pMsgStatus ? (
              <Box fontSize="14px" my="10px">
                BAEKJOON 사이트에 접속해,
                <br /> 상태 메시지 끝에 다음 문자를 입력한 후
                <br /> 확인 버튼을 눌러주세요.
              </Box>
            ) : (
              <Box fontSize="14px" my="10px">
                상태 메시지 문자가 일치하지 않습니다.
                <br /> BAEKJOON 사이트에 접속해,
                <br /> 상태 메시지 끝에 다음 문자를 입력하고 확인 버튼을 눌러주세요.
              </Box>
            )}

            <Box fontSize="12px">
              설정 방법 : 백준 사이트 접속 &gt; 로그인 &gt; 상단바 설정 &gt; 정보 수정 &#45; 상태
              메시지
            </Box>

            <Box>
              {profileMsg} <Button onClick={onCopy}>{hasCopied ? '복사됨!' : '복사'}</Button>
            </Box>

            <Button onClick={checkProfileMsg}>확인</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};
