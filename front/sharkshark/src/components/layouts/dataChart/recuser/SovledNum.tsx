import { Center, useColorModeValue, Box, VStack } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { userPerProblem } from '../../../../types/DataTypes';
import { ColorText } from '../../../common/ColorText';
import UserNumCard from './UserNumCard';

const SovledNum = () => {
  const averageLevel = useSelector((state: any) => state.DataChartReducer.averageLevel);
  const bgcolor = useColorModeValue('neutral.25', 'neutral.500');
  return (
    <Center flexDirection="column">
      <Center
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
        <ColorText> 유사 사용자 Top 6 문제 풀이 분석</ColorText>
      </Center>
      <Center w="26vw" h="540px">
        {' '}
        <VStack
          mt="2vh"
          h="520px"
          py={0}
          px={2}
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
          {averageLevel.length > 0 ? (
            averageLevel.map((item: userPerProblem, index: number) => (
              <Center mr="8px" key={index}>
                <UserNumCard RivalInfo={item} />
              </Center>
            ))
          ) : (
            <Center bg={bgcolor} borderRadius="12px" p="32px">
              ~ 목록이 없습니다 ~
            </Center>
          )}
        </VStack>
      </Center>
    </Center>
  );
};

export default SovledNum;
