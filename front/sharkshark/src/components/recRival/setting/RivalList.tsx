import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { RivalBasicCard } from '../common/RivalBasicCard';
import { getRivalAPI, getRivalInfoAPI } from '../../../api/rival';
import React, { useState, useEffect } from 'react';

export const RivalList = () => {
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

  return (
    <SimpleGrid minChildWidth="360px" columns={2} spacingX={5} spacingY={10} ml="1vw">
      {testdata.map((item, index) => (
        // {rivalListInfo.map((item, index) => (
        <GridItem w="100%" h="100%">
          <RivalBasicCard RivalInfo={item} />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};
