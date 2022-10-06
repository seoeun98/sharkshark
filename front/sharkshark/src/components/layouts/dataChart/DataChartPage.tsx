import { Center, HStack, VStack, useColorModeValue, Box, Text, Flex } from '@chakra-ui/react';
import { ColorText } from '../../common/ColorText';
import { BasicInfoLayout } from '../recRival/common/BasicInfoLayout';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TagChart } from './personal/TagChart';
import { PieChart } from './personal/PieChart';
import {
  getSolveTermDataAPI,
  getTagDataAPI,
  getWrongTypeDataAPI,
} from '../../../api/auth/dataAnalysis';
import { getUserID } from '../../../api/common';
import {
  setSolvedTermInfo,
  setUserTagInfo,
  setWrongTypeInfo,
} from '../../../reducers/DataChartReducer';
import { HeatmapChart } from './personal/HeatmapChart';
import { getRivalInfoAPI } from '../../../api/auth/rival';
import { setUserInfo } from '../../../reducers/rivalAPIReducer';

const DataChartPage = () => {
  const userInfo = useSelector((state: any) => state.rivalAPIReducer.userInfo);
  const [value, setValue] = useState('0vh');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    dispatch(setUserInfo(await getRivalInfoAPI(getUserID())));
    let width = 17;
    let percent = userInfo.exp / (userInfo.exp + 20000);
    let value = String(percent * width);
    setValue(value + 'vh');

    let userTagInfo = await getTagDataAPI(getUserID());
    dispatch(setUserTagInfo(userTagInfo));
    dispatch(setSolvedTermInfo(await getSolveTermDataAPI()));
    dispatch(setWrongTypeInfo(await getWrongTypeDataAPI()));
  };

  return (
    <VStack spacing={16}>
      <VStack spacing={-8}>
        {/* 유저 정보 */}
        <Center
          borderRadius="10px"
          py="6vh"
          w="64vw"
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
        <Center
          boxShadow="base"
          w="40vw"
          h="12vh"
          bg={useColorModeValue('neutral.0', 'black')}
          borderRadius="10px"
        >
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

      <Center>
        {/* 사소한 유저 정보와 레이팅 세부사항 */}
        <VStack spacing={6} h="320px" mr={8}>
          <HStack spacing={4}>
            {/* solvedCount */}
            <Center
              bg={useColorModeValue('neutral.0', 'black')}
              borderRadius="10px"
              py="2vh"
              w="6vw"
              boxShadow="base"
            >
              <VStack spacing={1}>
                <Text
                  fontSize="16px"
                  fontWeight="600"
                  color={useColorModeValue('neutral.700', 'neutral.50')}
                >
                  해결 문제
                </Text>
                <Box fontSize="20px" fontWeight="800">
                  <ColorText>{userInfo.solvedCount}</ColorText>
                </Box>
              </VStack>
            </Center>

            {/* rank*/}
            <Center
              boxShadow="base"
              mx="8px"
              bg={useColorModeValue('neutral.0', 'black')}
              borderRadius="10px"
              py="2vh"
              px="2vw"
              w="6vw"
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

            {/* rating */}
            <Center
              boxShadow="base"
              bg={useColorModeValue('neutral.0', 'black')}
              borderRadius="10px"
              py="2vh"
              px="1vw"
              w="6vw"
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
              px={6}
              borderRadius="6px"
              pos="absolute"
              color="white"
              fontWeight="500"
            >
              <Center>RATING</Center>{' '}
            </Box>
            <Box
              w="20vw"
              h="188px"
              borderRadius="12px"
              boxShadow="base"
              bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
            >
              <Center
                bg={useColorModeValue('neutral.0', 'black')}
                borderRadius="10px"
                p="12px"
                w="20vw"
                h="136px"
                pt={8}
              >
                <HStack spacing={12}>
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
            </Box>
          </VStack>
        </VStack>
        {/* 기간 별 푼 문제 */}
        <VStack
          bg={useColorModeValue('neutral.0', 'neutral.500')}
          borderRadius="12px"
          w="40vw"
          h="320px"
          boxShadow="base"
        >
          <HeatmapChart />
        </VStack>
      </Center>
      <HStack spacing={8}>
        <VStack
          boxShadow="base"
          bg={useColorModeValue('neutral.0', 'neutral.500')}
          borderRadius="12px"
          w="30vw"
          h="380px"
        >
          <PieChart />
        </VStack>
        {/* 알고리즘 유형별 분석 */}
        <VStack
          boxShadow="base"
          bg={useColorModeValue('neutral.0', 'neutral.500')}
          borderRadius="12px"
          w="30vw"
          h="380px"
        >
          <TagChart />
        </VStack>
      </HStack>
    </VStack>
  );
};

export default DataChartPage;
