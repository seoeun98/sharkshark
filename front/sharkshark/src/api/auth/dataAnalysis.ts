import { tagInfo, wrongInfo } from '../../types/DataTypes';
import { authAxios } from '../common';

// 추천 사용자 목록 조회
export const getTagDataAPI = async (userId: string) => {
  let userTagData: tagInfo = {
    userId: '',
    math: 0,
    implementation: 0,
    greedy: 0,
    string: 0,
    dataStructure: 0,
    graph: 0,
    dp: 0,
    bruteforce: 0,
  };
  await authAxios
    .get(`/data/category/${userId}`)
    .then(res => {
      userTagData = res.data;
    })
    .catch(err => {
      console.log(err);
      // alert('태그별 데이터 가져오기 실패');
    });
  return userTagData;
};

// 기간별 문제 풀이 조회
export const getSolveTermDataAPI = async (startDate: string, endDate: string) => {
  let SolveTermData = {};
  await authAxios
    .post('/data/history', {
      startDate: startDate,
      endDate: endDate,
    })
    .then(res => {
      SolveTermData = res.data;
    })
    .catch(err => {
      console.log(err);
      // alert('태그별 데이터 가져오기 실패');
    });
  return SolveTermData;
};

// 주요 오답 유형
export const getWrongTypeDataAPI = async () => {
  let wrongTypeData: wrongInfo = {
    no: 0,
    wrong_answer: 0,
    over_memory: 0,
    runtime_error: 0,
    over_time: 0,
    userId: '',
    wrong_print: 0,
    over_print: 0,
    compile_error: 0,
  };
  await authAxios
    .get('/data/wrong')
    .then(res => {
      wrongTypeData = res.data;
    })
    .catch(err => {
      console.log(err);
      // alert('태그별 데이터 가져오기 실패');
    });
  return wrongTypeData;
};
