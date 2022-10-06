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
import { simpleProblem } from '../../../../types/DataTypes';
import { ColorText } from '../../../common/ColorText';
import { Tier } from '../../../common/Tier';

const SolvedCard = (props: { problem: simpleProblem }) => {
  const { problem } = props;
  return (
    <Box px="24px" py="12px" bg={useColorModeValue('white', 'black')} borderRadius="10px" mb="12px">
      <Flex>
        {/* id */}
        <Box ml="24px" fontWeight="700" fontSize="16px">
          <ColorText>{problem.no}</ColorText>
        </Box>

        {/* title */}
        <Box ml="16px">
          <Box mb="16px">{problem.title}</Box>
        </Box>

        <Spacer />
        <Button
          mx="8px"
          h="32px"
          fontSize="16px"
          variant="unstyled"
          onClick={() => window.open(`https://www.acmicpc.net/problem/${problem.no}`, '_blank')}
        >
          📖 문제 보기
        </Button>
      </Flex>
    </Box>
  );
};

export default SolvedCard;
