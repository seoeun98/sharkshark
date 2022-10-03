import {
  chakra,
  Box,
  Button,
  Center,
  HStack,
  Image,
  VStack,
  shouldForwardProp,
  keyframes,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { createRivalAPI, deleteRivalAPI } from '../../../../api/auth/rival';
import CompareCard from './CompareCard';
import { motion, isValidMotionProp } from 'framer-motion';

const RivalCompareChart = () => {
  const userInfo = useSelector((state: any) => state.rivalAPIReducer.userInfo);
  const rivalInfo = useSelector((state: any) => state.rivalAPIReducer.rivalInfo);
  let Rectype = 'Registered';

  const animationKeyframes = keyframes`
  0% { transform: rotate(0);  }
  25% { transform: otate(0); }
  50% { transform: rotate(30deg);}
  75% { transform: rotate(30deg); }
  100% { transform: rotate(0); }
`;

  const animation = `${animationKeyframes} 2s ease-in-out infinite`;

  return (
    <Box>
      <VStack>
        <Box>
          <HStack spacing={24}>
            <CompareCard userInfo={userInfo} />
            <CompareCard userInfo={rivalInfo} />
          </HStack>
          <Center>
            <Box top="60vh" left="51vw" pos="absolute" as={motion.div} animation={animation}>
              <Image w="10vw" src="/assets/etc/rival_flash.svg" />
            </Box>
          </Center>
        </Box>

        <Center mt="-30px" w="360px" z-index={1}>
          {Rectype === 'nonRegistered' ? (
            <Button
              py="16px"
              border="0px"
              variant="secondary"
              size="csm"
              borderRadius="36px"
              fontSize="14px"
              fontWeight="800"
              bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
              bgClip="text"
              boxShadow="base"
              onClick={() => createRivalAPI(userInfo.userId)}
            >
              라이벌 등록
            </Button>
          ) : (
            <Button
              py="16px"
              border="0px"
              size="cmd"
              borderRadius="36px"
              boxShadow="base"
              onClick={() => deleteRivalAPI(userInfo.userId)}
            >
              라이벌 해지
            </Button>
          )}
        </Center>
      </VStack>

      <Image
        z-index={-1}
        w="160vh"
        pos="absolute"
        bottom={-20}
        src="/assets/etc/rival_analysis.svg"
      />
    </Box>
  );
};

export default RivalCompareChart;
