import { Center, useColorModeValue, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getAverageProblemAPI,
  getLevelAvgAPI,
  getCategoryAvgAPI,
} from '../../../api/auth/dataAnalysis';
import {
  setAveragCategory,
  setAveragLevel,
  setWrongTypeInfo,
} from '../../../reducers/DataChartReducer';
import AvgTag from './recuser/AvgTag';
import SolvedLevel from './recuser/SolvedLevel';
import SovledNum from './recuser/SovledNum';

export const DataRivalPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    dispatch(setAveragLevel(await getAverageProblemAPI()));
    dispatch(setWrongTypeInfo(await getLevelAvgAPI()));
    dispatch(setAveragCategory(await getCategoryAvgAPI()));
  };
  return (
    <VStack spacing={20}>
      <Center>
        <VStack
          boxShadow="base"
          bg={useColorModeValue('neutral.0', 'neutral.500')}
          borderRadius="12px"
          w="30vw"
          h="600px"
          mr={8}
        >
          <SolvedLevel />
        </VStack>
        <VStack
          boxShadow="base"
          bg={useColorModeValue('neutral.0', 'neutral.500')}
          borderRadius="12px"
          w="30vw"
          h="600px"
        >
          <SovledNum />
        </VStack>
      </Center>
      <VStack
        boxShadow="base"
        bg={useColorModeValue('neutral.0', 'neutral.500')}
        borderRadius="12px"
        w="60vw"
        h="500px"
      >
        <AvgTag />
      </VStack>
    </VStack>
  );
};
