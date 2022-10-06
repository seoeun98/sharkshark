import { Center, useColorModeValue, Box } from '@chakra-ui/react';
import ApexCharts from 'react-apexcharts';
import React from 'react';
import { useSelector } from 'react-redux';
import { ColorText } from '../../../common/ColorText';
import { getUserID } from '../../../../api/common';

const AvgTag = () => {
  const averageCategory = useSelector((state: any) => state.DataChartReducer.averageCategory);
  const userTagInfo = useSelector((state: any) => state.DataChartReducer.userTagInfo);
  const series = [
    {
      name: '유사 사용자',
      data: [
        averageCategory.math,
        averageCategory.implementation,
        averageCategory.greedy,
        averageCategory.string,
        averageCategory.dataStructure,
        averageCategory.graph,
        averageCategory.dp,
        averageCategory.bruteforce,
      ],
    },
    {
      name: getUserID(),
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
    },
  ];
  // 알고리즘 유형 별
  let options = {
    dataLabels: {
      enabled: true,
    },
    legend: {
      labels: {
        colors: ['#ADB5BD'],
      },
    },
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColors: ['rgba(130, 240, 255, 0.2)'],
          fill: {
            colors: ['rgba(153, 123, 237, 0.2)', 'rgba(130, 240, 255, 0.2)'],
          },
        },
      },
    },
    colors: ['#0BC5EA', '#A5A6F6'],
    markers: {
      size: 4,
      colors: ['#0BC5EA', '#A5A6F6'],
      strokeColor: '#0BC5EA',
      strokeWidth: 2,
    },
    tooltip: {
      shared: false,
      theme: 'dark',
      y: {
        formatter: function (val: any) {
          return val;
        },
      },
    },
    xaxis: {
      categories: [
        '수학 math',
        '구현 implementation',
        '그리디 greedy',
        '문자열 string',
        '자료구조 data_structures',
        '그래프 graphs',
        '동적프로그래밍 dp',
        '브루트포스 bruteforcing',
      ],
    },
    yaxis: {
      tickAmount: 7,
      labels: {
        formatter: function (val: any, i: number) {
          if (i % 2 === 0) {
            return val;
          } else {
            return '';
          }
        },
      },
    },
  };
  return (
    <>
      <Center
        bg={useColorModeValue('white', 'black')}
        mt={4}
        py={2}
        px={8}
        borderRadius="8px"
        fontWeight="500"
        fontSize="18px"
      >
        <ColorText> 평균 태그 분포도 비교</ColorText>
      </Center>
      <Box>
        <ApexCharts type="radar" series={series} options={options} width="500" height="400" />
      </Box>
    </>
  );
};

export default AvgTag;
