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
import { Key, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTproblem } from '../../../types/DataTypes';
import ProblemItem from './Item/ProblemItem';
// import Timer from './Item/Timer';
import { setCompStatus, setSolvingStatus, setStarttime } from '../../../reducers/CTReducer';
import { ColorText } from '../../common/ColorText';
import Wave from 'react-wavify';
import styled from '@emotion/styled';

const WaveContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: 0vh;
  border-radius: 10px;
  overflow: hidden;
`;

const CodingTestMain = () => {
  const dispatch = useDispatch();
  const CTPList = useSelector((state: any) => state.CTReducer.CTPList);
  const CTstatus = useSelector((state: any) => state.CTReducer.solvingStatus);
  const allsolved = useSelector((state: any) => state.CTReducer.allsolved);
  const solvedList = useSelector((state: any) => state.CTReducer.solvedList);
  const CTtimer = useSelector((state: any) => state.CTReducer.CTtimer);
  const compStatus = useSelector((state: any) => state.CTReducer.compStatus);

  const [hour, setHour] = useState(Math.floor(CTtimer / 60));
  const [minute, setMinute] = useState(CTtimer - Math.floor(CTtimer / 60) * 60);

  if (hour === 0 && minute === 0 && compStatus === 1) {
    setHour(Math.floor(CTtimer / 60));
    setMinute(CTtimer - Math.floor(CTtimer / 60) * 60);
  }
  const [hours, setHours] = useState(hour);
  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(0);
  const [remainTime, setremainTime] = useState(CTtimer);

  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let hhours = today.getHours(); // 시
  let mminutes = today.getMinutes(); // 분
  let sseconds = today.getSeconds(); // 초

  // assets & style
  const sharkjoonImage = useColorModeValue(
    '/assets/logo/sharkjoon_light_logo.png',
    '/assets/logo/sharkjoon_logo.png',
  );
  const bgcolor = useColorModeValue('neutral.25', 'neutral.500');
  const modalBg = useColorModeValue('neutral.0', 'neutral.500');
  const bg2 = useColorModeValue('neutral.0', 'neutral.800');
  const bg = useColorModeValue('white', 'neutral.800');
  const fontWeight = useColorModeValue(600, 400);

  const startCodeTEST = () => {
    dispatch(setSolvingStatus('start'));
    dispatch(setStarttime(`${year}-${month}-${date} ${hhours}:${mminutes}-${sseconds}`));
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  const closeCodeTest = async () => {
    onOpen();
    if (allsolved === true) {
      dispatch(setSolvingStatus('end'));
      dispatch(setCompStatus(2));
      onClose();
    }
  };

  const goNext = async () => {
    if (solvedList.length > 0) {
      dispatch(setSolvingStatus('end'));
      dispatch(setCompStatus(2));
    } else {
      dispatch(setSolvingStatus('end'));

      // 테스트 위해 잠시 추가
      dispatch(setCompStatus(2));

      // 테스트 위해 잠시 주석
      // window.location.href = '/home';
    }
    onClose();
  };

  const keepGoing = () => {
    dispatch(setSolvingStatus('start'));
    onClose();
  };

  useEffect(() => {
    if (CTstatus === 'start') {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(countdown);
            if (hours === 0) {
              clearInterval(countdown);
            } else {
              setHours(hours - 1);
              setMinutes(59);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
        setremainTime(hours * 60 + minutes);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setHours(hour);
      setMinutes(minute);
      setSeconds(0);
    }
  }, [CTstatus, CTtimer, hour, hours, minute, minutes, remainTime, seconds]);

  if (CTstatus === 'start' && hours === 0 && minutes === 0 && seconds === 0) {
    dispatch(setSolvingStatus('end'));
  }

  if (CTstatus === 'start' && hours === 0 && minutes === 0 && seconds === 0) {
    dispatch(setSolvingStatus('end'));
  }

  let remainHeight = (CTtimer - remainTime) * (160 / CTtimer);

  return (
    <Center>
      <VStack w="50vw" spacing={10}>
        {' '}
        <Box borderRadius="10px">
          <Center bg={bg2} w="50vw" h="4vh" shadow="lg" borderTopRadius="10px">
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
        {/* 타이머 */}
        <VStack
          w="32vw"
          h="16vh"
          bg={bgcolor}
          bgGradient={CTstatus === '' ? 'linear(to-r, #1B3E44, #2C2947)' : ''}
          borderRadius="10px"
          position="relative"
        >
          {CTstatus === '' ? (
            <Box m="-0.5" />
          ) : (
            <WaveContainer>
              <Wave
                fill="url(#gradient)"
                paused={false}
                opacity="0.30"
                options={{
                  height: remainHeight,
                  amplitude: 20,
                  speed: 0.4,
                  points: 6,
                }}
              >
                <defs>
                  <linearGradient id="gradient">
                    <stop offset="10%" stopColor="rgba(153, 123, 237, 0.8)" />
                    <stop offset="90%" stopColor="rgba(157, 236, 249, 0.8)" />
                  </linearGradient>
                </defs>
              </Wave>
            </WaveContainer>
          )}

          <VStack spacing={6}>
            <Center
              borderRadius="4px"
              w="140px"
              h="40px"
              bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
              color="white"
              fontWeight="600"
              mt="-3vh"
            >
              {CTstatus === '' ? '제한 시간' : '남은 시간'}
            </Center>
            <HStack spacing={5}>
              <Center w="72px" h="80px" bg="white" borderRadius="10px">
                <VStack fontSize="36px" fontWeight="800" spacing={0}>
                  <ColorText> {hours < 10 ? `0${hours}` : hours}</ColorText>
                  <Box color="primary.purple0" fontWeight="700" fontSize="12px">
                    HOURS
                  </Box>
                </VStack>
              </Center>
              <Center w="72px" h="80px" bg="white" borderRadius="10px">
                <VStack fontSize="36px" fontWeight="800" spacing={0}>
                  <ColorText> {minutes < 10 ? `0${minutes}` : minutes}</ColorText>
                  <Box color="primary.purple0" fontWeight="700" fontSize="12px">
                    MINUTES
                  </Box>
                </VStack>
              </Center>
              <Center w="72px" h="80px" bg="white" borderRadius="10px">
                <VStack fontSize="36px" fontWeight="800" spacing={0}>
                  <ColorText>{seconds < 10 ? `0${seconds}` : seconds}</ColorText>
                  <Box color="primary.purple0" fontWeight="700" fontSize="12px">
                    SECONDS
                  </Box>
                </VStack>
              </Center>
            </HStack>
          </VStack>
        </VStack>
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
