import { authAxios } from '../common';

// 추천 사용자 목록 조회
export const getTagDataAPI = async (userId: string) => {
  let userTagData = {};
  await authAxios
    .get(`/data/category/${userId}`)
    .then(res => {
      userTagData = res.data;
    })
    .catch(err => {
      console.log(err);
      alert('태그별 데이터 가져오기 실패');
    });
  return userTagData;
};
