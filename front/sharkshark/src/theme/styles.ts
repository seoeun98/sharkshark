import { StyleFunctionProps } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const theme = {
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('white', 'black')(props),
        overflowX: 'hidden',
        fontFamily: 'Pretendard',
        letterSpacing: '-0.5px',
      },
      html: {
        fontFamily: 'Pretendard',
      },
    }),
  },
};
