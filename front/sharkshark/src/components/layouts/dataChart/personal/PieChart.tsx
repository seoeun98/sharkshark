import { Center, useColorModeValue, Box } from '@chakra-ui/react';
import ApexCharts from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { ColorText } from '../../../common/ColorText';

export const PieChart = () => {
  const wrongTypeInfo = useSelector((state: any) => state.DataChartReducer.wrongTypeInfo);
  console.log(wrongTypeInfo);
  const series = [
    wrongTypeInfo.wrong_answer,
    wrongTypeInfo.over_memory,
    wrongTypeInfo.runtime_error,
    wrongTypeInfo.over_time,
    wrongTypeInfo.wrong_print,
    wrongTypeInfo.over_print,
    wrongTypeInfo.compile_error,
  ];
  let labels = [
    '틀렸습니다',
    '메모리 초과',
    '런타임 에러',
    '시간 초과',
    '출력 형식 에러',
    '출력 초과',
    '컴파일 에러',
  ];
  let options = {
    fill: {
      type: 'gradient',
    },
    plotOptions: {
      title: {
        text: '이벤트별 통계',
        align: 'center',
      },
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: false,
              show: false,
              fontSize: '12px',
              color: 'red',
            },
            value: {
              fontSize: '22px',
              show: true,
              color: '#9DECF9',
            },
          },
        },
      },
      tooltip: {
        theme: 'dark',
      },
    },
  };

  return (
    <>
      <Center
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
        <ColorText>주요 오답 유형</ColorText>
      </Center>
      <Box py={6}>
        <ApexCharts
          type="donut"
          series={series}
          labels={labels}
          options={options}
          width="600"
          height="300"
        />
      </Box>
    </>
  );
};
