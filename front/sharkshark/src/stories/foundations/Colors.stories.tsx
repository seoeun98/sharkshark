import React from 'react';
import { useClipboard, Wrap, WrapItem, Tooltip, Box } from '@chakra-ui/react';
import colors from '../../theme/foundations/Color/colors';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Foundations/Color',
};

const ColorGrid: React.FC<{
  color: string;
}> = ({ color }) => {
  const { onCopy } = useClipboard(color);

  return (
    <WrapItem onClick={onCopy}>
      <Tooltip label={color} aria-label={color}>
        <Box bgColor={color} boxSize="120px" />
      </Tooltip>
    </WrapItem>
  );
};

export const List = (): JSX.Element => {
  const colorNames: string[] = [];
  for (let colorName of Object.keys(colors)) {
    Object.keys(colors[colorName]).map(name => {
      colorNames.push(colorName + '.' + name);
    });
  }
  return (
    <Wrap spacing={0}>
      {colorNames.map(
        (name: string): JSX.Element => (
          <Box key={name}>
            <ColorGrid color={name} />
          </Box>
        ),
      )}
    </Wrap>
  );
};
