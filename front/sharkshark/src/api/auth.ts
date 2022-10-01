import { Problem, ProblemDetail, UserInfo } from '../types/DataTypes';
import { authAxios } from './common';

// 계정 정보 조회
export const getUserInfoAPI = async (id: string) => {
  let userinfo: UserInfo = {
    id: '',
    token: '',
    git: '',
    dir: '',
  };
  await authAxios
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
      alert('updateUserInfoAPI failed');
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
      alert('githubTokenAPI failed');
    });
  return token;
};

//====문제 관련 API==/

// 라이벌 기반 문제 추천
export const probsByRivalAPI = async () => {
  let list: Array<Problem> = [];
  await authAxios
    .get('/prob')
    .then(res => {
      console.log(res);
      list = res.data;
    })
    .catch(err => {
      console.log(err);
      alert('probsByRivalAPI failed');
    });
  return list;
};

// 유형별 문제 추천
export const probsByCategoryAPI = async () => {
  let list: Array<Problem> = [];
  await authAxios
    .get('/prob/category')
    .then(res => {
      console.log(res);
      list = res.data;
    })
    .catch(err => {
      console.log(err);
      alert('probsByCategoryAPI failed');
    });
  return list;
};

// 유형별 선택 시 문제 추천
export const probsByTagAPI = async (tagName: string) => {
  let list: Array<Problem> = [];
  await authAxios
    .get(`/prob/tags/${tagName}`)
    .then(res => {
      console.log(res);
      list = res.data;
    })
    .catch(err => {
      console.log(err);
      alert('probsByTagAPI failed');
    });
  return list;
};

// 모의 코테용 문제 목록
export const probsForTestAPI = async () => {
  let list: Array<Problem> = [];
  await authAxios
    .get('/prob/mock')
    .then(res => {
      console.log(res);
      list = res.data;
    })
    .catch(err => {
      console.log(err);
      alert('probsForTestAPI failed');
    });
  return list;
};

// 블로그 포스팅용 문제 목록
export const probsRecentAPI = async () => {
  let list: Array<Problem> = [];
  await authAxios
    .get('/prob/recent')
    .then(res => {
      console.log(res);
      list = res.data;
    })
    .catch(err => {
      console.log(err);
      alert('probsRecentAPI failed');
    });
  return list;
};

// 블로그 포스팅용 문제 상세
export const probsDetailAPI = async (probNo: number) => {
  let detail: ProblemDetail = {
    probNo: 0,
    problem_description: '',
    input_description: '',
    output_description: '',
    example: '',
  };
  await authAxios
    .get(`/prob/detail/${probNo}`)
    .then(res => {
      console.log(res);
      detail = res.data;
    })
    .catch(err => {
      console.log(err);
      alert('probsDetailAPI failed');
    });
  return detail;
};
