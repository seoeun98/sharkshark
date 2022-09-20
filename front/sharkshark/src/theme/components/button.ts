import { ComponentStyleConfig } from '@chakra-ui/react';
import { SystemStyleFunction, mode } from '@chakra-ui/theme-tools';

const baseStyle: SystemStyleFunction = () => {
  return {
    borderRadius: '36px',
    fontWeight: 'semiBold',
  };
};
const primaryVariant: SystemStyleFunction = props => {
  return {
    borderColor: mode(props.theme.colors.neutral['25'], props.theme.colors.neutral['400'])(props),
    transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)',
    color: '#ffffff',
    border: '1px solid',
    bgGradient: props.theme.linear(
      'to-r',
      props.theme.colors.primary.cyan50,
      props.theme.colors.primary.purple0,
    )(props),
    _hover: {
      borderColor: mode(props.theme.colors.neutral['25'], props.theme.colors.neutral['500'])(props),
      backgroundColor: mode(
        props.theme.colors.blackalpha[400],
        props.theme.colors.blackalpha[500],
      )(props),
      bgGradient: props.theme.linear(
        'to-r',
        props.theme.colors.primary.purple0,
        props.theme.colors.primary.cyan50,
      )(props),
    },
  };
};

const secondaryVariant: SystemStyleFunction = () => {
  return {
    //yourVariantStylesHere
  };
};
const variants = {
  primary: primaryVariant,
  secondary: secondaryVariant,
};

const Button: ComponentStyleConfig = {
  baseStyle,
  variants,
};

export default Button;
