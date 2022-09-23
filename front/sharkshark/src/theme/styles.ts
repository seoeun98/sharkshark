import { mode } from '@chakra-ui/theme-tools';

export const globalStyles = {
  styles: {
    global: () => ({
      html: {
        fontFamily: 'Pretendard',
      },
      body: {
        overflowX: 'hidden',
        bg: mode('white', 'black'),
      },
    }),
  },
};
