import { Box, useColorModeValue } from '@chakra-ui/react';

export const Paragraph = (props: { title: any; description: any; children: any }) => {
  const { title, description, children } = props;
  const titlefw = useColorModeValue(700, 500);
  const subtitlefw = useColorModeValue(500, 300);
  const subtitleColor = useColorModeValue('neutral.700', 'neutral.50');

  return (
    <Box mb="6vh">
      <Box mb="4vh">
        <Box fontSize="24px" fontWeight={titlefw} mb="2vh">
          {title}
        </Box>
        <Box fontSize="14px" mb="4vh" fontWeight={subtitlefw} color={subtitleColor}>
          {description}
        </Box>
      </Box>
      <Box ml="2vw">{children}</Box>
    </Box>
  );
};
