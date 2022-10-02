import { Flex, useColorModeValue, Box, HStack, Center } from '@chakra-ui/react';
import { CTproblem } from '../../../../types/DataTypes';
import { ColorText } from '../../../common/ColorText';

const ProblemItem = (props: { problem: CTproblem; problemIndex: any }) => {
  const { problem, problemIndex } = props;

  return (
    <HStack w="48vw" h="8vh" bg={useColorModeValue('neutral.0', 'neutral.500')} borderRadius="10px">
      <Box
        w="4vw"
        h="8vh"
        bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
        borderLeftRadius="10px"
      />
      <Center px="20px" py="16px" textAlign="center">
        <Box fontSize="18px" mr={4}>
          <ColorText>문제 {problemIndex + 1}</ColorText>
        </Box>
        {/* title */}
        <Box fontSize="16px" fontWeight="600" color={useColorModeValue('neutral.300', 'white')}>
          {problem.title}
        </Box>
      </Center>
    </HStack>
  );
};

export default ProblemItem;
