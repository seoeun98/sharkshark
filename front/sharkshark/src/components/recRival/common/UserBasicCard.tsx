import { HStack, Box, Flex, Center, VStack, Text, useColorModeValue } from '@chakra-ui/react';
import { BasicInfoLayout } from './BasicInfoLayout';
import { ColorText } from '../../common/ColorText';
import { getRivalInfoAPI } from '../../../api/rival';
import { useEffect, useState } from 'react';
import { getUserID } from '../../../api/common';
import { rival } from '../../../types/DataTypes';

export const UserBasicCard = () => {
  const [userInfo, setuserInfo] = useState<rival>({ tier: '0', userId: '', userClass: 0 });

  const fetchuserInfo = async () => {
    setuserInfo(await getRivalInfoAPI(getUserID()));
  };

  // 일단 유저 정보 뽑기 위해 라이벌 정보 조회로 가져옴.
  // TODO : 수정 필요
  useEffect(() => {
    fetchuserInfo();
  }, []);

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
