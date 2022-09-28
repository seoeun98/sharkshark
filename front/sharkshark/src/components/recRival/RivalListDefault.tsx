import { Box, HStack, useColorModeValue } from '@chakra-ui/react';
import { getUserID } from '../../api/common';
import { ColorText } from '../common/ColorText';
import { RivalList } from './RivalList';

export const RivalListDefault = () => {
  const titlefw = useColorModeValue(700, 500);
  return (
    <>
      <HStack fontSize="24px" fontWeight={titlefw} marginBottom="3vh">
        <ColorText>{getUserID()}</ColorText>
        <Box>님의 라이벌 목록</Box>
      </HStack>
      <Box fontSize="14px" mb="4vh">
        {getUserID()} 님이 라이벌로 지정한 사용자 목록입니다. <br />
        자유롭게 라이벌을 지정하고 관리해보세요.
      </Box>
      <Box mt="6vh">
        <RivalList />
      </Box>
    </>
  );
};
