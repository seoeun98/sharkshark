import { useColorModeValue, Box, HStack, Button, Flex, Center } from '@chakra-ui/react';
import { CTproblem, solvedData } from '../../../../types/DataTypes';
import { ColorText } from '../../../common/ColorText';
import { useDispatch, useSelector } from 'react-redux';
import { getCTresultAPI } from '../../../../api/auth/codingTest';
import { useState } from 'react';
import { setAllSolved, setSolvedList, setSovledResultData } from '../../../../reducers/CTReducer';

const ProblemItem = (props: { problem: CTproblem; problemIndex: any }) => {
  const dispatch = useDispatch();
  const { problem, problemIndex } = props;
  const CTstatus = useSelector((state: any) => state.CTReducer.solvingStatus);
  const startime = useSelector((state: any) => state.CTReducer.startime);
  const problemNum = useSelector((state: any) => state.CTReducer.problemNum);
  const solvedList = useSelector((state: any) => state.CTReducer.solvedList);
  const sovledResultData = useSelector((state: any) => state.CTReducer.sovledResultData);
  const bg = useColorModeValue('white', 'neutral.800');
  const bgGradient = useColorModeValue(
    'linear(to-r, #A6CEE0, #9D97C7)',
    'linear(to-r, #395A69, #49446C)',
  );

  const [problemSovled, setProblemSolved] = useState(false);
  const [resolvingAlert, setresolvingAlert] = useState(false);

  // eslint-disable-next-line no-unused-vars
  let CTsolvedData: solvedData = {
    solved: false,
    probNo: 0,
  };

  const submitCheck = async () => {
    CTsolvedData = await getCTresultAPI(problem.no, startime);

    // 풀었을 때
    if (CTsolvedData.solved === true) {
      setresolvingAlert(false);
      setProblemSolved(true);

      dispatch(setSolvedList([...solvedList, problem]));
      dispatch(setSovledResultData([...sovledResultData, CTsolvedData]));

      // 문제 다 풀었을 때
      if (solvedList.length === problemNum) {
        dispatch(setAllSolved(true));
      }
    } else {
      // 못 풀었을 때
      setProblemSolved(false);
      setresolvingAlert(true);

      // 임시로 해둠
      // dispatch(setSolvedList([...solvedList, problem]));
      // dispatch(setSovledResultData([...sovledResultData, CTsolvedData]));
      // console.log(solvedList);
      // console.log(sovledResultData);
    }
  };

  const resolving = async () => {
    setProblemSolved(false);
  };

  return (
    <>
      <HStack
        w="48vw"
        h="8vh"
        bg={useColorModeValue('neutral.0', 'neutral.500')}
        borderRadius="10px"
      >
        <Box
          w="4vw"
          h="8vh"
          bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
          borderLeftRadius="10px"
        />
        <Box w="40vw">
          <Flex justifyContent="space-between" alignItems="center">
            <HStack spacing={4} ml="1vw">
              <Box fontSize="18px">
                <ColorText>문제 {problemIndex + 1}</ColorText>
              </Box>
              {/* title */}
              <Box
                fontSize="16px"
                fontWeight="600"
                color={useColorModeValue('neutral.300', 'white')}
              >
                {problem.title}
              </Box>
              {CTstatus !== '' ? (
                // 해결 여부에 따라 분기 처리 (제출 완료 누르면 api 호출)
                <Box bg={bg} fontSize="14px" px="12px" py="4px" borderRadius="16px">
                  <ColorText>{problemSovled === true ? '해결' : '미해결'}</ColorText>
                </Box>
              ) : null}{' '}
            </HStack>
            <HStack spacing={4}>
              {CTstatus === 'start' && problemSovled === false ? (
                <>
                  <Button
                    size="cxs"
                    onClick={() =>
                      window.open(`https://www.acmicpc.net/problem/${problem.no}`, '_blank')
                    }
                  >
                    문제 풀기
                  </Button>
                  <Button
                    size="cxs"
                    variant="secondary"
                    bg={bg}
                    borderColor={bg}
                    onClick={submitCheck}
                  >
                    제출 완료
                  </Button>
                </>
              ) : CTstatus === 'start' && problemSovled === true ? (
                <Button
                  size="cxs"
                  variant="secondary"
                  bgGradient={bgGradient}
                  color="white"
                  onClick={resolving}
                >
                  문제 다시 풀기
                </Button>
              ) : null}
            </HStack>
          </Flex>
        </Box>
      </HStack>
      <Center color="warning.50" fontSize="14px" mt={2}>
        {resolvingAlert === true
          ? '문제 풀이 여부가 확인되지 않습니다. 문제를 풀고 제출 완료를 눌러주세요.'
          : null}
      </Center>
    </>
  );
};

export default ProblemItem;
