import {
  Box,
  useColorModeValue,
  Collapse,
  Flex,
  Spacer,
  Tag,
  Text,
  useDisclosure,
  Center,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react';
import { ColorText } from '../../common/ColorText';
import { BasicInfoLayout } from './BasicInfoLayout';
import { getUserID } from '../../../api/common';

export const RivalLongCard = (props: {
  userInfo: any;
  bottompropFunction: (arg0: string) => void;
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const { userInfo } = props;
  let children = {};
  if (isOpen) {
    children = { bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)' };
  } else {
    children = { bgGradient: '' };
  }

  return (
    <Box
      bg={useColorModeValue('neutral.0', 'neutral.500')}
      {...children}
      borderRadius="10px"
      _hover={{
        bgGradient: 'linear(to-r, #7B67BB, #4BA6B2)',
        boxShadow: 'dark-lg',
      }}
    >
      <Box px="8px" py="18px" onClick={onToggle}>
        <Flex justifyContent="space-between" alignItems="center" mx={10}>
          <HStack>
            <BasicInfoLayout
              typeName="rivalSmall"
              level={17}
              classCount="Class 4"
              id={getUserID()}
            />
          </HStack>
          <Center bg={useColorModeValue('white', 'black')} w="100px" h="40px" borderRadius="36px">
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
            >
              라이벌 등록
            </Button>
          </Center>
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
                    해결한 문제 수
                  </Text>
                  <Box fontSize="16px" fontWeight="800">
                    <ColorText>271</ColorText>
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
                      <ColorText>7129</ColorText>
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
                    상위 100제 난이도 합
                  </Text>
                  <Box fontSize="16px" fontWeight="800">
                    <ColorText>1165</ColorText>
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
              onClick={() => props.bottompropFunction('RivalCompare')}
            >
              실력 분석
            </Button>
          </VStack>
        </Center>
      </Collapse>
    </Box>
  );
};
