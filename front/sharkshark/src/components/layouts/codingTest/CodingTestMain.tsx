import { Box, Center, useColorModeValue, Image, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCTproblemAPI } from '../../../api/auth/codingTest';
import { CTproblem } from '../../../types/DataTypes';
import ProblemItem from './common/problemItem';

const CodingTestMain = () => {
  const problemNum = useSelector((state: any) => state.CTReducer.problemNum);
  const compStatus = useSelector((state: any) => state.CTReducer.compStatus);

  const [CTPList, setCTPList] = useState<CTproblem[]>([]);
  const [newCTPList, setnewsetCTPList] = useState<CTproblem[]>([]);

  const fetchCTPList = async () => {
    setCTPList(await getCTproblemAPI());
    newProblemList(CTPList);
  };

  useEffect(() => {
    fetchCTPList();
  }, []);

  let newList: CTproblem[] = [];
  const newProblemList = (problems: CTproblem[]) => {
    while (newCTPList.length < problemNum + 1) {
      let moveproblem = problems.splice(Math.floor(Math.random() * problems.length), 1)[0];
      newList.push(moveproblem);
      setnewsetCTPList(newList);
    }
  };

  // assets & style
  const sharkjoonImage = useColorModeValue(
    '/assets/logo/sharkjoon_light_logo.png',
    '/assets/logo/sharkjoon_logo.png',
  );
  const bgcolor = useColorModeValue('neutral.25', 'neutral.500');

  return (
    <Box w="50vw">
      {' '}
      <Box borderRadius="10px">
        <Center
          bg={useColorModeValue('neutral.0', 'neutral.800')}
          w="50vw"
          h="4vh"
          shadow="lg"
          borderTopRadius="10px"
        >
          <Image src={sharkjoonImage} w="240px" />
        </Center>
        <Center
          bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
          borderBottomRadius="10px"
          py="2vh"
          fontSize="18px"
          fontWeight="600"
          color="neutral.0"
        >
          <Center>모의 코딩 테스트</Center>
        </Center>
      </Box>
      <VStack w="44vw">
        {newCTPList.length > 0 ? (
          newCTPList.map((item, index) => (
            <Box mb="8px" mr="8px" key={index}>
              <ProblemItem problem={item} />
            </Box>
          ))
        ) : (
          <Center bg={bgcolor} borderRadius="12px" p="32px">
            ~ 목록이 없습니다 ~
          </Center>
        )}
      </VStack>
    </Box>
  );
};

export default CodingTestMain;
