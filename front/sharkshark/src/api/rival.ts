import { authAxios } from './common';

// 추천 사용자 목록 조회
export const getRecUserAPI = () => {
  authAxios
    .get('/rival')
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      alert('라이벌 추천 목록 조회 실패');
    });
};

// 등록한 라이벌 목록 조회
export const getRivalAPI = () => {
  let rivalList: never[] = [];
  authAxios
    .get('/rival/list')
    .then(res => {
      console.log(res.data);
      rivalList = res.data.id;
    })
    .catch(err => {
      console.log(err);
      alert('등록된 라이벌 목록 조회 실패');
    });
  return rivalList;
};

// 라이벌 등록
export const createRivalAPI = (id: string) => {
  authAxios
    .post(`/rival/${id}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      alert('라이벌 등록 실패');
    });
};

// 라이벌 삭제
export const deleteRivalAPI = (id: string) => {
  authAxios
    .post(`/rival/${id}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      alert('라이벌 삭제 실패');
    });
};

// 라이벌 정보 조회
export const getRivalInfoAPI = (id: string) => {
  let rivalInfo = {};
  authAxios
    .get(`/rival/${id}`)
    .then(res => {
      console.log(res.data);
      rivalInfo = res.data;
    })
    .catch(err => {
      console.log(err);
      alert('라이벌 정보 조회 실패');
    });
  return rivalInfo;
};
