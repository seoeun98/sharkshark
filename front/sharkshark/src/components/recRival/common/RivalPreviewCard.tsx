import { Box, useColorModeValue, Flex, Center, HStack, Button } from '@chakra-ui/react';
import { rival } from '../../../types/DataTypes';
import { BasicInfoLayout } from './BasicInfoLayout';

export const RivalPreviewCard = (props: {
  RivalInfo: rival;
  bottompropFunction: (arg0: string) => void;
}) => {
  const { RivalInfo, bottompropFunction } = props;
  return (
    <Box>
      <Box py="18px">
        <Flex justifyContent="space-between" alignItems="center" mx={10}>
          <HStack>
            <BasicInfoLayout
              typeName="rivalSmall"
              level={RivalInfo.tier}
              userClass={RivalInfo.userClass}
              id={RivalInfo.userId}
            />
          </HStack>
          <Center bg={useColorModeValue('white', 'black')} w="100px" h="40px" borderRadius="8px">
            <Button
              py="12px"
              px="24px"
              variant="secondary"
              size="md"
              borderRadius="8px"
              fontSize="13px"
              fontWeight="800"
              bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
              bgClip="text"
              boxShadow="base"
              onClick={() => bottompropFunction('RivalCompareForRegistered')}
            >
              실력 분석
            </Button>
          </Center>
        </Flex>
      </Box>
    </Box>
  );
};
