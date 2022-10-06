import { Box, Center, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import ApexCharts from 'react-apexcharts';
import { getUserID } from '../../../../api/common';
import { userSolvedData } from '../../../../types/DataTypes';
import { ColorText } from '../../../common/ColorText';

const MemoryDataChart = (props: { problem: userSolvedData[]; userInfo: userSolvedData }) => {
  const { problem, userInfo } = props;
  const bgCondition = useColorModeValue('nuetral.0', 'black');

  let memoryData = [];

  for (let problemData of problem) {
    memoryData.push(problemData.memory);
  }
  let userMemory = userInfo.memory;

  const series = [
    {
      name: '메모리',
      data: memoryData,
    },
  ];
  const userId: string = getUserID();
  const options = {
    chart: {
      width: 400,
      height: 350,
      background: 'transparent', //투명
    },
    annotations: {
      yaxis: [
        {
          y: userMemory,
          borderColor: '#D5C7FD',

          label: {
            borderColor: '#D5C7FD',
            style: {
              color: '#9BB4F3',
              fontWeight: 600,
              background: '#DEE2E6',
            },
            text: userId,
          },
        },
      ],
    },
    tooltip: {
      shared: true,
      intersect: false,
      fillSeriesColor: false,
      theme: 'dark',
      style: {
        fontSize: '12px',
      },
      x: {
        show: false,
      },
      marker: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#69E0F3'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    colors: ['#997BED'],
    dataLabels: {
      enabled: false,
    },
    grid: {
      //격자 없앰
      show: false,
    },
    legend: {
      show: false,
    },
  };
  return (
    <VStack>
      <Center
        mb={4}
        bg={bgCondition}
        py={2}
        px={8}
        borderRadius="8px"
        fontWeight="500"
        fontSize="18px"
      >
        <ColorText>메모리 비교 분석</ColorText>
      </Center>
      <ApexCharts type="bar" series={series} options={options} width="500" height="300" />
    </VStack>
  );
};

export default MemoryDataChart;
