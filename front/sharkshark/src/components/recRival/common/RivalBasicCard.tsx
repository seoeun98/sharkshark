import {
  Center,
  HStack,
  VStack,
  useColorModeValue,
  Box,
  Text,
  Button,
  useDisclosure,
  Collapse,
  Spacer,
  Flex,
} from '@chakra-ui/react';
import { ColorText } from '../../common/ColorText';
import { BasicInfoLayout } from './BasicInfoLayout';

export const RivalBasicCard = (props: {
  RivalInfo: any;
  bottompropFunction: (arg0: string) => void;
}) => {
  const { RivalInfo } = props;
  const { isOpen, onToggle } = useDisclosure();
  let children = {};
  if (isOpen) {
    children = { bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)' };
  } else {
    children = { bgGradient: '' };
  }

  return (
    <Box>
      <Box
        w="360px"
        borderRadius="10px"
        bg={useColorModeValue('#F1F3F5', 'neutral.500')}
        {...children}
        _hover={{
          bgGradient: 'linear(to-r, #7B67BB, #4BA6B2)',
          boxShadow: 'dark-lg',
        }}
      >
        <Box>
          <VStack spacing={6} onClick={onToggle}>
            {!isOpen ? (
              <HStack mt="30px" mb="50px">
                <BasicInfoLayout
                  typeName="rival"
                  level={RivalInfo.level}
                  classCount={RivalInfo.className}
                  id={RivalInfo.id}
                />
              </HStack>
            ) : (
              <HStack mt="30px">
                <BasicInfoLayout
                  typeName="rival"
                  level={RivalInfo.level}
                  classCount={RivalInfo.className}
                  id={RivalInfo.id}
                />
              </HStack>
            )}

            <Collapse in={isOpen} animateOpacity={false}>
              <Box
                p="16px"
                bg={useColorModeValue('neutral.50', 'neutral.800')}
                w="360px"
                boxShadow="inset 0 5px 5px rgba(0,0,0,.3)"
                mb="32px"
              >
                <Center ml="240px" mb="12px">
                  <Button
                    variant="primary"
                    w="72px"
                    size="xs"
                    borderRadius="4px"
                    // eslint-disable-next-line react/destructuring-assignment
                    onClick={() => props.bottompropFunction('RivalCompare')}
                  >
                    실력 분석
                  </Button>
                </Center>

                <Flex>
                  <Spacer />
                  {/* solvedCount */}
                  <Center
                    mx="8px"
                    bg={useColorModeValue('white', 'black')}
                    borderRadius="10px"
                    p="12px"
                    w="6vw"
                  >
                    <VStack spacing={1}>
                      <Text
                        fontSize="14px"
                        fontWeight="600"
                        color={useColorModeValue('neutral.700', 'neutral.50')}
                      >
                        해결한
                        <br />
                        문제 수
                      </Text>
                      <Box fontSize="18px" fontWeight="800">
                        <ColorText>271</ColorText>
                      </Box>
                    </VStack>
                  </Center>

                  {/* rank*/}
                  <Center
                    mx="8px"
                    bg={useColorModeValue('white', 'black')}
                    borderRadius="10px"
                    p="12px"
                    w="6vw"
                  >
                    <VStack spacing={1}>
                      <Text
                        fontSize="14px"
                        fontWeight="600"
                        color={useColorModeValue('neutral.700', 'neutral.50')}
                        textAlign="center"
                      >
                        랭크
                      </Text>
                      <VStack spacing={0}>
                        <Text
                          fontSize="10px"
                          fontWeight="600"
                          color={useColorModeValue('neutral.700', 'neutral.50')}
                          textAlign="center"
                        >
                          상위 %%
                        </Text>
                        <Box fontSize="18px" fontWeight="800">
                          <ColorText>7129</ColorText>
                        </Box>
                      </VStack>
                    </VStack>
                  </Center>

                  {/* ? */}
                  <Center
                    mx="8px"
                    bg={useColorModeValue('white', 'black')}
                    borderRadius="10px"
                    p="12px"
                    w="6vw"
                  >
                    <VStack spacing={1}>
                      <Text
                        fontSize="14px"
                        fontWeight="600"
                        color={useColorModeValue('neutral.700', 'neutral.50')}
                        textAlign="center"
                      >
                        상위 100제
                        <br />
                        난이도 합
                      </Text>
                      <Box fontSize="18px" fontWeight="800">
                        <ColorText>1165</ColorText>
                      </Box>
                    </VStack>
                  </Center>

                  <Spacer />
                </Flex>
              </Box>
            </Collapse>
          </VStack>
        </Box>
      </Box>
      <Center mt="-30px" w="360px">
        <Box bg={useColorModeValue('white', 'black')} w="128px" borderRadius="36px">
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
          >
            라이벌 해지
          </Button>
        </Box>
      </Center>
    </Box>
  );
};
