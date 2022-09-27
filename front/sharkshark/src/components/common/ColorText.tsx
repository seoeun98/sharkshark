import { Text, useColorModeValue } from '@chakra-ui/react';

export const ColorText = (props: { children: any }) => {
  const { children } = props;
  return (
    <Text
      bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
      bgClip="text"
      fontWeight={useColorModeValue(800, 700)}
      display="inline"
    >
      {children}
    </Text>
  );
};
