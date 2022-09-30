import {
  Box,
  Button,
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
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkProfileMsgAPI, getProfileMsgAPI, modifyPasswordAPI } from '../api/default';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { ColorText } from '../components/common/ColorText';

export const ResetPasswordPage = () => {
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
  const modifyUser = 'https://www.acmicpc.net/modify';
  let connectButtonMsg = '인증';

  const checkId = async () => {
    if (id === '') {
      setIdAlert('아이디를 입력해주세요.');
      return;
    }
    const msg = await getProfileMsgAPI(id);
    if (msg === '-1') {
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
      setIdAlert('인증이 완료되었습니다.');
      connectButtonMsg = '재설정';
      onClose();
    } else {
      setPMsgStatus(false);
    }
  };

  const sharkjoonImage = useColorModeValue(
    '/assets/logo/sharkjoon_light_logo.png',
    '/assets/logo/sharkjoon_logo.png',
  );
  const modalBg = useColorModeValue('neutral.0', 'neutral.500');

  return (
    <>
      <Box
        bgImage="url(/assets/account/background/account_signup_top.png)"
        w="40vw"
        h="100%"
        pos="fixed"
        top={0}
        left={0}
        bgSize="contain"
        bgRepeat="no-repeat"
      />
      <Box
        bgImage="url(/assets/account/background/account_signup_bottom.png)"
        bgSize="contain"
        bgRepeat="no-repeat"
        w="40vw"
        h="100%"
        pos="fixed"
        right={0}
        top="40vh"
      />

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
              비밀번호 재설정
            </Box>
          </VStack>
          <VStack spacing={4}>
            {/* id */}
            <Flex w="400px" direction="column">
              <FormLabel
                ms="4px"
                fontSize="14px"
                mb="8px"
                htmlFor="userId"
                fontWeight="700"
                _hover={{ cursor: 'pointer' }}
              >
                아이디
                <Box fontSize="12px" fontWeight="400">
                  회원 확인을 위해 백준 아이디를 입력하고 인증을 진행해주세요.
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
                    id="userId"
                    marginRight="12px"
                    placeholder="백준 아이디 입력"
                    onChange={e => setId(e.target.value)}
                  />
                </InputGroup>
                <Button size="cxs" variant="secondary" onClick={checkId}>
                  {connectButtonMsg}
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
                htmlFor="password"
                fontWeight="700"
                _hover={{ cursor: 'pointer' }}
              >
                새 비밀번호 입력
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
                    id="password"
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
                htmlFor="passwordCheck"
                fontWeight="700"
                _hover={{ cursor: 'pointer' }}
              >
                새 비밀번호 확인
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
                    id="passwordCheck"
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
              onClick={() => modifyPasswordAPI(id, password)}
            >
              비밀번호 재설정
            </Button>
          </Center>
          <Text fontSize="12px">
            <Text
              as="u"
              fontWeight="600"
              _hover={{
                color: 'primary.cyan0',
              }}
            >
              <Link to="/login">로그인으로 돌아가기</Link>
            </Text>
          </Text>
        </VStack>

        {/* modal */}
        <Modal size="3xl" isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(45deg)" />
          <ModalContent bg={modalBg}>
            <ModalCloseButton />
            <ModalBody textAlign="center" margin="32px" p={12}>
              <Center>
                <Image src={sharkjoonImage} w="350px" mb="32px" />
              </Center>
              <Box fontSize="16px" fontWeight="700">
                <Badge p={1} fontSize="16px" borderRadius="4px" color="white" variant="subtle">
                  <ColorText>{id}</ColorText>
                </Badge>
                {'  '}
                님, {'  '}
                {pMsgStatus ? '반가워요!' : '인증을 다시 진행해주세요 :('}
              </Box>

              {pMsgStatus ? (
                <Box fontSize="14px" my="10px" fontWeight="500">
                  BAEKJOON 사이트에 접속해,
                  <br /> 상태 메시지 끝에 다음 문자를 입력한 후
                  <br /> 확인 버튼을 눌러주세요.
                </Box>
              ) : (
                <Box fontSize="14px" my="10px" fontWeight="500">
                  상태 메시지 문자가 일치하지 않습니다.
                  <br /> BAEKJOON 사이트에 접속해,
                  <br /> 상태 메시지 끝에 다음 문자를 입력하고 확인 버튼을 눌러주세요.
                </Box>
              )}

              <Box fontSize="12px" my="12px" fontWeight="300">
                설정 방법 : 백준 사이트 접속 &gt; 로그인 &gt; 상단바 설정 &gt; 정보 수정 &#45; 상태
                메시지 &nbsp; &nbsp;
                <Button
                  variant="secondary"
                  borderRadius="4px"
                  size="xs"
                  onClick={() => window.open(modifyUser, '_blank')}
                >
                  바로 가기
                </Button>
              </Box>

              <Box fontWeight="700" fontSize="18px" mb="32px">
                {profileMsg}{' '}
                <Button mx={2} variant="secondary" size="xs" onClick={onCopy}>
                  {hasCopied ? '복사됨!' : '복사'}
                </Button>
              </Box>

              <Button size="cmd" onClick={checkProfileMsg}>
                확인
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};
