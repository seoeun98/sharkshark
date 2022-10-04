import { Box, Center, HStack, useColorModeValue, VStack, Text, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ColorText } from '../../../common/ColorText';
import Wave from 'react-wavify';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { setSolvingStatus, setTimer } from '../../../../reducers/CTReducer';

const WaveContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: 0vh;
  border-radius: 10px;
  overflow: hidden;
`;
const Timer = () => {
  const CTtimer = useSelector((state: any) => state.CTReducer.CTtimer);
  const [hours, setHours] = useState(Math.floor(CTtimer / 60));
  const [minutes, setMinutes] = useState(CTtimer - Math.floor(CTtimer / 60) * 60);
  const [seconds, setSeconds] = useState(0);
  const [remainTime, setremainTime] = useState(CTtimer);
  const CTstatus = useSelector((state: any) => state.CTReducer.solvingStatus);

  const dispatch = useDispatch();

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
        setremainTime(remainTime - 1 / 60);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [CTstatus, CTtimer, hours, minutes, seconds]);

  if (CTstatus === 'start' && hours === 0 && minutes === 0 && seconds === 0) {
    dispatch(setSolvingStatus('end'));
  }

  let remainHeight = (CTtimer - remainTime) * (160 / CTtimer);

  return (
    <VStack
      w="32vw"
      h="20vh"
      bg={useColorModeValue('neutral.25', 'neutral.500')}
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
  );
};

export default Timer;
