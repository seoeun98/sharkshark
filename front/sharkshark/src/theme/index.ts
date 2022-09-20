// theme/index.ts

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// global style
import { globalStyles } from './styles';

// Foundations
// theme related to borders, spacings, colors.
import * as foundations from './foundations';

// Components
// all custom themes for single components
import * as components from './components';

// Chakra Configuration on Initial Mode
const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const customTheme = extendTheme({
  config,
  globalStyles,
  ...foundations,
  components: {
    ...components,
  },
});

export default customTheme;
