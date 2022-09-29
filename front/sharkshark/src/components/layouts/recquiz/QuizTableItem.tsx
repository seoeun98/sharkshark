import {
  Box,
  useColorModeValue,
  Collapse,
  Flex,
  Spacer,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { Problem } from '../../../types/DataTypes';
import { HiStar, HiOutlineStar } from 'react-icons/hi';
import { Tier } from '../../common/Tier';
import { ColorText } from '../../common/ColorText';

export const QuizTableItem = (props: { problem: Problem }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { problem } = props;
  return (
    <Box bg={useColorModeValue('neutral.25', 'neutral.500')} borderRadius="10px">
      <Box px="8px" py="16px" onClick={onToggle}>
        <Flex>
          {/* star */}
          <Box fontSize="24px" ml="24px">
            {problem.star ? (
              <>
                <svg width="0px" height="0px">
                  <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop stopColor="#4AE2DE" offset="0%" />
                    <stop stopColor="#997BED" offset="100%" />
                  </linearGradient>
                </svg>
                <HiOutlineStar fill="url(#blue-gradient)" stroke="url(#blue-gradient)" />
              </>
            ) : (
              <HiOutlineStar />
            )}
          </Box>

          {/* level */}
          <Box ml="16px" w="24px">
            <Tier level={problem.level} size="auto" />
          </Box>

          {/* id */}
          <Box ml="24px">{problem.no}</Box>

          {/* title */}
          <Box ml="16px">
            <Box mb="16px">{problem.title}</Box>
            <Box>
              {problem.tags.split(',').map((item, index) => (
                <Tag borderRadius="20px" py="6px" px="12px" mr="8px" key={index}>
                  <ColorText># {item}</ColorText>
                </Tag>
              ))}
            </Box>
          </Box>
        </Flex>
      </Box>
      <Collapse in={isOpen} animateOpacity={false}>
        <Box
          p="16px"
          bg={useColorModeValue('neutral.50', 'neutral.700')}
          borderBottomRadius="10px"
          boxShadow="inset 0 5px 5px rgba(0,0,0,.3)"
        >
          <Flex>
            <Spacer />
            {/* solved */}
            <Box
              mx="8px"
              bg={useColorModeValue('neutral.25', 'neutral.500')}
              borderRadius="10px"
              p="8px"
            >
              해결 {problem.acceptedUserCnt}
            </Box>

            {/* average tries */}
            <Box
              mx="8px"
              bg={useColorModeValue('neutral.25', 'neutral.500')}
              borderRadius="10px"
              p="8px"
            >
              평균시도 {problem.avgTries}
            </Box>

            <Spacer />
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};
