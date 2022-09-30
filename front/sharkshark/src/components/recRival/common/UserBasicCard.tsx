import { HStack, Box, Flex, Center, VStack, Text, useColorModeValue } from '@chakra-ui/react';
import { getUserID } from '../../../api/common';
import { BasicInfoLayout } from './BasicInfoLayout';
import { ColorText } from '../../common/ColorText';

export const UserBasicCard = () => {
  return (
    <Flex>
      <HStack
        bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
        maxW="380px"
        h="140px"
        borderRadius="10px"
        pl="50px"
        pr="150px"
      >
        <BasicInfoLayout typeName="user" level={17} classCount="Class 4" id={getUserID()} />
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
              fontSize="14px"
              fontWeight="600"
              color={useColorModeValue('neutral.700', 'neutral.50')}
            >
              해결한 문제 수
            </Text>
            <Box fontSize="28px" fontWeight="800">
              <ColorText>271</ColorText>
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
              fontSize="14px"
              fontWeight="600"
              color={useColorModeValue('neutral.700', 'neutral.50')}
            >
              랭크
            </Text>
            <Box fontSize="28px" fontWeight="800">
              <ColorText>7129</ColorText>
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
              fontSize="14px"
              fontWeight="600"
              color={useColorModeValue('neutral.700', 'neutral.50')}
            >
              상위 100제 난이도 합
            </Text>
            <Box fontSize="28px" fontWeight="800">
              <ColorText>1165</ColorText>
            </Box>
          </VStack>
        </Center>
      </HStack>
    </Flex>
  );
};
