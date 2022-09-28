import { Box, Tab, TabList, useColorModeValue } from '@chakra-ui/react';

export const Sidebar = (props: { first: any; second: any; third: any }) => {
  const hoverColor = useColorModeValue('neutral.700', 'neutral.50');
  const selectedColor = useColorModeValue('black', 'white');
  const bgColor = useColorModeValue('#F1F3F5', 'neutral.500');
  const selectedfw = useColorModeValue(700, 500);
  const basicfw = useColorModeValue(400, 300);
  const { first, second, third } = props;

  const TabStyle = {
    w: 180,
    h: 12,
    fontSize: '1rem',
    borderRadius: '8px',
    marginBottom: '8px',
    fontWeight: { basicfw },
    color: 'neutral.200',
    _hover: {
      color: hoverColor,
    },
    _selected: {
      color: selectedColor,
      fontWeight: selectedfw,
      bg: bgColor,
    },
  };

  return (
    <TabList w="10vw">
      <Tab sx={TabStyle}>{first}</Tab>
      <Tab sx={TabStyle}>{second}</Tab>
      {third !== '' ? <Tab sx={TabStyle}>{third}</Tab> : <Box />}
    </TabList>
  );
};
