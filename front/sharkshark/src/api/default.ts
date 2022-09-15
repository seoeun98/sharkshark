import { defaultAxios } from './common';

// POST /user/login
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

// POST /user/register
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
