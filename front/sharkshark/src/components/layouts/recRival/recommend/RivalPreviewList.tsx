import { Box, Divider, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { getRivalAPI } from '../../../../api/auth/rival';
import { RivalPreviewCard } from '../common/RivalPreviewCard';
import NonRival from '../../NonRival';
import { useDispatch, useSelector } from 'react-redux';
import { setRivalList } from '../../../../reducers/rivalAPIReducer';

const RivalPreviewList = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchRivalList = async () => {
    dispatch(setRivalList(await getRivalAPI()));
  };

  useEffect(() => {
    fetchRivalList();
  }, [fetchRivalList]);

  const rivalList = useSelector((state: any) => state.rivalAPIReducer.rivalList);

  const bg = useColorModeValue('neutral.0', 'neutral.500');

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
              {index !== 0 ? <Divider /> : null}

              <RivalPreviewCard RivalInfo={item} />
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
