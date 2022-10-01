import { v4 as uuidv4 } from 'uuid';
import { RivalBasicCard } from '../common/RivalBasicCard';
import { Box, Center, HStack, Tbody, useColorModeValue } from '@chakra-ui/react';
import Carousel from 'react-spring-3d-carousel';
import { SetStateAction, useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { rival } from '../../../types/DataTypes';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { RivalCarouselCard } from '../common/RivalCarouselCard';

export const RivalRecList = (props: {
  middlePropFunction: (arg0: string) => void;
  rivalRecList: rival[];
}) => {
  const { rivalRecList } = props;
  const bgcolor = useColorModeValue('#DEE2E6', '#292835');
  const [active, setActive] = useState(0);
  const middleFunction = (text: any) => {
    console.log(text);
    // eslint-disable-next-line react/destructuring-assignment
    props.middlePropFunction(text);
  };
  let len_rival = rivalRecList.length;

  return (
    <Box
      pos="relative"
      width="full"
      h="20vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      mb="24vh"
    >
      {len_rival === 0 ? (
        <Center bg={bgcolor} borderRadius="12px" p="32px">
          ~ 목록이 없습니다 ~
        </Center>
      ) : (
        <>
          <Center pos="relative" right="360px">
            <FaChevronLeft
              size="32px"
              onClick={() => setActive(i => (i + (len_rival - 1)) % len_rival)}
            />
          </Center>
          <HStack>
            <Box
              h="20vh"
              w="300px"
              pos="relative"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {rivalRecList.map((item, index) => {
                const abs_offset = Math.min(Math.abs(index - active), 8 - Math.abs(index - active));
                const direction =
                  active - index > 0 ? (active - index < 4 ? -1 : 1) : index - active < 4 ? 1 : -1;
                return (
                  <Center
                    key={index}
                    style={{
                      position: 'absolute',
                      transform: `scale(${1 - abs_offset * 0.1}) translateX(${
                        (abs_offset > 2 ? 2 : abs_offset) * direction * 12
                      }rem) translateZ(${-abs_offset * 100}px)`,
                      filter: `blur(${abs_offset * 2}px)`,
                      transition: 'all 0.3s ease-out',
                      marginBottom: `${active === index ? '30px' : ''}`,
                    }}
                  >
                    <RivalCarouselCard
                      RivalInfo={item}
                      bottompropFunction={middleFunction}
                      active={index === active}
                    />
                  </Center>
                );
              })}
            </Box>
          </HStack>

          <Center pos="relative" left="400px">
            <FaChevronRight size="32px" onClick={() => setActive(i => (i + 1) % len_rival)} />
          </Center>
        </>
      )}
    </Box>
  );
};

export default RivalRecList;
