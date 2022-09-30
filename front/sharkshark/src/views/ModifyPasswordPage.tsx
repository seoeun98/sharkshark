/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Flex,
  Input,
  Center,
  FormLabel,
  InputGroup,
  InputRightElement,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { modifyPasswordAPI } from '../api/default';
import { getUserID } from '../api/common';

export const ModifyPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  const titlefw = useColorModeValue(700, 500);

  return (
    <Box mt="20vh" ml="24vw" mb="10vh">
      <HStack justifyContent="space-between" mb="6vh">
        <HStack fontSize="24px" fontWeight={titlefw} marginBottom="2vh">
          <Box>비밀번호 변경</Box>
        </HStack>
      </HStack>

      <Box mb="8vh" ml="4vh">
        <Flex mb="4vh" alignItems="center">
          <FormLabel
            fontSize="16px"
            mb="8px"
            mr="52px"
            htmlFor="password"
            fontWeight="500"
            _hover={{ cursor: 'pointer' }}
          >
            새 비밀번호
          </FormLabel>
          <Flex marginBottom="8px" w="20vw">
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="비밀번호 입력"
                onChange={e => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick} variant="secondary">
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Flex>

        {/* pw check */}
        <Flex alignItems="center">
          <FormLabel
            fontSize="16px"
            mb="8px"
            mr="24px"
            htmlFor="passwordCheck"
            fontWeight="500"
            _hover={{ cursor: 'pointer' }}
          >
            새 비밀번호 확인
          </FormLabel>
          <Box>
            <Flex marginBottom="8px" w="20vw">
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="passwordCheck"
                  placeholder="비밀번호 재입력"
                  onChange={e => setPwCheck(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick} variant="secondary">
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
          </Box>
        </Flex>
      </Box>

      <Center pos="fixed" bottom="30vh" right="52vh">
        <Button
          isDisabled={pwCheck && password && password && pwCheck === password ? false : true}
          variant="primary"
          size="cxl"
          type="submit"
          onClick={() => modifyPasswordAPI(getUserID(), password)}
        >
          비밀번호 재설정
        </Button>
      </Center>
    </Box>
  );
};
