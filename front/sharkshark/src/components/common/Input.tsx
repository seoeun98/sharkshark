// Chakra imports
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const CustomInput = (props: {
  [x: string]: any;
  id: string;
  label: any;
  extra: any;
  placeholder: any;
  type: any;
  mb: any;
  errorMessage: any;
}) => {
  const { id, label, extra, placeholder, type, mb, errorMessage } = props;
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <FormControl>
      <Flex w="400px" direction="column">
        <FormLabel
          ms="4px"
          fontSize="14px"
          mb="8px"
          htmlFor={id}
          fontWeight="700"
          _hover={{ cursor: 'pointer' }}
        >
          {label}
          <Box fontSize="12px" fontWeight="400">
            {extra}
          </Box>
        </FormLabel>

        {id === 'password' ? (
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CFaLock fontSize="14px" color="neutral.200" />}
            />
            <Input type={showPassword ? 'text' : 'password'} id={id} placeholder={placeholder} />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowClick} variant="secondary">
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        ) : (
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CFaUserAlt fontSize="14px" color="neutral.200" />}
            />
            <Input type={type} id={id} placeholder={placeholder} />
          </InputGroup>
        )}
        {errorMessage !== '' ? (
          <FormErrorMessage fontSize="12px" fontWeight="400" color="warning.50">
            {errorMessage}
          </FormErrorMessage>
        ) : (
          <FormErrorMessage />
        )}
        {id === 'password' ? (
          <FormHelperText textAlign="right">
            <Text
              fontWeight="500"
              fontSize="12px"
              _hover={{
                color: 'primary.cyan0',
              }}
            >
              <Link to="">비밀번호 찾기</Link>
            </Text>
          </FormHelperText>
        ) : (
          <FormHelperText />
        )}
      </Flex>
    </FormControl>
  );
};
