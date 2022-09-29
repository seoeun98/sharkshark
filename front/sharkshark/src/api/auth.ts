import { UserInfo } from '../types/DataTypes';
import { authAxios } from './common';

// 계정 정보 조회
export const getUserInfoAPI = (id: string) => {
  let userinfo: UserInfo = {
    id: '',
    token: '',
    git: '',
    dir: '',
  };
  authAxios
    .get(`/user/${id}`)
    .then(({ data }: { data: UserInfo }) => {
      console.log(data);
      userinfo = data;
    })
    .catch(err => {
      console.log(err);
      alert('유저 정보 조회에 실패했습니다.');
    });
  return userinfo;
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

// 깃허브 코드 토큰 교환
export const githubTokenAPI = async (id: string, code: string) => {
  let token = '';
  await authAxios
    .post(`/user/github/${id}`, { authorizationCode: code })
    .then(res => {
      console.log(res);
      token = res.data.github_access_token;
    })
    .catch(err => {
      console.log(err);
      alert('로그인 실패');
    });
  return token;
};
