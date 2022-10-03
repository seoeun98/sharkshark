import { Box, Center, HStack, Image, VStack } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

const RivalCompareChart = () => {
  const userInfo = useSelector((state: any) => state.rivalAPIReducer.userInfo);
  const rivalInfo = useSelector((state: any) => state.rivalAPIReducer.rivalInfo);
  const clickedRivalId = useSelector((state: any) => state.rivalAPIReducer.clickedRivalId);
  console.log(userInfo);
  console.log(clickedRivalId, rivalInfo);

  return (
    <Box>
      <VStack>
        <HStack>
          <Box h="30vh" w="50vh" bg="neutral.900">
            유저
          </Box>
          <Box h="30vh" w="50vh" bg="neutral.900">
            유저
          </Box>
        </HStack>
        <Box h="30vh" w="50vh" bg="neutral.900">
          유저
        </Box>
      </VStack>

      <Image w="160vh" pos="absolute" bottom={-20} src="/assets/etc/rival_analysis.svg" />
    </Box>
  );
};

export default RivalCompareChart;
