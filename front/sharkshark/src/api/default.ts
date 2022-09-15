import { defaultAxios } from './common';

// 회원가입
export const registerAPI = (id: string, password: string) => {
  defaultAxios
    .post('/user/register', { id: id, password: password })
    .then(res => {
      window.location.href = '/login';
    })
    .catch(err => {
      console.log(err);
      alert('회원가입 실패');
    });
};

// 상태메시지 지정 문구 가져오기
export const getProfileMsgAPI = (id: string) => {
  defaultAxios
    .post(`/user/confirm/${id}`)
    .then(res => {
      console.log(res.data.msg);
    })
    .catch(err => {
      console.log(err);
      alert('getProfileMsg failed');
    });
};

// 상태메시지 지정 문구 입력 확인
export const checkProfileMsgAPI = (id: string) => {
  defaultAxios
    .get(`/user/confirm/${id}`)
    .then(res => {
      alert('checkProfileMsgAPI success');
    })
    .catch(err => {
      console.log(err);
      alert('checkProfileMsgAPI failed');
    });
};

// 로그인
export const loginAPI = (id: string, password: string) => {
  defaultAxios
    .post('/user/login', { id: id, password: password })
    .then(res => {
      localStorage.setItem('accessToken', res.data.access_token);
      window.location.href = '/';
    })
    .catch(err => {
      console.log(err);
      alert('로그인 실패');
    });
};
