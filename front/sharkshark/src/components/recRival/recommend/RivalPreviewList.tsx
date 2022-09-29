import { Box, Divider, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { RivalPreviewCard } from '../common/RivalPreviewCard';

const RivalPreviewList = () => {
  const testdata = [
    { id: 'id', className: 'Class 4', level: 18 },
    { id: 'dddddd', className: 'Class 3', level: 18 },
    { id: 'isfsfsd', className: 'Class 44', level: 18 },
    { id: 'isfddf', className: 'Class 4', level: 18 },
    { id: 'idsffd', className: 'Class 4', level: 18 },
    { id: 'id', className: 'Class 4', level: 18 },
    { id: 'id', className: 'Class 4', level: 18 },
  ];
  const bg = useColorModeValue('neutral.0', 'neutral.500');

  return (
    <Box
      ml="1vw"
      mr="1vw"
      h="60vh"
      bg={bg}
      borderRadius="10px"
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
      <Box>
        {testdata.map((item, index) => (
          <Box m="12px" mr="8px" key={index}>
            {index !== 0 ? <Divider /> : <></>}

            <RivalPreviewCard userInfo={item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RivalPreviewList;
