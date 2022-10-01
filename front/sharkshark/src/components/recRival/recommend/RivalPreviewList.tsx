import { Box, Divider, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getRivalAPI } from '../../../api/rival';
import { rival } from '../../../types/DataTypes';
import { RivalPreviewCard } from '../common/RivalPreviewCard';
import NonRival from '../setting/NonRival';

const RivalPreviewList = (props: { middlePropFunction: (arg0: string) => void }) => {
  const [rivalList, setrivalList] = useState<rival[]>([]);

  const fetchRivalList = async () => {
    setrivalList(await getRivalAPI());
  };

  useEffect(() => {
    fetchRivalList();
  }, []);

  const bg = useColorModeValue('neutral.0', 'neutral.500');

  const middleFunction = (text: any) => {
    console.log(text);
    // eslint-disable-next-line react/destructuring-assignment
    props.middlePropFunction(text);
  };

  return (
    <Box
      ml="1vw"
      mr="1vw"
      maxH="60vh"
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
        {rivalList.length !== 0 ? (
          rivalList.map((item: any, index: React.Key | null | undefined) => (
            <Box m="12px" mr="8px" key={index}>
              {index !== 0 ? <Divider /> : <></>}

              <RivalPreviewCard bottompropFunction={middleFunction} RivalInfo={item} />
            </Box>
          ))
        ) : (
          <NonRival />
        )}
      </Box>
    </Box>
  );
};

export default RivalPreviewList;
