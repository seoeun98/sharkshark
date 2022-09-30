import {
  Box,
  Button,
  Flex,
  Image,
  VStack,
  Center,
  Text,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { loginAPI } from '../api/default';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { CustomInput } from '../components/common/Input';

export const UserLoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const image = '/assets/logo/symbol.png';

  const [errorMessageForId, seterrorMessageForId] = useState('');
  const [errorMessageForpassword, seterrorMessageForpassword] = useState('');

  async function loginSubmit(id: string, password: string) {
    let errmessage = loginAPI(id, password);
    seterrorMessageForId('');
    seterrorMessageForpassword('');

    if ((await errmessage) === '가입된 아이디가 없습니다') {
      seterrorMessageForId('가입된 아이디가 없습니다.');
    } else if ((await errmessage) === '패스워드가 일치하지 않습니다') {
      seterrorMessageForpassword('비밀번호가 일치하지 않습니다.');
    }
  }

  return (
    <>
      <Box
        bgImage="url(/assets/account/background/account_top.png)"
        w="40vw"
        h="100%"
        pos="fixed"
        top={0}
        right={0}
        bgSize="contain"
        bgRepeat="no-repeat"
      />
      <Box
        bgImage="url(/assets/account/background/account_bottom.png)"
        w="50vw"
        h="70vh"
        pos="fixed"
        left={0}
        bottom="0px"
        bgSize="contain"
        bgRepeat="no-repeat"
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

        <VStack flexDir="column" spacing={16} justifyContent="center" alignItems="center">
          <VStack spacing="8px">
            <Image width="40px" src={image} />
            <Box fontSize="30px" fontWeight="800">
              로그인
            </Box>
          </VStack>
          <VStack spacing={4}>
            <CustomInput
              id="userId"
              label="아이디"
              extra="백준 연동을 위해 백준 아이디로 입력해주세요."
              type="text"
              mb="20px"
              errorMessage={errorMessageForId}
              children_input={
                <Input
                  type="text"
                  placeholder="백준 아이디 입력"
                  value={id}
                  onChange={e => setId(e.target.value)}
                />
              }
              children_button=""
            />
            <CustomInput
              id="password"
              label="비밀번호"
              extra=""
              type=""
              mb="20px"
              errorMessage={errorMessageForpassword}
              value={id}
              children_input={
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              }
              children_button={
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick} variant="secondary">
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              }
            />
          </VStack>
          <Center>
            <Button
              variant="primary"
              size="cxl"
              type="submit"
              onClick={() => loginSubmit(id, password)}
            >
              로그인
            </Button>
          </Center>
          <Text display="flex" fontSize="12px" fontWeight="400">
            처음 오셨나요?&nbsp;&nbsp;
            <Text
              as="u"
              fontWeight="600"
              _hover={{
                color: 'primary.cyan0',
              }}
            >
              <Link to="/register">회원가입</Link>
            </Text>
          </Text>
        </VStack>
      </Flex>
    </>
  );
};
