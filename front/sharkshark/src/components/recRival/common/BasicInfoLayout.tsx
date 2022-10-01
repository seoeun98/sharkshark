import { Center, VStack, useColorModeValue, Box } from '@chakra-ui/react';
import { Tier } from '../../common/Tier';
import { ColorText } from '../../common/ColorText';

export const BasicInfoLayout = (props: {
  typeName: string;
  level: string;
  userClass: number;
  id: string;
}) => {
  const { typeName, level, userClass, id } = props;
  const bgCondition = useColorModeValue('white', 'black');
  let style = {
    width: '42px',
    margin: '14px',
    px: '14px',
    py: '2px',
    fontSize: '14px',
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

  let levelForTier = parseInt(level);
  return (
    <>
      <Box w={style.width} mr={style.margin}>
        <Tier level={levelForTier} size="auto" />
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
          <ColorText>Class {userClass}</ColorText>
        </Center>
        {/* userId */}
        <Box fontSize={style.idFontSize} fontWeight="700">
          {id}
        </Box>
      </VStack>
    </>
  );
};
