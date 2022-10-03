import {
  Box,
  useColorModeValue,
  Collapse,
  Flex,
  Text,
  useDisclosure,
  Center,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { createRivalAPI } from '../../../../api/auth/rival';
import {
  setClickedRivalId,
  setCompStatus,
  setRivalInfo,
} from '../../../../reducers/rivalAPIReducer';
import { rival } from '../../../../types/DataTypes';
import { ColorText } from '../../../common/ColorText';
import { BasicInfoLayout } from './BasicInfoLayout';

export const RivalLongCard = (props: { RivalInfo: rival }) => {
  const dispatch = useDispatch();
  const { RivalInfo } = props;
  const { isOpen, onToggle } = useDisclosure();
  const bgcolor = useColorModeValue('neutral.25', 'neutral.500');

  return (
    <Box
      bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
      bg={isOpen ? '' : bgcolor}
      borderRadius="10px"
      _hover={{
        bg: '',
        bgGradient: 'linear(to-r, #7B67BB, #4BA6B2)',
        boxShadow: 'dark-lg',
      }}
    >
      <Box px="8px" py="18px" onClick={onToggle}>
        <Flex justifyContent="space-between" alignItems="center" mx={10}>
          <HStack>
            <BasicInfoLayout
              typeName="rivalSmall"
              level={RivalInfo.tier}
              userClass={RivalInfo.userClass}
              id={RivalInfo.userId}
            />
          </HStack>
          <Flex bg={useColorModeValue('white', 'black')} w="100px" h="40px" borderRadius="36px">
            <Button
              py="12px"
              px="24px"
              variant="secondary"
              size="md"
              borderRadius="36px"
              fontSize="13px"
              fontWeight="800"
              bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
              bgClip="text"
              boxShadow="base"
              onClick={() => createRivalAPI(RivalInfo.userId)}
            >
              라이벌 등록
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Collapse in={isOpen} animateOpacity={false}>
        <Center
          p="16px"
          bg={useColorModeValue('neutral.50', 'neutral.800')}
          borderBottomRadius="10px"
          boxShadow="inset 0 5px 5px rgba(0,0,0,.3)"
        >
          <VStack spacing={3}>
            <HStack spacing={6}>
              {/* solvedCount */}
              <Center bg={useColorModeValue('white', 'black')} borderRadius="10px" p="8px" w="8vw">
                <VStack spacing={1}>
                  <Text
                    fontSize="12px"
                    fontWeight="600"
                    color={useColorModeValue('neutral.700', 'neutral.50')}
                  >
                    해결한 문제
                  </Text>
                  <Box fontSize="16px" fontWeight="800">
                    <ColorText>{RivalInfo.solvedCount}</ColorText>
                  </Box>
                </VStack>
              </Center>

              {/* rank*/}
              <Center bg={useColorModeValue('white', 'black')} borderRadius="10px" p="8px" w="8vw">
                <VStack spacing={1} justifyContent="right">
                  <Text
                    fontSize="12px"
                    fontWeight="600"
                    color={useColorModeValue('neutral.700', 'neutral.50')}
                    textAlign="center"
                  >
                    랭크
                  </Text>
                  <VStack spacing={0}>
                    <Box fontSize="16px" fontWeight="800">
                      <ColorText>{RivalInfo.rank}</ColorText>
                    </Box>
                  </VStack>
                </VStack>
              </Center>

              {/* ? */}
              <Center bg={useColorModeValue('white', 'black')} borderRadius="10px" p="8px" w="8vw">
                <VStack spacing={1}>
                  <Text
                    fontSize="12px"
                    fontWeight="600"
                    color={useColorModeValue('neutral.700', 'neutral.50')}
                    textAlign="center"
                  >
                    레이팅
                  </Text>
                  <Box fontSize="16px" fontWeight="800">
                    <ColorText>{RivalInfo.rating}</ColorText>
                  </Box>
                </VStack>
              </Center>
            </HStack>
            <Button
              variant="primary"
              w="90px"
              h="30px"
              size="xs"
              borderRadius="4px"
              // eslint-disable-next-line react/destructuring-assignment
              onClick={() => {
                dispatch(setClickedRivalId(RivalInfo.userId));
                dispatch(setCompStatus('RivalCompare'));
                dispatch(setRivalInfo(RivalInfo));
              }}
            >
              실력 분석
            </Button>
          </VStack>
        </Center>
      </Collapse>
    </Box>
  );
};
