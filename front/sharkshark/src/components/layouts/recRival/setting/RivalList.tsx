import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { RivalBasicCard } from '../common/RivalBasicCard';
import NonRival from '../../NonRival';
import { rival } from '../../../../types/DataTypes';
import { useSelector } from 'react-redux';

export const RivalList = () => {
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
