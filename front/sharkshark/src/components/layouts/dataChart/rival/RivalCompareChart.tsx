import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  VStack,
  keyframes,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createRivalAPI, deleteRivalAPI } from '../../../../api/auth/rival';
import CompareCard from './CompareCard';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getTagDataAPI } from '../../../../api/auth/dataAnalysis';
import { tagInfo } from '../../../../types/DataTypes';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { ColorText } from '../../../common/ColorText';
import { setGoHome, setRegisted } from '../../../../reducers/rivalAPIReducer';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RivalCompareChart = (props: { Rectype: string }) => {
  const { Rectype } = props;
  const userInfo = useSelector((state: any) => state.rivalAPIReducer.userInfo);
  const rivalInfo = useSelector((state: any) => state.rivalAPIReducer.rivalInfo);
  const dispatch = useDispatch();
  const [registed, setRegisted2] = useState(Rectype);
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
  const [rivalTagInfo, setRivalTagInfo] = useState<tagInfo>({
    userId: rivalInfo.userId,
    math: 0,
    implementation: 0,
    greedy: 0,
    string: 0,
    dataStructure: 0,
    graph: 0,
    dp: 0,
    bruteforce: 0,
  });

  const animationKeyframes = keyframes`
  0% { transform: rotate(0);  }
  25% { transform: otate(0); }
  50% { transform: rotate(30deg);}
  75% { transform: rotate(30deg); }
  100% { transform: rotate(0); }
`;

  const animation = `${animationKeyframes} 2s ease-in-out infinite`;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    setUserTagInfo(await getTagDataAPI(userInfo.userId));
    setRivalTagInfo(await getTagDataAPI(rivalInfo.userId));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    labels: [
      '수학 math',
      '구현 implementation',
      '그리디 greedy',
      '문자열 string',
      '자료구조 data_structures',
      '그래프 graphs',
      '동적프로그래밍 dp',
      '브루트포스 bruteforcing',
    ],
    datasets: [
      {
        label: 'User',
        data: [
          userTagInfo.math,
          userTagInfo.implementation,
          userTagInfo.greedy,
          userTagInfo.string,
          userTagInfo.dataStructure,
          userTagInfo.graph,
          userTagInfo.dp,
          userTagInfo.bruteforce,
        ],
        fill: true,
        backgroundColor: 'rgba(157, 236, 249, 0.6)',
        borderColor: '#9DECF9',
        pointBackgroundColor: '#9DECF9',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#9DECF9',
        borderWidth: 1,
      },
      {
        label: 'Rival',
        data: [
          rivalTagInfo.math,
          rivalTagInfo.implementation,
          rivalTagInfo.greedy,
          rivalTagInfo.string,
          rivalTagInfo.dataStructure,
          rivalTagInfo.graph,
          rivalTagInfo.dp,
          rivalTagInfo.bruteforce,
        ],
        fill: true,
        backgroundColor: 'rgba(153, 123, 237, 0.6)',
        borderColor: '#997BED',
        pointBackgroundColor: '#997BED',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
    ],
  };

  const bgCondition = useColorModeValue('nuetral.0', 'black');

  return (
    <Box>
      <VStack>
        <Box mb={16}>
          <HStack spacing={24}>
            <CompareCard userInfo={userInfo} />
            <CompareCard userInfo={rivalInfo} />
          </HStack>
          <Center>
            <Box top="60vh" left="51vw" pos="absolute" as={motion.div} animation={animation}>
              <Image w="10vw" src="/assets/etc/rival_flash.svg" />
            </Box>
          </Center>
        </Box>
        {/* class */}
        <Center bg={bgCondition} py={2} px={8} borderRadius="8px" fontWeight="500" fontSize="18px">
          <ColorText>태그 분포 비교 분석</ColorText>
        </Center>
        <Box w="40vw">
          <Radar data={data} />
        </Box>
        <Box h="8vh" />
        <HStack spacing={12}>
          <Button
            variant="secondary"
            py="16px"
            size="cmd"
            borderRadius="36px"
            boxShadow="base"
            w="200px"
            onClick={() => {
              dispatch(setGoHome(true));
            }}
          >
            목록으로 돌아가기
          </Button>
          {Rectype === 'nonRegistered' ? (
            <Button
              w="200px"
              py="16px"
              size="cmd"
              borderRadius="36px"
              boxShadow="base"
              onClick={() => {
                createRivalAPI(userInfo.userId);
                setRegisted2('');
              }}
            >
              라이벌 등록
            </Button>
          ) : (
            <Button
              w="200px"
              py="16px"
              size="cmd"
              borderRadius="36px"
              boxShadow="base"
              onClick={() => {
                deleteRivalAPI(userInfo.userId);
                setRegisted2('nonRegistered');
                dispatch(setRegisted('nonRegistered'));
              }}
            >
              라이벌 해지
            </Button>
          )}
        </HStack>
      </VStack>

      <VStack />
    </Box>
  );
};

export default RivalCompareChart;
