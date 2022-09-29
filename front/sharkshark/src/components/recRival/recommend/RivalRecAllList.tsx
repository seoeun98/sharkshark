import { Box, useColorModeValue } from '@chakra-ui/react';
import { RivalLongCard } from '../common/RivalLongCard';

const RivalAllList = () => {
  const titlefw = useColorModeValue(700, 500);
  const testdata = [
    { id: 'id', className: 'Class 4', level: 18 },
    { id: 'dddddd', className: 'Class 3', level: 18 },
    { id: 'isfsfsd', className: 'Class 44', level: 18 },
    { id: 'isfddf', className: 'Class 4', level: 18 },
    { id: 'idsffd', className: 'Class 4', level: 18 },
    { id: 'id', className: 'Class 4', level: 18 },
    { id: 'id', className: 'Class 4', level: 18 },
  ];
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
        {testdata.map((item, index) => (
          <Box mb="8px" mr="8px" key={index}>
            <RivalLongCard userInfo={item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RivalAllList;
