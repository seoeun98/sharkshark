import { tagInfo } from '../../types/DataTypes';
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
      alert('getRoadMapDataAPI failed');
    });
  return RoadMapData;
};
