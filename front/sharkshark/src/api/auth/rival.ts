import { Problem, rival } from '../../types/DataTypes';
import { authAxios } from '../common';

// 추천 사용자 목록 조회
export const getRecUserAPI = async () => {
  let rivalRecList: Array<rival> = [];
  await authAxios
    .get('/rival')
    .then(res => {
      rivalRecList = res.data;
    })
    .catch(err => {
      console.log(err);
      // alert('라이벌 추천 목록 조회 실패');
    });
  return rivalRecList;
};

// 등록한 라이벌 목록 조회
export const getRivalAPI = async () => {
  let rivalList: Array<rival> = [];
  await authAxios
    .get('/rival/list')
    .then(res => {
      rivalList = res.data;
    })
    .catch(err => {
      console.log(err);
      // alert('등록된 라이벌 목록 조회 실패');
    });
  return rivalList;
};

// 라이벌 등록
export const createRivalAPI = (id: string) => {
  authAxios
    .post(`/rival/${id}`)
    .then(res => {
      alert('라이벌 등록이 완료되었습니다.');
    })
    .catch(err => {
      console.log(err);
      // alert('라이벌 등록 실패');
    });
};

// 라이벌 삭제
export const deleteRivalAPI = (id: string) => {
  authAxios
    .delete(`/rival/${id}`)
    .then(res => {
      console.log(res.data);
      alert('라이벌 해지가 완료되었습니다.');
    })
    .catch(err => {
      console.log(err);
      // alert('라이벌 삭제 실패');
    });
};
// 라이벌들의 최근 5문제
export const getRivalRecentAPI = async () => {
  let rivalRecent: Problem[] = [];
  await authAxios
    .get(`/rival/recent`)
    .then(res => {
      rivalRecent = res.data;
    })
    .catch(err => {
      console.log(err);
    });
  return rivalRecent;
};

// 라이벌 정보 조회
export const getRivalInfoAPI = async (id: string) => {
  let rivalInfo: rival = {
    tier: '0',
    userId: '',
    userClass: 0,
    exp: 0,
  };
  await authAxios
    .get(`/rival/${id}`)
    .then(res => {
      rivalInfo = res.data;
    })
    .catch(err => {
      console.log(err);
      // alert('라이벌 정보 조회 실패');
    });
  return rivalInfo;
};
