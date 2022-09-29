import { Box, useColorModeValue, Flex, Center, HStack, Button } from '@chakra-ui/react';
import { BasicInfoLayout } from './BasicInfoLayout';
import { getUserID } from '../../../api/common';

export const RivalPreviewCard = (props: { userInfo: any }) => {
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
          <Center bg={useColorModeValue('white', 'black')} borderRadius="8px">
            <Button
              variant="secondary"
              size="sm"
              fontSize="14px"
              borderRadius="8px"
              fontWeight="800"
              bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
              bgClip="text"
              boxShadow="base"
            >
              실력 분석
            </Button>
          </Center>
        </Flex>
      </Box>
    </Box>
  );
};
