import { tagInfo, wrongInfo } from '../../types/DataTypes';
import { authAxios } from '../common';

// 알고리즘 유형별 조회
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
export const getSolveTermDataAPI = async () => {
  let SolveTermData = {};
  await authAxios
    .get('/data/history')
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

// 로드맵 api
export const getRoadMapDataAPI = async () => {
  let RoadMapData = {
    user: [],
    rivals: [],
  };
  await authAxios
    .get(`/data/tier`)
    .then(res => {
      RoadMapData = res.data;
    })
    .catch(err => {
      console.log(err);
    });
  return RoadMapData;
};

// 평균 문제 수
export const getAverageProblemAPI = async () => {
  let AverageProblemList: never[] = [];
  await authAxios
    .get('data/pbperweek')
    .then(res => {
      AverageProblemList = res.data;
      console.log(AverageProblemList);
    })
    .catch(err => {
      console.log(err);
    });
  return AverageProblemList;
};

// 최근 라이벌 해결 문제 평균 난이도 / 문제 목록
export const getLevelAvgAPI = async () => {
  let levelAvg: never[] = [];
  await authAxios
    .get('/data/levelavg')
    .then(res => {
      levelAvg = res.data;
      console.log(levelAvg);
    })
    .catch(err => {
      console.log(err);
    });
  return levelAvg;
};

// 평균 레벨
export const getCategoryAvgAPI = async () => {
  let categoryAvg: never[] = [];
  await authAxios
    .get('/data/categoryavg')
    .then(res => {
      categoryAvg = res.data;
      console.log(categoryAvg);
    })
    .catch(err => {
      console.log(err);
    });
  return categoryAvg;
};
