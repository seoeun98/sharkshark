// theme/index.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// global style
import { mode } from '@chakra-ui/theme-tools';

// Foundations
// theme related to borders, spacings, colors.
import * as foundations from './foundations';

// Components
// all custom themes for single components
import * as components from './components';

// Chakra Configuration on Initial Mode
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: mode('neutral.0', 'black'),
        overflowX: 'hidden',
        fontFamily: 'Pretendard',
      },
      html: {
        fontFamily: 'Pretendard',
      },
    },
  },
  ...foundations,
  components: {
    ...components,
  },
});

export default customTheme;
