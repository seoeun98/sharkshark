import { Box, Flex, Spacer, Tag } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getRoadMapDataAPI } from '../../../api/auth/dataAnalysis';
import { getRivalInfoAPI } from '../../../api/auth/rival';
import { getUserID } from '../../../api/common';
import { rival } from '../../../types/DataTypes';
import { ColorText } from '../../common/ColorText';
import { Tier } from '../../common/Tier';
import ApexChart, { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

export const DataRoadPage = () => {
  const [myInfo, setMyInfo] = useState<rival>({
    tier: '0',
    userId: '',
    userClass: 0,
    exp: 0,
  });

  const [data, setData] = useState({
    datasets: [{ label: '', data: '', borderColor: '', backgroundColor: '' }],
  });

  const getUserInfo = async () => {
    setMyInfo(await getRivalInfoAPI(getUserID()));
    const RoadMapData = await getRoadMapDataAPI();
    console.log(RoadMapData);
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
    xaxis: {
      categories: ['1', '2', '3', '4', '6', '6'],
    },
    yaxis: {
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
      <Box pos="relative" p="32px" my="32px">
        <Box
          pos="absolute"
          w="full"
          h="full"
          bgGradient="linear(to-br, #4AE2DE, #77A9E7, #997BED)"
          borderRadius="12px"
          filter="auto"
          brightness="50%"
          zIndex={-1}
        />
        <Box>
          <ReactApexChart
            type="line"
            options={options}
            series={[
              {
                name: myInfo.userId,
                data: [10, 41, 35, 51, 49, 62],
              },
              {
                name: 'Rivals',
                data: [10, 123, 35, 51, 12, 33],
              },
            ]}
          />
        </Box>
      </Box>
    </>
  );
};
