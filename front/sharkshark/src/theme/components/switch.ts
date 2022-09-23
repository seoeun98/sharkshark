/* eslint-disable @typescript-eslint/no-redeclare */
import { SystemStyleFunction } from '@chakra-ui/theme-tools';
import { ComponentStyleConfig } from '@chakra-ui/react';

const baseStyle: SystemStyleFunction = () => {
  return {
    bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)',
    _checked: {
      bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)',
    },
  };
};

const Switch: ComponentStyleConfig = {
  baseStyle,
};

export default Switch;
