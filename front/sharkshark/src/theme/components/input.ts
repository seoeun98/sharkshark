import { ComponentStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import colors from '../foundations/Color/colors';
export { default as colors } from '../foundations/Color/colors';

const getOutlineVariant = (props: Record<string, any>) => {
  const { theme } = props;

  return {
    field: {
      h: '48px',
      fontSize: '16px',
      background: mode('neutral.0', 'neutral.500')(props),
      fontWeight: '500',
      bgGradient: 'linear(to-r, primary.cyan50, primary.purple0)',
      borderRadius: '6px',
      bgClip: 'text',
      errorBorderColor: 'warning.0',
      // borderColor: getColor(theme, "brand.border"),
      _placeholder: {
        color: 'neutral.50',
        fontWeight: '300',
        opacity: '2',
      },
      _hover: {
        color: 'primary.cyan50',
        background: mode('neutral.0', 'neutral.500')(props),
        borderColor: 'primary.cyan50',
      },
      _focus: {
        borderColor: 'primary.cyan50',
        boxShadow: `0 0 0 1.5px ${colors.primary.cyan0}`,
      },
      _disabled: {
        opacity: 1,
        background: mode('neutral.50', 'neutral.800')(props),
        borderColor: mode('neutral.50', 'neutral.400')(props),
        cursor: 'not-allowed',
        _placeholder: {
          color: mode('neutral.25', '#363A3F')(props),
        },
      },
    },
  };
};

const variants = {
  outline: getOutlineVariant,
};

const Input: ComponentStyleConfig = {
  variants,
};

export default Input;
