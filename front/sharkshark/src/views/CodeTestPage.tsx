import { getUserID } from '../api/common';
import { Paragraph } from '../components/common/Paragraph';
import { CodingTestDefault } from '../components/layouts/codingTest/CodingTestDefault';

export const CodeTestPage = () => {
  return (
    <Paragraph
      title="모의 코딩 테스트"
      description={
        <>
          {getUserID()} 님의 실력을 분석해 모의 코딩 테스트를 준비했습니다.
          <br />
          실제 코딩 테스트처럼 연습해보고, 실력을 점검해보세요!
        </>
      }
    >
      <CodingTestDefault />
    </Paragraph>
  );
};
