// Chakra imports
import {
  Box,
  chakra,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const CustomInput = (props: {
  [x: string]: any;
  id: string;
  label: any;
  extra: any;
  type: any;
  mb: any;
  errorMessage: any;
  children_input: any;
  children_button: any;
}) => {
  const { id, label, extra, errorMessage, children_input, children_button } = props;
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);

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
          <InputGroup marginBottom="8px">
            <InputLeftElement
              pointerEvents="none"
              children={<CFaLock fontSize="14px" color="neutral.200" />}
            />
            {children_input}
            {children_button}
          </InputGroup>
        ) : (
          <InputGroup marginBottom="8px">
            <InputLeftElement
              pointerEvents="none"
              children={<CFaUserAlt fontSize="14px" color="neutral.200" />}
            />
            {children_input}
          </InputGroup>
        )}
        {errorMessage !== '' ? (
          <Box fontSize="12px" fontWeight="500" color="warning.50">
            {errorMessage}
          </Box>
        ) : (
          <Box fontSize="12px" fontWeight="500" color="warning.50" />
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
              <Link to="/password-reset">비밀번호 찾기</Link>
            </Text>
          </FormHelperText>
        ) : (
          <FormHelperText />
        )}
      </Flex>
    </FormControl>
  );
};
