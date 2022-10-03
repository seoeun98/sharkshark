import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { RivalBasicCard } from '../common/RivalBasicCard';
import { getRivalAPI } from '../../../../api/auth/rival';
import React, { useEffect } from 'react';
import NonRival from '../../NonRival';
import { rival } from '../../../../types/DataTypes';
import { useDispatch, useSelector } from 'react-redux';
import { setRivalList } from '../../../../reducers/rivalAPIReducer';

export const RivalList = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchRivalList = async () => {
    dispatch(setRivalList(await getRivalAPI()));
  };

  useEffect(() => {
    fetchRivalList();
  }, [fetchRivalList]);

  const rivalList = useSelector((state: any) => state.rivalAPIReducer.rivalList);

  return (
    <>
      {' '}
      {rivalList.length !== 0 ? (
        <SimpleGrid minChildWidth="360px" columns={2} spacingX={5} spacingY={10} ml="1vw">
          {rivalList.map((item: rival, index: any) => (
            <GridItem w="100%" h="100%">
              <RivalBasicCard RivalInfo={item} Rectype="registered" />
            </GridItem>
          ))}
        </SimpleGrid>
      ) : (
        <NonRival />
      )}
    </>
  );
};
