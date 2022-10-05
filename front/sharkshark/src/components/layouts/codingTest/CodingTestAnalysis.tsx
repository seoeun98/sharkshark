import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getUserID } from '../../../api/common';
import ApexCharts from 'react-apexcharts';
import MemoryDataChart from './Item/MemoryDataChart';
import { userSolvedData } from '../../../types/DataTypes';
import TimeDataChart from './Item/TimeDataChart';
import ProblemItemForAnalysis from './Item/ProblemItemForAnalysis';

const CodingTestAnalysis = () => {
  // 푼 문제 리스트 (문제 정보)
  const solvedList = useSelector((state: any) => state.CTReducer.solvedList);
  // 문제 결과 데이터
  const sovledResultData = useSelector((state: any) => state.CTReducer.sovledResultData);
  console.log(solvedList);
  console.log(sovledResultData);
  const titlefw = useColorModeValue(700, 500);
  const subtitlefw = useColorModeValue(500, 300);
  const subtitleColor = useColorModeValue('neutral.700', 'neutral.50');

  return (
    <>
      <Box mb="8vh" ml="24vw">
        <Box mb="4vh">
          <Box fontSize="24px" fontWeight={titlefw} mb="2vh">
            실력 점검
          </Box>
          <Box fontSize="14px" mb="4vh" fontWeight={subtitlefw} color={subtitleColor}>
            {getUserID()} 님의 문제 풀이를 분석한 결과입니다.
            <br />
            분석 결과를 보고, 실력을 점검해보세요!
          </Box>
        </Box>
      </Box>
      <Box ml="26vw">
        {sovledResultData.map(
          (
            item: {
              userInfo: userSolvedData;
              time_sort_list: userSolvedData[];
              memory_sort_list: userSolvedData[];
            },
            index: string | number,
          ) => (
            <Box mb={16}>
              <Box mb={12}>
                <ProblemItemForAnalysis userInfo={item.userInfo} problem={solvedList[index]} />
              </Box>

              <Flex w="50vw">
                <MemoryDataChart problem={item.memory_sort_list} userInfo={item.userInfo} />
                <TimeDataChart problem={item.time_sort_list} userInfo={item.userInfo} />
              </Flex>
            </Box>
          ),
        )}
      </Box>
    </>
  );
};

export default CodingTestAnalysis;
