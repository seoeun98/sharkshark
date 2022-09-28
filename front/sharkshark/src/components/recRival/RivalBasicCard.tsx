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
import { RivalInfo } from '../../types/DataTypes';
import { ColorText } from '../common/ColorText';
import { Tier } from '../common/Tier';
import { mode } from '@chakra-ui/theme-tools';

export const RivalBasicCard = (props: { RivalInfo: RivalInfo }) => {
  const { RivalInfo } = props;
  const { isOpen, onToggle } = useDisclosure();
  const bgCondition = useColorModeValue('white', 'black');
  let children = {};
  if (isOpen) {
    children = { bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)' };
  } else {
    children = { bgGradient: '' };
  }

  return (
    <Box>
      <Box
        w="20vw"
        borderRadius="10px"
        bg={useColorModeValue('#F1F3F5', 'neutral.500')}
        {...children}
      >
        <Box onClick={onToggle}>
          <VStack spacing={6}>
            {!isOpen ? (
              <HStack mt="30px" mb="50px">
                {/* level */}
                <Box w="30px" mr="10px">
                  <Tier level={RivalInfo.level} size="auto" />
                </Box>
                <VStack alignItems="flex-start" spacing={0}>
                  {/* class */}
                  <Center bg={bgCondition} px="8px" py="2px" fontSize="8px" borderRadius="32px">
                    <ColorText>{RivalInfo.class}</ColorText>
                  </Center>
                  {/* userId */}
                  <Box fontSize="20px" fontWeight="700">
                    {RivalInfo.userId}
                  </Box>
                </VStack>
              </HStack>
            ) : (
              <HStack mt="30px">
                {/* level */}
                <Box w="30px" mr="10px">
                  <Tier level={RivalInfo.level} size="auto" />
                </Box>
                <VStack alignItems="flex-start" spacing={0}>
                  {/* class */}
                  <Center bg={bgCondition} px="8px" py="2px" fontSize="8px" borderRadius="32px">
                    <ColorText>{RivalInfo.class}</ColorText>
                  </Center>
                  {/* userId */}
                  <Box fontSize="20px" fontWeight="700">
                    {RivalInfo.userId}
                  </Box>
                </VStack>
              </HStack>
            )}

            <Collapse in={isOpen} animateOpacity={false}>
              <Box
                p="16px"
                bg={useColorModeValue('neutral.50', 'neutral.800')}
                w="20vw"
                boxShadow="inset 0 5px 5px rgba(0,0,0,.3)"
                mb="32px"
              >
                <Center ml="13vw" mb="12px">
                  <Button variant="primary" size="xs" borderRadius="4px">
                    실력 비교
                  </Button>
                </Center>

                <Flex>
                  <Spacer />
                  {/* solved */}
                  <Center
                    mx="8px"
                    bg={useColorModeValue('white', 'black')}
                    borderRadius="10px"
                    p="12px"
                    w="6vw"
                  >
                    <VStack spacing={1}>
                      <Text fontSize="14px" color="neutral.50">
                        해결한
                        <br />
                        문제 수
                      </Text>
                      <Box fontSize="18px" fontWeight="800">
                        <ColorText>271</ColorText>
                      </Box>
                    </VStack>
                  </Center>

                  {/* average tries */}
                  <Center
                    mx="8px"
                    bg={useColorModeValue('white', 'black')}
                    borderRadius="10px"
                    p="12px"
                    w="6vw"
                  >
                    <VStack spacing={1}>
                      <Text fontSize="14px" color="neutral.50" textAlign="center">
                        랭크
                      </Text>
                      <VStack spacing={0}>
                        <Text fontSize="10px" color="neutral.50" textAlign="center">
                          상위 %%
                        </Text>
                        <Box fontSize="18px" fontWeight="800">
                          <ColorText>7129</ColorText>
                        </Box>
                      </VStack>
                    </VStack>
                  </Center>

                  {/* average tries */}
                  <Center
                    mx="8px"
                    bg={useColorModeValue('white', 'black')}
                    borderRadius="10px"
                    p="12px"
                    w="6vw"
                  >
                    <VStack spacing={1}>
                      <Text fontSize="14px" color="neutral.50" textAlign="center">
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
      <Center mt="-30px">
        <Box bg={useColorModeValue('neutral.500', '#F1F3F5')} w="128px" borderRadius="36px">
          <Button
            border="0px"
            variant="secondary"
            size="csm"
            borderRadius="36px"
            fontSize="14px"
            fontWeight="800"
            bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
            bgClip="text"
          >
            라이벌 해지
          </Button>
        </Box>
      </Center>
    </Box>
  );
};
