import { Box, Center, Collapse, Flex, Spacer, Tag, useDisclosure } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { Problem } from '../types/DataTypes';
import { HiStar, HiOutlineStar } from 'react-icons/hi';

export const QuizItem = (props: { problem: Problem }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { problem } = props;
  return (
    <Box bg="gray.300" borderRadius="10px">
      <Box p="8px" onClick={onToggle}>
        <Flex>
          {/* star */}
          <Box fontSize="24px" ml="16px">
            {problem.star ? <HiStar /> : <HiOutlineStar />}
          </Box>

          {/* level */}
          <Box ml="16px">{problem.level}</Box>

          {/* id */}
          <Box ml="16px">{problem.id}</Box>

          {/* title */}
          <Box ml="16px">
            <Box>{problem.title}</Box>
            <Box>
              {problem.tag.split('_').map((item, index) => (
                <Tag key={index}># {item}</Tag>
              ))}
            </Box>
          </Box>
        </Flex>
      </Box>
      <Collapse in={isOpen} animateOpacity={false}>
        <Box p="8px" bg="red.100" borderBottomRadius="10px">
          <Flex>
            <Spacer />
            {/* solved */}
            <Box mx="8px"> 해결 {problem.acceptedUserCnt}</Box>

            {/* average tries */}
            <Box mx="8px"> 평균시도 {problem.avgTries}</Box>

            <Spacer />
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};
