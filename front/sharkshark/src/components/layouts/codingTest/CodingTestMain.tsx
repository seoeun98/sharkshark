import { Box, Center, useColorModeValue, Image, VStack, Button } from '@chakra-ui/react';
import { Key, useState } from 'react';
import { useSelector } from 'react-redux';
import { CTproblem } from '../../../types/DataTypes';
import ProblemItem from './Item/ProblemItem';
import Timer from './Item/Timer';

const CodingTestMain = () => {
  const CTPList = useSelector((state: any) => state.CTReducer.CTPList);
  const CTtimer = useSelector((state: any) => state.CTReducer.CTtimer);
  const CTstatus = useSelector((state: any) => state.CTReducer.solvingStatus);

  const [time, setTime] = useState(CTtimer);
  const [status, setCTstatus] = useState(CTstatus);

  // assets & style
  const sharkjoonImage = useColorModeValue(
    '/assets/logo/sharkjoon_light_logo.png',
    '/assets/logo/sharkjoon_logo.png',
  );
  const bgcolor = useColorModeValue('neutral.25', 'neutral.500');

  return (
    <Center>
      <VStack w="50vw" spacing={10}>
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
        <VStack spacing={4}>
          {CTPList.length > 0 ? (
            CTPList.map((item: CTproblem, index: Key | null | undefined) => (
              <Box key={index}>
                <ProblemItem problem={item} problemIndex={index} />
              </Box>
            ))
          ) : (
            <Center bg={bgcolor} w="48vw" h="8vh" borderRadius="12px" p="32px">
              ~ 목록이 없습니다 ~
            </Center>
          )}
        </VStack>
        <Timer hh={Math.floor(time / 60)} mm={time - Math.floor(time / 60) * 60} ss={0} />
        <Button size="cxl">시작</Button>
      </VStack>
    </Center>
  );
};

export default CodingTestMain;
