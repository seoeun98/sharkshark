import { Box, Button, HStack, useColorModeValue } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { getUserID } from '../../../../api/common';
import { ColorText } from '../../../common/ColorText';
import { RivalList } from './RivalList';

import { setAnalysisCompStatus } from '../../../../reducers/CTReducer';
import { Link } from 'react-router-dom';

export const RivalListDefault = () => {
  const titlefw = useColorModeValue(700, 500);
  const subtitleColor = useColorModeValue('neutral.700', 'neutral.50');
  const subtitlefw = useColorModeValue(500, 300);

  const dispatch = useDispatch();

  const movePage = async () => {
    dispatch(setAnalysisCompStatus(2));
  };

  return (
    <>
      <HStack justifyContent="space-between">
        <HStack fontSize="24px" fontWeight={titlefw} marginBottom="2vh">
          <ColorText>{getUserID()}</ColorText>
          <Box>님의 라이벌 목록</Box>
        </HStack>
        {/* <Button variant="secondary" size="csm" borderRadius="10px" onClick={movePage}>
          <Link to="/data/chart">
            <ColorText>유사 사용자 분석 통계</ColorText>
          </Link>
        </Button> */}
      </HStack>

      <Box fontSize="14px" mb="6vh" fontWeight={subtitlefw} color={subtitleColor}>
        {getUserID()} 님이 라이벌로 지정한 사용자 목록입니다. <br />
        자유롭게 라이벌을 지정하고 관리해보세요.
      </Box>
      <Box>
        <RivalList />
      </Box>
    </>
  );
};
