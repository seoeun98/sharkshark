import { Box, Button, HStack, useColorModeValue } from '@chakra-ui/react';
import { getUserID } from '../../../api/common';
import { ColorText } from '../../common/ColorText';
import { RivalList } from './RivalList';

export const RivalListDefault = (props: { topPropFunction: (arg0: string) => void }) => {
  const titlefw = useColorModeValue(700, 500);
  const subtitleColor = useColorModeValue('neutral.700', 'neutral.50');
  const subtitlefw = useColorModeValue(500, 300);

  const highFunction = (text: any) => {
    console.log(text);
    let sendText = text;
    if (text === 'RivalCompare') {
      sendText = 'RivalCompareForRegistered';
    }
    // eslint-disable-next-line react/destructuring-assignment
    props.topPropFunction(sendText);
  };

  return (
    <>
      <HStack justifyContent="space-between">
        <HStack fontSize="24px" fontWeight={titlefw} marginBottom="2vh">
          <ColorText>{getUserID()}</ColorText>
          <Box>님의 라이벌 목록</Box>
        </HStack>
        <Button
          variant="secondary"
          size="csm"
          borderRadius="10px"
          onClick={() => (window.location.href = '/data/chart')}
        >
          <ColorText>라이벌 실력 분석 통계</ColorText>
        </Button>
      </HStack>

      <Box fontSize="14px" mb="6vh" fontWeight={subtitlefw} color={subtitleColor}>
        {getUserID()} 님이 라이벌로 지정한 사용자 목록입니다. <br />
        자유롭게 라이벌을 지정하고 관리해보세요.
      </Box>
      <Box>
        <RivalList middlePropFunction={highFunction} />
      </Box>
    </>
  );
};
