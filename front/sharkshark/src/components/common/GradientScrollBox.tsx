import { Box, useColorModeValue } from '@chakra-ui/react';

export const GradientScrollBox = (props: { h?: string; w?: string; children: any }) => {
  const { w, h, children } = props;
  return (
    <Box
      h={h}
      my={w}
      overflow="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '12px',
        },
        '&::-webkit-scrollbar-track': {
          background: useColorModeValue('#CBCDD6', '#18181A'),
          borderRadius: '12px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(0deg, #997BED 0%, #4AE2DE 100%)',
          borderRadius: '12px',
        },
      }}
    >
      {children}
    </Box>
  );
};
