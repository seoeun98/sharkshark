import { Center, VStack, useColorModeValue, Box } from '@chakra-ui/react';
import { Tier } from '../../common/Tier';
import { ColorText } from '../../common/ColorText';

export const BasicInfoLayout = (props: {
  typeName: any;
  level: number;
  classCount: any;
  id: any;
}) => {
  const { typeName, level, classCount, id } = props;
  const bgCondition = useColorModeValue('white', 'black');
  let style = {
    width: '48px',
    margin: '18px',
    px: '16px',
    py: '4px',
    fontSize: '16px',
    borderRadius: '50px',
    idFontSize: '24px',
  };

  if (typeName === 'rival') {
    style.width = '32px';
    style.margin = '10px';
    style.px = '8px';
    style.py = '2px';
    style.fontSize = '8px';
    style.borderRadius = '32px';
    style.idFontSize = '20px';
  } else if (typeName === 'rivalSmall') {
    style.width = '28px';
    style.margin = '6px';
    style.px = '6px';
    style.py = '1px';
    style.fontSize = '6px';
    style.borderRadius = '28px';
    style.idFontSize = '16px';
  }
  return (
    <>
      <Box w={style.width} mr={style.margin}>
        <Tier level={level} size="auto" />
      </Box>
      <VStack alignItems="flex-start" spacing={0}>
        {/* class */}
        <Center
          bg={bgCondition}
          px={style.px}
          py={style.py}
          fontSize={style.fontSize}
          borderRadius={style.borderRadius}
        >
          <ColorText>{classCount}</ColorText>
        </Center>
        {/* userId */}
        <Box fontSize={style.idFontSize} fontWeight="700">
          {id}
        </Box>
      </VStack>
    </>
  );
};
