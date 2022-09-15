import { authAxios } from './common';

// 계정 정보 조회
export const getUserInfoAPI = (id: string) => {
  authAxios
    .get(`/user/${id}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      alert('로그인 실패');
    });
};

// 계정 정보 업데이트
export const updateUserInfoAPI = (id: string, password: string, git: string, dir: string) => {
  authAxios
    .put(`/user/${id}`, { id: id, password: password, git: git, dir: dir })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      alert('로그인 실패');
    });
};
