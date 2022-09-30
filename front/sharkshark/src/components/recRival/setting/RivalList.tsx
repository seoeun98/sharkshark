import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { RivalBasicCard } from '../common/RivalBasicCard';
import { getRivalAPI, getRivalInfoAPI } from '../../../api/rival';
import React, { useState, useEffect } from 'react';

export const RivalList = (props: { middlePropFunction: (arg0: string) => void }) => {
  const [rivalList, setrivalList] = useState([]);
  const rivalListInfo = [];

  useEffect(() => {
    const rivalListData = getRivalAPI();
    setrivalList(rivalListData);
  }, []);

  for (let rival of rivalList) {
    let userData = getRivalInfoAPI(rival);
    rivalListInfo.push(userData);
  }

  const testdata = [
    { id: 'id', className: 'Class 4', level: 18 },
    { id: 'id', className: 'Class 4', level: 18 },
    { id: 'id', className: 'Class 4', level: 18 },
    { id: 'id', className: 'Class 4', level: 18 },
    { id: 'id', className: 'Class 4', level: 18 },
  ];

  const middleFunction = (text: any) => {
    console.log(text);
    // eslint-disable-next-line react/destructuring-assignment
    props.middlePropFunction(text);
  };

  return (
    <SimpleGrid minChildWidth="360px" columns={2} spacingX={5} spacingY={10} ml="1vw">
      {testdata.map((item, index) => (
        // {rivalListInfo.map((item, index) => (
        <GridItem w="100%" h="100%">
          <RivalBasicCard bottompropFunction={middleFunction} RivalInfo={item} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};
