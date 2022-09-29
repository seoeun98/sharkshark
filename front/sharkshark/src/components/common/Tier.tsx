import { Image, Text, useColorModeValue } from '@chakra-ui/react';

export const Tier = (props: { level: number; size: string }) => {
  const { level, size } = props;
  const tiers = ['unrated', '브론즈', '실버', '골드', '플래티넘', '다이아', '루비'];
  const getSrc = (l: number) => {
    let filename = 'unrated';

    if (l > 0) {
      l += 4;
      filename = tiers[Math.floor(l / 5)] + ' ' + (5 - (l % 5));
    }

    return `/assets/tier/${filename}.svg`;
  };
  return <Image src={getSrc(level)} boxSize={size} />;
};
