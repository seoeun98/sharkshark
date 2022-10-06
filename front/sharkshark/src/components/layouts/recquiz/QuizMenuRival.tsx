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
          풀이 유형이 유사한 사용자를 기반으로 문제를 추천해드립니다. <br />
          본인의 목적에 맞는 문제를 찾아 풀어보세요.
        </>
      }
    >
      <QuizTable list={list} />
    </Paragraph>
  );
};
