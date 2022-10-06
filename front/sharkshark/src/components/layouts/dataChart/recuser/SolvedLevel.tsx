import { Center, useColorModeValue, Box, VStack, HStack } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { simpleProblem } from '../../../../types/DataTypes';
import { ColorText } from '../../../common/ColorText';
import { Tier } from '../../../common/Tier';
import SolvedCard from './SolvedCard';

const SolvedLevel = () => {
  const averagLevel = useSelector((state: any) => state.DataChartReducer.wrongTypeInfo);
  let style = {
    width: '42px',
    margin: '14px',
    px: '14px',
    py: '4px',
    fontSize: '14px',
    borderRadius: '50px',
    idFontSize: '24px',
  };
  const bgCondition = useColorModeValue('white', 'black');
  const bgcolor = useColorModeValue('neutral.25', 'neutral.500');
  return (
    <>
      <Center
        pos="absolute"
        boxShadow="base"
        mt={-6}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'black')}
        py={2}
        px={8}
        borderRadius="8px"
        fontWeight="500"
        fontSize="18px"
      >
        <ColorText>해결 문제 분석</ColorText>
      </Center>
      <VStack spacing={8}>
        <HStack mt={8}>
          <Box w={style.width} mr={style.margin}>
            <Tier level={Math.floor(averagLevel.level_avg)} size="auto" />
          </Box>
          <VStack alignItems="flex-start" spacing={0}>
            {/* class */}
            <Center
              bg={bgCondition}
              px={style.px}
              py={style.py}
              fontSize={style.fontSize}
              borderRadius={style.borderRadius}
            >
              <ColorText>해결 문제 평균 난이도</ColorText>
            </Center>
            {/* userId */}
            <Box fontSize={style.idFontSize} fontWeight="700">
              {averagLevel.level_avg}
            </Box>
          </VStack>
        </HStack>
        <VStack spacing={6}>
          <Box
            bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
            py={2}
            w="26vw"
            borderRadius="6px"
            color="white"
            fontWeight="500"
          >
            <Center>문제 목록</Center>{' '}
          </Box>
          <VStack>
            <Box
              w="26vw"
              h="360px"
              overflow="auto"
              css={{
                '&::-webkit-scrollbar': {
                  width: '12px',
                },
                '&::-webkit-scrollbar-track': {
                  background: useColorModeValue('#CBCDD6', '#18181A'),
                  borderRadius: '12px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'linear-gradient(0deg, #997BED 0%, #4AE2DE 100%)',
                  borderRadius: '12px',
                },
              }}
            >
              {averagLevel.list ? (
                averagLevel.list.map((item: simpleProblem, index: number) => (
                  <Box mb="8px" mr="8px" key={index}>
                    <SolvedCard problem={item} />
                  </Box>
                ))
              ) : (
                <Center bg={bgcolor} borderRadius="12px" p="32px">
                  ~ 목록이 없습니다 ~
                </Center>
              )}
            </Box>
          </VStack>
        </VStack>
      </VStack>
    </>
  );
};

export default SolvedLevel;
