import { useColorModeValue, Box, Flex, Tag, Center } from '@chakra-ui/react';
import { CTproblem } from '../../../../types/DataTypes';
import { ColorText } from '../../../common/ColorText';
import { Tier } from '../../../common/Tier';

const ProblemItemForAnalysis = (props: { problem: CTproblem; userInfo: any }) => {
  const { problem } = props;
  const tagcolor = useColorModeValue('neutral.0', 'neutral.900');

  return (
    <Box bgGradient="linear(to-r, primary.cyan50, primary.purple0)" borderRadius="12px" w="62vw">
      <Box px="8px" py="16px">
        <Flex>
          <Box fontSize="24px" ml="24px" />

          {/* level */}
          <Box ml="16px" w="24px">
            <Tier level={problem.level} size="auto" />
          </Box>

          {/* id */}
          <Box ml="24px" fontWeight="600">
            {problem.no}
          </Box>

          {/* title */}
          <Box ml="16px">
            <Box mb="16px">{problem.title}</Box>
            <Box>
              {problem.tags.split(',').map((item, index) => (
                <Tag bg={tagcolor} borderRadius="20px" py="6px" px="12px" mr="8px" key={index}>
                  <ColorText># {item}</ColorText>
                </Tag>
              ))}
            </Box>
          </Box>
        </Flex>
      </Box>

      <Center
        p="16px"
        bg={useColorModeValue('neutral.50', 'neutral.800')}
        borderBottomRadius="10px"
        boxShadow="inset 0 5px 5px rgba(0,0,0,.3)"
      >
        <Flex>
          {/* solved */}
          <Box
            mx="8px"
            bg={useColorModeValue('neutral.25', 'neutral.500')}
            borderRadius="10px"
            p="8px"
          >
            ✅ 해결 {problem.acceptedUserCnt}
          </Box>

          {/* average tries */}
          <Box
            mx="8px"
            bg={useColorModeValue('neutral.25', 'neutral.500')}
            borderRadius="10px"
            p="8px"
          >
            ✏ 평균시도 {problem.avgTries}
          </Box>

          {/* 백준 링크 */}
          <Box
            mx="8px"
            bg={useColorModeValue('neutral.25', 'neutral.500')}
            borderRadius="10px"
            p="8px"
            onClick={() => window.open(`https://www.acmicpc.net/problem/${problem.no}`, '_blank')}
          >
            📖 BOJ 이동
          </Box>
        </Flex>
      </Center>
    </Box>
  );
};

export default ProblemItemForAnalysis;
