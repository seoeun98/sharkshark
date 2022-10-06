import { HStack, Box, Flex, Center, VStack, Text, useColorModeValue } from '@chakra-ui/react';
import { BasicInfoLayout } from './BasicInfoLayout';
import { ColorText } from '../../../common/ColorText';
import { getRivalInfoAPI } from '../../../../api/auth/rival';
import { useEffect } from 'react';
import { getUserID } from '../../../../api/common';
import { setUserInfo } from '../../../../reducers/rivalAPIReducer';
import { useDispatch, useSelector } from 'react-redux';

export const UserBasicCard = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchuserInfo = async () => {
    dispatch(setUserInfo(await getRivalInfoAPI(getUserID())));
  };

  useEffect(() => {
    fetchuserInfo();
  }, []);

  const userInfo = useSelector((state: any) => state.rivalAPIReducer.userInfo);

  return (
    <Flex>
      <HStack
        bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
        maxW="380px"
        h="140px"
        borderRadius="10px"
      >
        <Flex ml="50px" mr="160px">
          <BasicInfoLayout
            typeName="user"
            level={userInfo.tier}
            userClass={userInfo.userClass}
            id={getUserID()}
          />
        </Flex>
      </HStack>
      <HStack ml="-100px" spacing={3}>
        {/* solved */}
        <Center
          boxShadow="base"
          bg={useColorModeValue('neutral.0', 'black')}
          borderRadius="10px"
          p="18px"
          w="10vw"
        >
          <VStack spacing={1}>
            <Text
              fontSize="16px"
              fontWeight="600"
              color={useColorModeValue('neutral.700', 'neutral.50')}
            >
              해결한 문제
            </Text>
            <Box fontSize="28px" fontWeight="800">
              <ColorText>{userInfo.solvedCount}</ColorText>
            </Box>
          </VStack>
        </Center>

        {/* average tries */}
        <Center
          boxShadow="base"
          bg={useColorModeValue('neutral.0', 'black')}
          borderRadius="10px"
          p="18px"
          w="10vw"
        >
          <VStack spacing={1}>
            <Text
              fontSize="16px"
              fontWeight="600"
              color={useColorModeValue('neutral.700', 'neutral.50')}
            >
              랭크
            </Text>
            <Box fontSize="28px" fontWeight="800">
              <ColorText>{userInfo.rank}</ColorText>
            </Box>
          </VStack>
        </Center>

        {/* average tries */}
        <Center
          boxShadow="base"
          bg={useColorModeValue('neutral.0', 'black')}
          borderRadius="10px"
          p="18px"
          w="10vw"
        >
          <VStack spacing={1}>
            <Text
              fontSize="16px"
              fontWeight="600"
              color={useColorModeValue('neutral.700', 'neutral.50')}
            >
              레이팅
            </Text>
            <Box fontSize="28px" fontWeight="800">
              <ColorText>{userInfo.rating}</ColorText>
            </Box>
          </VStack>
        </Center>
      </HStack>
    </Flex>
  );
};
