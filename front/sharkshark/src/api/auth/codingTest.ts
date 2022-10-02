import { CTproblem } from '../../types/DataTypes';
import { authAxios } from '../common';

// 코딩 테스트 목록 조회
export const getCTproblemAPI = async () => {
  let CTproblemList: Array<CTproblem> = [];

  await authAxios
    .get('/prob/mock')
    .then(res => {
      console.log(res.data);
      CTproblemList = res.data;
    })
    .catch(err => {
      console.log(err);
      alert('코테 문제 받기 실패');
    });
  return CTproblemList;
};

// 문제 풀이 유무 및 데이터 조회
export const getCTresultAPI = async (probNo: number, start: string) => {
  await authAxios
    .get('/prob/mockres')
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      alert('모의 코테 결과 받기 실패');
    });
};
