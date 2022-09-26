/* eslint-disable @typescript-eslint/no-redeclare */
import { SystemStyleFunction, mode } from '@chakra-ui/theme-tools';
import { ComponentStyleConfig } from '@chakra-ui/react';

const baseStyle: SystemStyleFunction = () => {
  return {
    width: '400px',
    height: '48px',
    borderRadius: '4px',
    bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)',
    bgClip: 'text',
    fontSize: '12px',
    fontWeight: '400',
    border: '3px solid',
  };
};

const outlineVariant = (props: Record<string, any>) => {
  return {
    color: 'utility.neutral.50',
    bg: mode('#F1F3F5', 'neutral.500')(props),
    borderColor: 'utility.neutral.50',
    _hover: {
      bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)',
      bg: mode('#F1F6FD', '#384459')(props),
    },
    _active: {
      bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)',
      bg: mode('#F1F3F5', 'neutral.500')(props),
    },
    _disabled: {
      opacity: 0.4,
      color: mode('neutral.25', '#BBBBBB')(props),
      borderColor: mode('neutral.50', 'neutral.400')(props),
      cursor: 'not-allowed',
    },
  };
};

const variants = {
  outline: outlineVariant,
};

const Input: ComponentStyleConfig = { baseStyle, variants };

export default Input;
