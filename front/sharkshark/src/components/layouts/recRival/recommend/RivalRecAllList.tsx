import { Box, Center, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { rival } from '../../../../types/DataTypes';
import { RivalLongCard } from '../common/RivalLongCard';

const RivalAllList = () => {
  const titlefw = useColorModeValue(700, 500);
  const bgcolor = useColorModeValue('neutral.25', 'neutral.500');
  const rivalRecList = useSelector((state: any) => state.rivalAPIReducer.rivalRecList);

  return (
    <Box w="40vw">
      <Box fontSize="24px" fontWeight={titlefw} mb="6vh">
        라이벌 추천 목록 모아보기
      </Box>
      <Box
        ml="1vw"
        mr="6vw"
        h="60vh"
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
        {rivalRecList.length > 0 ? (
          rivalRecList.map((item: rival, index: number) => (
            <Box mb="8px" mr="8px" key={index}>
              <RivalLongCard RivalInfo={item} />
            </Box>
          ))
        ) : (
          <Center bg={bgcolor} borderRadius="12px">
            ~ 목록이 없습니다 ~
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default RivalAllList;
