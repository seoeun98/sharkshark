import { Box, Flex, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import { RivalInfo } from '../../types/DataTypes';
import { RivalBasicCard } from './RivalBasicCard';
export const RivalList = () => {
  const testdata: Array<RivalInfo> = [
    { userId: 'id', class: 'Class 4', level: 18 },
    { userId: 'id', class: 'Class 4', level: 18 },
    { userId: 'id', class: 'Class 4', level: 18 },
    { userId: 'id', class: 'Class 4', level: 18 },
    { userId: 'id', class: 'Class 4', level: 18 },
  ];

  return (
    <Grid templateColumns="repeat(3, 2fr)" gap={6} rowGap={8}>
      {testdata.map((item, index) => (
        <GridItem w="100%" h="100%">
          <RivalBasicCard RivalInfo={item} />
        </GridItem>
      ))}
    </Grid>
  );
};
