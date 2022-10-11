import {
  useColorModeValue,
  Box,
  Button,
  Flex,
  Spacer,
  Tag,
  Center,
  HStack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { createRivalAPI } from '../../../../api/auth/rival';
import { simpleProblem, userPerProblem } from '../../../../types/DataTypes';
import { ColorText } from '../../../common/ColorText';
import { Tier } from '../../../common/Tier';

const SolvedCard = (props: { RivalInfo: userPerProblem }) => {
  const bg = useColorModeValue('white', 'black');
  const { RivalInfo } = props;
  return (
    <Box bg={bg} borderRadius="10px">
      <Flex justifyContent="space-between" alignItems="center" py="18px" px="36px">
        <HStack py={2}>
          {' '}
          <Box w="32px" mr={4}>
            <Tier level={RivalInfo.level} size="auto" />
          </Box>
          <Box p={0} m={0}>
            {/* id */}
            <Box fontWeight="700" fontSize="16px">
              <ColorText>{RivalInfo.userId}</ColorText>
            </Box>

            {/* title */}
            <Box>
              <Box>평균 문제 풀이 횟수 {Math.floor(RivalInfo.pb_per_week)}회</Box>
            </Box>
          </Box>
        </HStack>
        <Spacer w="4vw" />
        <Flex bg={useColorModeValue('neutral.0', 'neutral.500')} h="40px" borderRadius="36px">
          <Button
            py="12px"
            px="24px"
            variant="secondary"
            size="md"
            borderRadius="36px"
            fontSize="13px"
            fontWeight="800"
            bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
            bgClip="text"
            boxShadow="base"
            onClick={() => createRivalAPI(RivalInfo.userId)}
          >
            라이벌 등록
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SolvedCard;
