import { Box, Button, Center, Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { probsByTagAPI } from '../../../api/auth';
import { getUserID } from '../../../api/common';
import { Problem } from '../../../types/DataTypes';
import { Paragraph } from '../../common/Paragraph';
import { QuizTable } from './QuizTable';
import { QuizTableItem } from './QuizTableItem';

export const QuizMenuTag = () => {
  const Tags = [
    '수학 math',
    '구현 impl',
    '그리디 greedy',
    '문자열 string',
    '자료구조 ds',
    '그래프 graph',
    '동적프로그래밍 dp',
    '브루트포스 bruteforce',
  ];

  const [active, setActive] = useState(0);
  const [list, setList] = useState<Problem[]>([]);

  const getList = async (idx: number) => {
    setList(await probsByTagAPI(Tags[active].split(' ')[1]));
  };

  useEffect(() => {
    getList(active);
  }, [active]);

  return (
    <Paragraph
      title="주요 알고리즘 유형별 추천 문제"
      description={
        <>
          {getUserID()} 님에게 맞는 문제를 유형별로 추천해드립니다.
          <br />
          본인의 목적에 맞는 문제를 찾아 풀어보세요.
        </>
      }
    >
      <QuizTagCarousel tags={Tags} active={active} setActive={setActive} />
      <QuizTable list={list} />
    </Paragraph>
  );
};

export const QuizTagCarousel = (props: {
  tags: string[];
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { tags, active, setActive } = props;
  const bgcolor = useColorModeValue('#DEE2E6', '#292835');

  return (
    <Box
      pos="relative"
      width="full"
      h="120px"
      display="flex"
      overflow="hidden"
      alignItems="center"
      justifyContent="center"
      my="32px"
    >
      <Center mr="24px" pos="relative" right="260px">
        <FaChevronLeft size="32px" onClick={() => setActive(i => (i + 7) % 8)} />
      </Center>
      <Box
        h="120px"
        w="200px"
        pos="relative"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {tags.map((item, index) => {
          const abs_offset = Math.min(Math.abs(index - active), 8 - Math.abs(index - active));
          const direction =
            active - index > 0 ? (active - index < 4 ? -1 : 1) : index - active < 4 ? 1 : -1;
          return (
            <Box
              key={index}
              borderRadius="12px"
              bgGradient="linear(to-r, primary.cyan50, primary.purple0)"
              style={{
                position: 'absolute',
                transform: `scale(${1 - abs_offset * 0.1}) translateX(${
                  (abs_offset > 2 ? 2 : abs_offset) * direction * 10
                }rem) translateZ(${-abs_offset * 10}px)`,
                filter: `blur(${abs_offset * 2}px)`,
                transition: 'all 0.3s ease-out',
              }}
            >
              <Box
                borderRadius="10px"
                style={{
                  backgroundColor: `${active == index ? '' : bgcolor}`,
                  transition: 'all 0.3s ease-out',
                }}
              >
                <QuizTagCard title={item} active={index === active} />
              </Box>
            </Box>
          );
        })}
      </Box>

      <Center mr="24px" pos="relative" left="260px">
        <FaChevronRight size="32px" onClick={() => setActive(i => (i + 1) % 8)} />
      </Center>
    </Box>
  );
};

export const QuizTagCard = (props: { title: string; active: boolean }) => {
  const { title, active } = props;
  const [main, sub] = title.split(' ');
  const bgcolor = useColorModeValue('neutral.25', 'neutral.500');
  return (
    <Box h="112px" w="200px" pt="56px" pl="20px">
      <Box fontSize="12px" lineHeight="14px">
        {sub}
      </Box>
      <Box>{main}</Box>
    </Box>
  );
};
