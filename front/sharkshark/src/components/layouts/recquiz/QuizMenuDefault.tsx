import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { probsByRivalAPI } from '../../../api/auth';
import { getUserID } from '../../../api/common';
import { Problem } from '../../../types/DataTypes';
import { ColorText } from '../../common/ColorText';
import { Paragraph } from '../../common/Paragraph';
import { QuizTable } from './QuizTable';
import { QuizTableItem } from './QuizTableItem';

export const QuizMenuDefault = () => {
  const [list, setList] = useState<Problem[]>([]);

  const getList = async () => {
    setList(await probsByRivalAPI());
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Paragraph
      title={
        <>
          <ColorText>{getUserID()}</ColorText> 님을 위한 추천 문제
        </>
      }
      description={
        <>
          비슷한 실력을 가진 사용자를 기반으로 문제를 추천해드립니다. <br />
          본인의 목적에 맞는 문제를 찾아 풀어보세요.
        </>
      }
    >
      <QuizTable list={list} />
    </Paragraph>
  );
};
