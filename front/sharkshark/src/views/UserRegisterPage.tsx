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
  ModalOverlay,
  useClipboard,
  useDisclosure,
  Text,
  VStack,
  Image,
  Center,
  FormLabel,
  InputLeftElement,
  InputGroup,
  chakra,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkProfileMsgAPI, getProfileMsgAPI, registerAPI } from '../api/default';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { CustomInput } from '../components/common/Input';
import { FaUserAlt, FaLock } from 'react-icons/fa';

export const UserRegisterPage = () => {
  const image = '/assets/logo/symbol.png';
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);

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
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

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
      onClose();
    } else {
      setPMsgStatus(false);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        pos="fixed"
        top={4}
        left={36}
        fontSize="14px"
        fontWeight="400"
        color="neutral.100"
        _hover={{
          fontWeight: '700',
          bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)',
          bgClip: 'text',
        }}
      >
        <Link to="/home"> &#60;&nbsp;&nbsp;홈으로 돌아가기</Link>
      </Text>

      <ColorModeSwitcher pos="fixed" top={3} right={36} />

      <VStack flexDir="column" spacing={12} justifyContent="center" alignItems="center">
        <VStack spacing="4px">
          <Image width="32px" src={image} />
          <Box fontSize="30px" fontWeight="800">
            회원가입
          </Box>
        </VStack>
        <VStack spacing={4}>
          {/* id */}
          <Flex w="400px" direction="column">
            <FormLabel
              ms="4px"
              fontSize="14px"
              mb="8px"
              htmlFor="id"
              fontWeight="700"
              _hover={{ cursor: 'pointer' }}
            >
              아이디
              <Box fontSize="12px" fontWeight="400">
                백준 연동을 위해 백준 아이디로 입력해주세요.
              </Box>
            </FormLabel>
            <Flex marginBottom="8px">
              <InputGroup w="350px">
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt fontSize="14px" color="neutral.200" />}
                />
                <Input
                  type="text"
                  id={id}
                  placeholder="백준 아이디 입력"
                  onChange={e => setId(e.target.value)}
                  marginRight="12px"
                />
              </InputGroup>
              <Button size="cxs" variant="secondary" onClick={checkId}>
                연동
              </Button>
            </Flex>
            <Box fontSize="12px" fontWeight="400" color="warning.50">
              {' '}
              {idAlert}{' '}
            </Box>
          </Flex>

          {/* pw */}
          <Flex w="400px" direction="column">
            <FormLabel
              ms="4px"
              fontSize="14px"
              mb="8px"
              htmlFor="id"
              fontWeight="700"
              _hover={{ cursor: 'pointer' }}
            >
              비밀번호
            </FormLabel>
            <Flex marginBottom="8px">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaLock fontSize="14px" color="neutral.200" />}
                />
                <Input
                  isDisabled={checkMsg ? false : true}
                  type={showPassword ? 'text' : 'password'}
                  id={id}
                  placeholder="비밀번호 입력"
                  onChange={e => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    isDisabled={checkMsg ? false : true}
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowClick}
                    variant="secondary"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
            {/* 에러 메세지 */}
            <Box fontSize="12px" fontWeight="400" color="warning.50" />
          </Flex>

          {/* pw check */}
          <Flex w="400px" direction="column">
            <FormLabel
              ms="4px"
              fontSize="14px"
              mb="8px"
              htmlFor="id"
              fontWeight="700"
              _hover={{ cursor: 'pointer' }}
            >
              비밀번호 확인
            </FormLabel>
            <Flex marginBottom="8px">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaLock fontSize="14px" color="neutral.200" />}
                />
                <Input
                  isDisabled={checkMsg ? false : true}
                  type={showPassword ? 'text' : 'password'}
                  id={id}
                  placeholder="비밀번호 재입력"
                  onChange={e => setPwCheck(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    isDisabled={checkMsg ? false : true}
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowClick}
                    variant="secondary"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
            {/* 에러 메세지 */}
            <Box fontSize="12px" fontWeight="400" color="warning.50">
              {password && pwCheck === password
                ? '비밀번호가 확인되었습니다.'
                : '비밀번호가 일치하지 않습니다.'}
            </Box>
          </Flex>
        </VStack>

        <Center>
          <Button
            isDisabled={checkMsg ? false : true}
            variant="primary"
            size="cxl"
            type="submit"
            onClick={() => registerAPI(id, password)}
          >
            회원가입
          </Button>
        </Center>
        <Text display="flex" fontSize="12px" fontWeight="400">
          이미 계정이 있으신가요?&nbsp;&nbsp;
          <Text
            as="u"
            fontWeight="600"
            _hover={{
              color: 'primary.cyan0',
            }}
          >
            <Link to="/login">로그인</Link>
          </Text>
        </Text>
      </VStack>

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
    </Flex>
  );
};
