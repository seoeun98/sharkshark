import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { RivalBasicCard } from '../common/RivalBasicCard';
import { getRivalAPI } from '../../../../api/auth/rival';
import React, { useState, useEffect } from 'react';
import NonRival from '../../NonRival';
import { rival } from '../../../../types/DataTypes';

export const RivalList = (props: { middlePropFunction: (arg0: string) => void }) => {
  const [rivalList, setrivalList] = useState<rival[]>([]);

  const fetchRivalList = async () => {
    setrivalList(await getRivalAPI());
  };

  useEffect(() => {
    fetchRivalList();
  }, []);

  const middleFunction = (text: any) => {
    console.log(text);
    // eslint-disable-next-line react/destructuring-assignment
    props.middlePropFunction(text);
  };

  return (
    <>
      {' '}
      {rivalList.length !== 0 ? (
        <SimpleGrid minChildWidth="360px" columns={2} spacingX={5} spacingY={10} ml="1vw">
          {rivalList.map((item, index) => (
            <GridItem w="100%" h="100%">
              <RivalBasicCard
                bottompropFunction={middleFunction}
                RivalInfo={item}
                Rectype="registered"
              />
            </GridItem>
          ))}
        </SimpleGrid>
      ) : (
        <NonRival />
      )}
    </>
  );
};
