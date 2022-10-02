import {
  Box,
  Center,
  useColorModeValue,
  Image,
  VStack,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { Key } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTproblem } from '../../../types/DataTypes';
import ProblemItem from './Item/ProblemItem';
import Timer from './Item/Timer';
import { setCompStatus, setSolvingStatus, setStarttime } from '../../../reducers/CTReducer';
import { ColorText } from '../../common/ColorText';
import { Link } from 'react-router-dom';

const CodingTestMain = () => {
  const dispatch = useDispatch();
  const CTPList = useSelector((state: any) => state.CTReducer.CTPList);
  const CTstatus = useSelector((state: any) => state.CTReducer.solvingStatus);
  const allsolved = useSelector((state: any) => state.CTReducer.allsolved);
  const solvedNum = useSelector((state: any) => state.CTReducer.solvedNum);
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분
  let seconds = today.getSeconds(); // 초

  // assets & style
  const sharkjoonImage = useColorModeValue(
    '/assets/logo/sharkjoon_light_logo.png',
    '/assets/logo/sharkjoon_logo.png',
  );
  const bgcolor = useColorModeValue('neutral.25', 'neutral.500');
  const modalBg = useColorModeValue('neutral.0', 'neutral.500');
  const bg = useColorModeValue('white', 'neutral.800');
  const fontWeight = useColorModeValue(600, 400);

  const startCodeTEST = () => {
    dispatch(setSolvingStatus('start'));
    dispatch(setStarttime(`${year}-${month}-${date} ${hours}:${minutes}-${seconds}`));
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  const closeCodeTest = async () => {
    onOpen();
    if (allsolved === true) {
      dispatch(setSolvingStatus('end'));
    } else if (solvedNum.length === 0) {
    } else {
    }
  };

  const goNext = async () => {
    if (solvedNum.length > 0) {
      dispatch(setCompStatus(2));
    } else {
      window.location.href = '/home';
    }
    dispatch(setSolvingStatus('close'));
    onClose();
  };

  const keepGoing = () => {
    dispatch(setSolvingStatus('start'));
    onClose();
  };

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
        <Timer />
        {CTstatus === 'start' ? (
          <Button size="cxl" onClick={closeCodeTest}>
            종료
          </Button>
        ) : (
          <Button size="cxl" onClick={startCodeTEST}>
            시작
          </Button>
        )}
      </VStack>
      {/* modal */}
      <Modal size="2xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(45deg)" />
        <ModalContent bg={modalBg}>
          <ModalCloseButton />
          <ModalBody textAlign="center" margin="32px" p={12}>
            <Center mb={8}>
              <Image src={sharkjoonImage} w="300px" />
            </Center>

            <Box fontSize="16px" my="10px" fontWeight={fontWeight} mb={10}>
              <Center>아직 문제를 푸는 중이시네요.</Center>
              <Box fontSize="18px" fontWeight="700">
                <ColorText>종료할까요?</ColorText>
              </Box>
              종료 시, 푼 문제에 한해서만 실력 분석이 제공됩니다.
            </Box>
            <Center>
              <HStack spacing={4}>
                <Button w="30px" onClick={keepGoing}>
                  계속 풀기
                </Button>
                <Button w="30px" size="cmd" onClick={goNext} variant="secondary" bg={bg}>
                  종료하기
                </Button>
              </HStack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default CodingTestMain;
