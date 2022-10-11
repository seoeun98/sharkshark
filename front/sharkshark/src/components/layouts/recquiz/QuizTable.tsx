import { Box, Button, Center, Flex, useColorModeValue } from '@chakra-ui/react';
import { Problem } from '../../../types/DataTypes';
import { QuizTableItem } from './QuizTableItem';

export const QuizTable = (probs: { list: Problem[] }) => {
  const { list } = probs;
  const bgcolor = useColorModeValue('neutral.25', 'neutral.500');

  return (
    <Box>
      <Box p="8px" bg={useColorModeValue('neutral.50', 'neutral.800')} borderRadius="10px">
        <Flex>
          {/* star */}
          <Box w="24px" ml="24px" />
          {/* level */}
          <Box ml="16px">레벨</Box>
          {/* id */}
          <Box ml="16px">ID</Box>
          {/* title */}
          <Box ml="16px">제목</Box>
        </Flex>
      </Box>
      <Box
        h="400px"
        my="8px"
        overflow="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-track': {
            background: useColorModeValue('#CBCDD6', '#18181A'),
            borderRadius: '12px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(0deg, #997BED 0%, #4AE2DE 100%)',
            borderRadius: '12px',
          },
        }}
      >
        {list.length > 0 ? (
          list.map((item, index) => (
            <Box mb="8px" mr="8px" key={index}>
              <QuizTableItem problem={item} />
            </Box>
          ))
        ) : (
          <Center bg={bgcolor} borderRadius="12px" p="32px">
            ~ 목록이 없습니다 ~
          </Center>
        )}
      </Box>
    </Box>
  );
};
