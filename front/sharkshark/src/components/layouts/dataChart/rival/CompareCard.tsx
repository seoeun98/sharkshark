import { Center, HStack, VStack, useColorModeValue, Box, Text, Flex } from '@chakra-ui/react';
import { rival } from '../../../../types/DataTypes';
import { ColorText } from '../../../common/ColorText';
import { BasicInfoLayout } from '../../recRival/common/BasicInfoLayout';
import { useState, useEffect } from 'react';

const CompareCard = (props: { userInfo: rival }) => {
  const [value, setValue] = useState('0vh');
  const { userInfo } = props;

  useEffect(() => {
    let width = 17;
    let percent = userInfo.exp / (userInfo.exp + 20000);
    let value = String(percent * width);
    setValue(value + 'vh');
  });

  return (
    <Box
      w="24vw"
      h="56vh"
      borderRadius="10px"
      bg={useColorModeValue('neutral.0', 'black')}
      boxShadow="base"
    >
      <Center
        borderRadius="10px"
        py="50px"
        w="100%"
        bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
        boxShadow="inset 0 5px 5px rgba(0,0,0,.3)"
      >
        <BasicInfoLayout
          typeName="user"
          level={userInfo.tier}
          userClass={userInfo.userClass}
          id={userInfo.userId}
        />
      </Center>
      <VStack spacing={6} mt={-6}>
        <Center mx="8px" bg={useColorModeValue('white', 'neutral.800')} borderRadius="10px">
          <Center flexDirection="column" w="20vw" h="8vh">
            <Center w="20vw" justifyContent="space-between" px="8" mb={1}>
              <Text
                fontSize="14px"
                fontWeight="600"
                color={useColorModeValue('neutral.700', 'neutral.50')}
              >
                EXP
              </Text>
              <Box fontSize="16px" fontWeight="800">
                <ColorText>{userInfo.exp}</ColorText>
              </Box>
            </Center>
            {/* exp */}
            <Box w="17vw" h="2vh" borderRadius="10px" bg={useColorModeValue('neutral.0', 'black')}>
              <Box
                w={value}
                h="1vh"
                borderRadius="10px"
                mx={1}
                my={1}
                bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
                transition="1s ease"
                transitionDelay="0.5s"
              />
            </Box>
          </Center>
        </Center>

        <Flex>
          {/* solvedCount */}
          <Center
            mx="8px"
            bg={useColorModeValue('white', 'neutral.800')}
            borderRadius="10px"
            p="8px"
            w="6vw"
          >
            <VStack spacing={1}>
              <Text
                fontSize="14px"
                fontWeight="600"
                color={useColorModeValue('neutral.700', 'neutral.50')}
              >
                해결한 문제
              </Text>
              <Box fontSize="20px" fontWeight="800">
                <ColorText>{userInfo.solvedCount}</ColorText>
              </Box>
            </VStack>
          </Center>

          {/* rank*/}
          <Center
            mx="8px"
            bg={useColorModeValue('white', 'neutral.800')}
            borderRadius="10px"
            p="12px"
            w="6vw"
          >
            <VStack spacing={1}>
              <Text
                fontSize="14px"
                fontWeight="600"
                color={useColorModeValue('neutral.700', 'neutral.50')}
                textAlign="center"
              >
                랭크
              </Text>
              <Box fontSize="20px" fontWeight="800">
                <ColorText>{userInfo.rank}</ColorText>
              </Box>
            </VStack>
          </Center>

          {/* 레이팅 */}
          <Center
            mx="8px"
            bg={useColorModeValue('white', 'neutral.800')}
            borderRadius="10px"
            p="12px"
            w="6vw"
          >
            <VStack spacing={1}>
              <Text
                fontSize="14px"
                fontWeight="600"
                color={useColorModeValue('neutral.700', 'neutral.50')}
                textAlign="center"
              >
                레이팅
              </Text>
              <Box fontSize="20px" fontWeight="800">
                <ColorText>{userInfo.rating}</ColorText>
              </Box>
            </VStack>
          </Center>
        </Flex>
        <VStack>
          <Box
            bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
            py={1}
            px={4}
            borderRadius="6px"
            pos="absolute"
            color="white"
            fontWeight="500"
          >
            <Center>RATING</Center>{' '}
          </Box>
          <Center
            mx="8px"
            bg={useColorModeValue('white', 'neutral.800')}
            borderRadius="10px"
            p="8px"
            w="20vw"
            h="12vh"
            pt={8}
          >
            <HStack spacing={12}>
              <VStack spacing={1}>
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  color={useColorModeValue('neutral.700', 'neutral.50')}
                >
                  문제 난이도 합
                </Text>
                <Box fontSize="20px" fontWeight="800">
                  <ColorText>{userInfo.ratingByProblemsSum}</ColorText>
                </Box>
              </VStack>
              <VStack spacing={1}>
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  color={useColorModeValue('neutral.700', 'neutral.50')}
                >
                  클래스
                </Text>
                <Box fontSize="20px" fontWeight="800">
                  <ColorText>{userInfo.ratingByClass}</ColorText>
                </Box>
              </VStack>
              <VStack spacing={1}>
                <Text
                  fontSize="14px"
                  fontWeight="600"
                  color={useColorModeValue('neutral.700', 'neutral.50')}
                >
                  해결 문제 수
                </Text>
                <Box fontSize="20px" fontWeight="800">
                  <ColorText>{userInfo.ratingBySolvedCount}</ColorText>
                </Box>
              </VStack>
            </HStack>
          </Center>
        </VStack>
      </VStack>
    </Box>
  );
};

export default CompareCard;
