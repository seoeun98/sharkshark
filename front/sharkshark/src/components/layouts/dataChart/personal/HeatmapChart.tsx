import { VStack, useColorModeValue, Box } from '@chakra-ui/react';
import React from 'react';
import ApexCharts from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { ColorText } from '../../../common/ColorText';

export const HeatmapChart = () => {
  const solvedTermInfo = useSelector((state: any) => state.DataChartReducer.solvedTermInfo);
  console.log(solvedTermInfo);
  // const series = [
  //   {
  //     data: [],
  //   },
  // ];
  // // 알고리즘 유형 별
  // let options = {
  //   dataLabels: {
  //     enabled: true,
  //   },
  //   plotOptions: {
  //     radar: {
  //       size: 140,
  //       polygons: {
  //         strokeColors: 'rgba(130, 240, 255, 0.2)',
  //         fill: {
  //           colors: ['rgba(153, 123, 237, 0.2)', 'rgba(130, 240, 255, 0.2)'],
  //         },
  //       },
  //     },
  //   },
  //   colors: ['#0BC5EA'],
  //   markers: {
  //     size: 4,
  //     colors: ['#0BC5EA'],
  //     strokeColor: '#0BC5EA',
  //     strokeWidth: 2,
  //   },
  //   tooltip: {
  //     shared: true,
  //     theme: 'dark',
  //     y: {
  //       formatter: function (val: any) {
  //         return val;
  //       },
  //     },
  //   },
  // };
  return (
    <VStack bg={useColorModeValue('neutral.0', 'neutral.500')} borderRadius="12px">
      <Box
        pos="absolute"
        mt={-6}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('nuetral.0', 'black')}
        py={2}
        px={8}
        borderRadius="8px"
        fontWeight="500"
        fontSize="18px"
      >
        <ColorText>기간별 푼 문제</ColorText>
      </Box>
      <Box py={6}>
        <ApexCharts type="heatmap" width="600" height="300" />
      </Box>
    </VStack>
  );
};
