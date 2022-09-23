// theme/foundations/colors.ts
const primary = {
  cyan0: '#9DECF9',
  cyan50: '#4AE2DE',
  blue0: '#B9CFF2',
  blue50: '#63B3ED',
  blue100: ' #77A9E7',
  purple0: '#997BED',
};

const warning = {
  0: '#FDA29B',
  50: '#F04438',
};

const neutral = {
  0: '#F5F5F5',
  25: '#DEE2E6',
  50: '#CED4DA',
  100: '#CBCDD6',
  200: '#ADB5BD',
  300: '#7D7D7D',
  400: '#373645',
  500: '#292835',
  600: '#4A5056',
  700: '#3D4248',
  800: '#18181A',
  900: '#151518',
};

const utility = {
  lightBG: '#FFFFFF',
  darkBG: '#000000',
};

const colors: { [x: string]: { [x: string]: string } } = {
  primary,
  warning,
  neutral,
  utility,
};

export default colors;
