import {
  Box,
  Center,
  Flex,
  Spacer,
  Spinner,
  Tag,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getRoadMapDataAPI } from '../../../api/auth/dataAnalysis';
import { getRivalInfoAPI, getRivalRecentAPI } from '../../../api/auth/rival';
import { getUserID } from '../../../api/common';
import { Problem, rival } from '../../../types/DataTypes';
import { ColorText } from '../../common/ColorText';
import { Tier } from '../../common/Tier';
import ApexChart, { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { probsRecentAPI } from '../../../api/auth';

export const DataRoadPage = () => {
  const [myInfo, setMyInfo] = useState<rival>({
    tier: '0',
    userId: '',
    userClass: 0,
    exp: 0,
  });

  const [data, setData] = useState({
    user: [],
    rivals: [],
  });

  const [myProbs, setMyProbs] = useState<Problem[]>([]);
  const [rivalProbs, setRivalProbs] = useState({});

  const [loading, setLoading] = useState(true);
  const probColor = useColorModeValue('neutral.25', 'neutral.700');

  const getUserInfo = async () => {
    setMyInfo(await getRivalInfoAPI(getUserID()));
    const newdata = await getRoadMapDataAPI();
    setData(newdata);
    setMyProbs(await probsRecentAPI());
    setRivalProbs(await getRivalRecentAPI());
    setLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const options: ApexOptions = {
    chart: {
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: '#FFFFFF',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
    },
    fill: {
      colors: ['#1A73E8', '#23FF8A'],
      type: ['gradient', 'gradient'],
      gradient: {
        shade: 'light',
        gradientToColors: ['#31D7FF', '#8EFFEA'],
        shadeIntensity: 0.5,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100],
      },
    },
  };

  return (
    <>
      <Center w="60vw">
        <Spinner display={loading ? '' : 'none'} boxSize="64px" thickness="4px" />
      </Center>
      <Box display={loading ? 'none' : ''}>
        {/* title */}
        <Flex>
          <Spacer />
          <Box
            fontSize="28px"
            text-stroke="4px transparent"
            bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
            color="Background"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextStroke: '2px transparent',
            }}
          >
            {myInfo.userId}
          </Box>
          <Tag borderRadius="32px" ml="16px" px="16px">
            <Tier level={parseInt(myInfo?.tier)} size="24px" />
            <ColorText>&nbsp;Class {myInfo?.userClass}</ColorText>
          </Tag>
          <Spacer />
        </Flex>
        {/* body */}
        <VStack pos="relative" my="32px" spacing="32px">
          {/* background */}
          <Box
            pos="absolute"
            w="full"
            h="full"
            bgGradient="linear(to-br, #4AE2DE, #77A9E7, #997BED)"
            borderRadius="12px"
            filter="auto"
            brightness="70%"
            zIndex={-1}
          />
          {/* chart box */}
          <Box
            bg={useColorModeValue('neutral.0', 'neutral.500')}
            borderRadius="12px"
            boxShadow="base"
            w="864px"
          >
            <VStack>
              <Box
                pos="absolute"
                mt={-6}
                bg={useColorModeValue('white', 'black')}
                boxShadow="base"
                py={2}
                px={8}
                borderRadius="8px"
                fontWeight="500"
                fontSize="18px"
              >
                <ColorText>평균 난이도 변화</ColorText>
              </Box>
              <Box p="32px">
                <ReactApexChart
                  type="line"
                  options={options}
                  series={[
                    {
                      name: myInfo.userId,
                      data: data.user[0],
                    },
                    {
                      name: 'Rivals',
                      data: data.rivals[0],
                    },
                  ]}
                  width="800"
                  height="240"
                />
              </Box>
            </VStack>
          </Box>

          <Flex>
            <Box
              bg={useColorModeValue('neutral.0', 'neutral.500')}
              borderRadius="12px"
              boxShadow="base"
              w="416px"
              mr="16px"
              my="32px"
            >
              <VStack>
                <Box
                  pos="absolute"
                  mt={-6}
                  bg={useColorModeValue('white', 'black')}
                  boxShadow="base"
                  py={2}
                  px={8}
                  borderRadius="8px"
                  fontWeight="500"
                  fontSize="18px"
                >
                  <ColorText>최근 내 문제</ColorText>
                </Box>
                <Box p="8px">
                  {myProbs.map((item, idx) => (
                    <Flex
                      w="360px"
                      key={idx}
                      borderRadius="32px"
                      my="8px"
                      pt="12px"
                      pb="8px"
                      px="16px"
                    >
                      {/* level */}
                      <Box ml="16px" w="24px">
                        <Tier level={item.level} size="auto" />
                      </Box>

                      {/* id */}
                      <Box ml="24px">{item.no}</Box>

                      {/* title */}
                      <Box ml="16px">{item.title}</Box>

                      <Spacer />
                      <Box
                        ml="16px"
                        onClick={() =>
                          window.open(`https://www.acmicpc.net/problem/${item.no}`, '_blank')
                        }
                      >
                        📖
                      </Box>
                    </Flex>
                  ))}
                </Box>
              </VStack>
            </Box>
            <Box
              bg={useColorModeValue('neutral.0', 'neutral.500')}
              borderRadius="12px"
              boxShadow="base"
              w="416px"
              ml="16px"
              my="32px"
            >
              <VStack>
                <Box
                  pos="absolute"
                  mt={-6}
                  bg={useColorModeValue('white', 'black')}
                  boxShadow="base"
                  py={2}
                  px={8}
                  borderRadius="8px"
                  fontWeight="500"
                  fontSize="18px"
                >
                  <ColorText>추천 사용자 문제</ColorText>
                </Box>
                <Box p="8px">
                  {Object.keys(rivalProbs).map((item, idx) => (
                    <Flex
                      w="360px"
                      key={idx}
                      borderRadius="32px"
                      my="8px"
                      pt="12px"
                      pb="8px"
                      px="16px"
                    >
                      {/* level */}
                      <Box ml="16px" w="24px">
                        <Tier level={(rivalProbs as any)[item][0].level} size="auto" />
                      </Box>

                      {/* id */}
                      <Box ml="24px">{(rivalProbs as any)[item][0].no}</Box>

                      {/* title */}
                      <Box ml="16px">{(rivalProbs as any)[item][0].title}</Box>

                      <Spacer />
                      <Box
                        ml="16px"
                        onClick={() =>
                          window.open(
                            `https://www.acmicpc.net/problem/${(rivalProbs as any)[item][0].no}`,
                            '_blank',
                          )
                        }
                      >
                        📖
                      </Box>
                    </Flex>
                  ))}
                </Box>
              </VStack>
            </Box>
          </Flex>
        </VStack>
      </Box>
    </>
  );
};
