import { Box, Flex, Spacer, Tag } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getRoadMapDataAPI } from '../../../api/auth/dataAnalysis';
import { getRivalInfoAPI } from '../../../api/auth/rival';
import { getUserID } from '../../../api/common';
import { rival } from '../../../types/DataTypes';
import { ColorText } from '../../common/ColorText';
import { Tier } from '../../common/Tier';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export const DataRoadPage = () => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
    setData({
      datasets: [
        {
          label: myInfo.userId,
          data: RoadMapData.user[0],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'rivals',
          data: RoadMapData.rivals[0],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
          <Line data={data} color="white" />;
        </Box>
      </Box>
    </>
  );
};
