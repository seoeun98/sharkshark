import {
  useColorModeValue,
  Box,
  Button,
  Flex,
  Spacer,
  Tag,
  Center,
  HStack,
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
      <Box px="8px" py="18px">
        <Flex justifyContent="space-between" alignItems="center" mx={10}>
          <Box mr={36}>
            {/* id */}
            <Box fontWeight="700" fontSize="16px">
              <ColorText>{RivalInfo.userId}</ColorText>
            </Box>

            {/* title */}
            <Box>
              <Box mb="16px">평균 문제 풀이 횟수 {Math.floor(RivalInfo.pb_per_week)}회</Box>
            </Box>
          </Box>

          <Flex bg={useColorModeValue('white', 'black')} w="100px" h="40px" borderRadius="36px">
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
    </Box>
  );
};

export default SolvedCard;
