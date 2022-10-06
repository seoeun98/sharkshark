import { Box, Button, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { probsByCategoryAPI } from '../../../api/auth';
import { getUserID } from '../../../api/common';
import { Problem } from '../../../types/DataTypes';
import { ColorText } from '../../common/ColorText';
import { Paragraph } from '../../common/Paragraph';
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
    <Paragraph
      title={
        <Box pos="relative">
          <Link to="/recommend/user">
            <Button pos="absolute" right="0">
              라이벌 추가 등록
            </Button>
          </Link>
          <ColorText>{getUserID()}</ColorText> 님을 위한 추천 문제
        </Box>
      }
      description={
        <>
          지피지기(知彼知己)면 백전불태(百戰不殆) <br />
          라이벌이 풀었지만, 내가 풀지 않았던 문제를 알려드려요.
        </>
      }
    >
      <QuizTable list={list} />
    </Paragraph>
  );
};
