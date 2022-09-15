import { authAxios } from './common';

// GET /user/{id}
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

// PUT /user/{id}
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
