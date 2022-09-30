import { Box } from '@chakra-ui/react';

export const Paragraph = (props: { title: any; description: any; children: any }) => {
  const { title, description, children } = props;
  return (
    <Box mb="6vh">
      <Box fontSize="24px">{title}</Box>
      <Box fontSize="12px" mt="2vh" mb="4vh">
        {description}
      </Box>
      <Box ml="2vw">{children}</Box>
    </Box>
  );
};
