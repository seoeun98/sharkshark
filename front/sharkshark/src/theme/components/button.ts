/* eslint-disable @typescript-eslint/no-redeclare */
import { SystemStyleFunction, mode } from '@chakra-ui/theme-tools';
import { ComponentStyleConfig } from '@chakra-ui/react';

const baseStyle: SystemStyleFunction = () => {
  return {
    // borderRadius: '2rem',
    // fontWeight: '500',
    // border: '1px solid',
  };
};

const primaryVariant = (props: Record<string, any>) => {
  return {
    borderRadius: '2rem',
    fontWeight: '500',
    border: '1px solid',
    borderColor: mode('neutral.25', 'neutral.400')(props),
    color: 'utility.lightBG',
    bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)',
    _hover: {
      borderColor: mode('neutral.25', 'neutral.50')(props),
      bgGradient: 'linear(to-r, #7B67BB, #4BA6B2)',
    },
    _active: {
      bgGradient: 'linear(to-r, #7162AA, #4B93A3)',
    },
    _disabled: {
      opacity: 0.4,
      color: mode('neutral.50', 'neutral.400')(props),
      borderColor: mode('neutral.50', 'neutral.400')(props),
      cursor: 'not-allowed',
    },
  };
};

const secondaryVariant = (props: Record<string, any>) => {
  return {
    borderRadius: '2rem',
    fontWeight: '500',
    border: '1px solid',
    borderColor: mode('neutral.25', 'neutral.400')(props),
    color: mode('utility.darkBG', 'utility.lightBG')(props),
    backgroundColor: mode('neutral.0', 'neutral.500')(props),
    _hover: {
      borderColor: mode('neutral.25', 'neutral.50')(props),
      bgGradient: 'linear(to-r, #81A3AE, #8F91B0)',
    },
    _active: {
      bgGradient: 'linear(to-r, #7162AA, #4B93A3)',
    },
    _disabled: {
      color: mode('neutral.50', 'neutral.800')(props),
      borderColor: mode('neutral.50', 'neutral.800')(props),
      cursor: 'not-allowed',
    },
  };
};

const variants = {
  primary: primaryVariant,
  secondary: secondaryVariant,
};
const sizes = {
  cxs: {
    fontSize: 'sm',
    px: '6',
    py: '2.5',
  },
  csm: {
    fontSize: 'sm',
    px: '8',
    py: '3',
  },
  cmd: {
    fontSize: 'sm',
    px: '20',
    py: '3',
  },
  cxl: {
    fontSize: 'md',
    px: '92px',
    py: '4',
  },
  c2xl: {
    fontSize: 'md',
    px: '24',
    py: '4',
  },
  c3xl: {
    fontSize: 'lg',
    px: '24',
    py: '5',
  },
};

const Button: ComponentStyleConfig = {
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'cmd',
    variant: 'primary',
  },
};

export default Button;
