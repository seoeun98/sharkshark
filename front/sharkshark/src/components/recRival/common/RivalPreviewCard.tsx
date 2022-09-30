import { Box, useColorModeValue, Flex, Center, HStack, Button } from '@chakra-ui/react';
import { BasicInfoLayout } from './BasicInfoLayout';
import { getUserID } from '../../../api/common';

export const RivalPreviewCard = (props: {
  userInfo: any;
  bottompropFunction: (arg0: string) => void;
}) => {
  return (
    <Box>
      <Box py="18px">
        <Flex justifyContent="space-between" alignItems="center" mx={10}>
          <HStack>
            <BasicInfoLayout
              typeName="rivalSmall"
              level={17}
              classCount="Class 4"
              id={getUserID()}
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
              onClick={() => props.bottompropFunction('RivalCompareForRegistered')}
            >
              실력 분석
            </Button>
          </Center>
        </Flex>
      </Box>
    </Box>
  );
};
