import { VStack, useColorModeValue, Box } from '@chakra-ui/react';
import ApexCharts from 'react-apexcharts';
import { ColorText } from '../../../common/ColorText';

export const HeatmapChart = (props: { commitInfo: any }) => {
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
        <ApexCharts type="heatmap" series={series} options={options} width="600" height="300" />
      </Box>
    </VStack>
  );
};
