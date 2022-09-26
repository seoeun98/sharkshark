import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  Image,
  InputLeftElement,
  chakra,
  VStack,
  Center,
  FormLabel,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { loginAPI } from '../api/default';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import React from 'react';

export const UserLoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const image = '/assets/logo/symbol.png';
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

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

      <VStack flexDir="column" spacing={10} justifyContent="center" alignItems="center">
        <VStack spacing="4px">
          <Image width="32px" src={image} />
          <Box fontSize="30px" fontWeight="800">
            로그인
          </Box>
        </VStack>
        <VStack spacing={5}>
          <FormControl w="400px">
            <FormLabel ms="4px" fontSize="14px" fontWeight="700" mb="8px">
              아이디
              <Box fontSize="12px" fontWeight="400" mb="8px">
                백준 연동을 위해 백준 아이디로 입력해주세요.
              </Box>
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<CFaUserAlt fontSize="14px" color="neutral.200" />}
              />
              <Input
                isRequired={true}
                type="text"
                variant="outline"
                placeholder="백준 아이디 입력"
                value={id}
                onChange={e => setId(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel ms="4px" fontSize="14px" fontWeight="700" mb="8px">
              비밀번호
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="neutral.200"
                children={<CFaLock fontSize="14px" color="neutral.200" />}
              />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick} variant="secondary">
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText textAlign="right">
              <Text fontWeight="500" fontSize="10px">
                <Link to="">비밀번호 찾기</Link>
              </Text>
            </FormHelperText>
          </FormControl>
        </VStack>
        <Center>
          <Button variant="primary" size="cxl" type="submit" onClick={() => loginAPI(id, password)}>
            로그인
          </Button>
        </Center>
        <Box display="flex" fontSize="12px" fontWeight="400">
          처음 오셨나요?&nbsp;&nbsp;
          <Text
            fontWeight="800"
            bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
            bgClip="text"
          >
            <Link to="/register">회원가입</Link>
          </Text>
        </Box>
      </VStack>
    </Flex>
  );
};
