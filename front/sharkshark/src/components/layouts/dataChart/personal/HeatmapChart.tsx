import { VStack, useColorModeValue, Box, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ColorText } from '../../../common/ColorText';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const HeatmapChart = () => {
  const solvedTermInfo = useSelector((state: any) => state.DataChartReducer.solvedTermInfo);
  const keys = Object.keys(solvedTermInfo);
  const values: never[] = Object.values(solvedTermInfo);

  const week: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  function getDayOfWeek(date: string) {
    //ex) getDayOfWeek('2022-06-13')
    const index: number = new Date(date).getDay();
    // const dayOfWeek: string = week[index];
    return index;
  }

  let series = [
    { name: '', data: [] },
    { name: '', data: [] },
    { name: '', data: [] },
    { name: '', data: [] },
    { name: '', data: [] },
    { name: '', data: [] },
    { name: '', data: [] },
  ];

  let first_date = getDayOfWeek(keys[0]);

  for (let i = 0; i < 7; i++) {
    // series.push({ name: week[first_date + i], data: [] });
    if (first_date + i > 6) {
      series[i].name = week[first_date + i - 7];
      // series.push({ name: week[first_date + i - 7], data: [] });
    } else {
      series[i].name = week[first_date + i];
    }
  }

  for (let i = 0; i < keys.length; i++) {
    let index = i % 7;
    // let day = getDayOfWeek(keys[i]);
    series[index].data.push(values[i]);
  }

  let options: ApexOptions = {
    chart: {
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: '#ADB5BD',
    },
    legend: {
      labels: {
        colors: ['#ADB5BD'],
      },
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
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    stroke: {
      show: true,
      colors: [useColorModeValue('#F5F5F5', '#292835')],
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 5,
        useFillColorAsStroke: false,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 1,
              name: '1문제 이하',
              color: '#C4F1F9',
              foreColor: undefined,
            },
            {
              from: 2,
              to: 3,
              name: '2,3 문제',
              color: '#76E4F7',
              foreColor: undefined,
            },
            {
              from: 4,
              to: 5,
              name: '4,5 문제',
              color: '#00B5D8',
            },
            {
              from: 6,
              to: 200,
              name: '6문제 이상',
              color: '#0987A0',
            },
          ],
        },
      },
    },
  };

  return (
    <VStack>
      <Box
        pos="absolute"
        mt={-6}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'black')}
        boxShadow="base"
        py={2}
        px={8}
        borderRadius="8px"
        fontWeight="500"
        fontSize="18px"
      >
        <ColorText>기간별 푼 문제</ColorText>
      </Box>
      <Box py={8}>
        <ApexCharts type="heatmap" width="600" height="240" series={series} options={options} />
      </Box>
    </VStack>
  );
};
