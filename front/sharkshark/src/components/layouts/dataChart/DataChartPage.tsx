import { Center, HStack, VStack, useColorModeValue, Box, Text, Flex } from '@chakra-ui/react';
import { rival, tagInfo } from '../../../types/DataTypes';
import { ColorText } from '../../common/ColorText';
import { BasicInfoLayout } from '../recRival/common/BasicInfoLayout';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TagChart } from './personal/tagChart';
import { getTagDataAPI } from '../../../api/auth/dataAnalysis';

const DataChartPage = () => {
  const userInfo = useSelector((state: any) => state.rivalAPIReducer.userInfo);
  const [value, setValue] = useState('0vh');

  const [userTagInfo, setUserTagInfo] = useState<tagInfo>({
    userId: userInfo.userId,
    math: 0,
    implementation: 0,
    greedy: 0,
    string: 0,
    dataStructure: 0,
    graph: 0,
    dp: 0,
    bruteforce: 0,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    setUserTagInfo(await getTagDataAPI(userInfo.userId));
  };

  useEffect(() => {
    fetchData();
    let width = 17;
    let percent = userInfo.exp / (userInfo.exp + 20000);
    let value = String(percent * width);
    setValue(value + 'vh');
  }, [fetchData, userInfo.exp]);

  return (
    <VStack spacing={16}>
      <VStack spacing={-8}>
        {/* 유저 정보 */}
        <Center
          borderRadius="10px"
          py="6vh"
          w="60vw"
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
        {/* EXP */}
        <Center w="40vw" h="12vh" bg={useColorModeValue('neutral.0', 'black')} borderRadius="10px">
          <Flex flexDirection="column">
            <Flex justifyContent="space-between" px="2" mb={4}>
              <Text
                fontSize="18px"
                fontWeight="600"
                color={useColorModeValue('neutral.700', 'neutral.50')}
              >
                EXP
              </Text>
              <Box fontSize="18px" fontWeight="800">
                <ColorText>{userInfo.exp}</ColorText>
              </Box>
            </Flex>
            {/* exp */}
            <Flex
              w="30vw"
              h="3vh"
              borderRadius="40px"
              bg={useColorModeValue('white', 'neutral.500')}
            >
              <Box
                w={value}
                h="2vh"
                borderRadius="10px"
                mx={1}
                my={1}
                bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
                transition="1s ease"
                transitionDelay="0.5s"
              />
            </Flex>
          </Flex>
        </Center>
      </VStack>
      <HStack spacing={4}>
        {/* 사소한 유저 정보와 레이팅 세부사항 */}
        <VStack
          spacing={4}
          bg={useColorModeValue('neutral.0', 'neutral.500')}
          borderRadius="12px"
          px={4}
          py={16}
        >
          <HStack spacing={4}>
            {/* solvedCount */}
            <Center
              bg={useColorModeValue('white', 'black')}
              borderRadius="10px"
              py="2vh"
              px="2vw"
              w="8vw"
            >
              <VStack spacing={1}>
                <Text
                  fontSize="16px"
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
              bg={useColorModeValue('white', 'black')}
              borderRadius="10px"
              py="2vh"
              px="2vw"
              w="8vw"
            >
              <VStack spacing={1}>
                <Text
                  fontSize="16px"
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
              bg={useColorModeValue('white', 'black')}
              borderRadius="10px"
              py="2vh"
              px="2vw"
              w="8vw"
            >
              <VStack spacing={1}>
                <Text
                  fontSize="16px"
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
          </HStack>

          {/* 레이팅 세부사항 */}
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
              bg={useColorModeValue('white', 'black')}
              borderRadius="10px"
              p="8px"
              w="26vw"
              h="14vh"
              pt={8}
            >
              <HStack spacing={16}>
                <VStack spacing={1}>
                  <Text
                    fontSize="16px"
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
                    fontSize="16px"
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
                    fontSize="16px"
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
        <TagChart userTagInfo={userTagInfo} />
      </HStack>
    </VStack>
  );
};

export default DataChartPage;
