import { Box, Button, Flex } from '@chakra-ui/react';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getUserID } from '../../../api/common';
import { Problem } from '../../../types/DataTypes';
import { QuizTable } from './QuizTable';
import { QuizTableItem } from './QuizTableItem';

export const QuizMenuTag = () => {
  const Tags = ['수학', '구현', '그리디', '문자열', '자료구조', '그래프', 'DP', '브루트포스'];

  return (
    <>
      <Box fontSize="24px">주요 알고리즘 유형별 추천 문제</Box>
      <Box fontSize="12px">
        {getUserID()} 님에게 맞는 문제를 유형별로 추천해드립니다.
        <br />
        본인의 목적에 맞는 문제를 찾아 풀어보세요.
      </Box>
      <Flex>
        <FaChevronLeft />
        {Tags.map((item, index) => (
          <QuizTagCard key={index} title={item} />
        ))}
        <FaChevronRight />
      </Flex>
      <QuizTable />
    </>
  );
};

export const QuizTagCard = (props: { title: string }) => {
  const { title } = props;
  return (
    <Box
      h="100px"
      w="200px"
      borderRadius="10px"
      bg="white"
      bgImage="https://bit.ly/3dFVkPB"
      bgSize="cover"
      bgPos="center"
    >
      {title}
    </Box>
  );
};
