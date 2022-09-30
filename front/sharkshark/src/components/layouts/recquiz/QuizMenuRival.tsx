import { Box, Button, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { probsByCategoryAPI } from '../../../api/auth';
import { Problem } from '../../../types/DataTypes';
import { QuizTable } from './QuizTable';
import { QuizTableItem } from './QuizTableItem';

export const QuizMenuRival = () => {
  const [list, setList] = useState<Problem[]>([]);

  const getList = async () => {
    setList(await probsByCategoryAPI());
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Box pos="relative">
      <Button pos="absolute" right="0">
        라이벌 추가 등록
      </Button>
      <Box fontSize="24px">라이벌 기반 추천 문제</Box>
      <Box fontSize="12px">
        지피지기(知彼知己)면 백전불태(百戰不殆) <br />
        라이벌이 풀었지만, 내가 풀지 않았던 문제를 알려드려요.
      </Box>
      <QuizTable list={list} />
    </Box>
  );
};
