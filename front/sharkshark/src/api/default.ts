import { defaultAxios } from './common';

// 회원가입
export const registerAPI = (id: string, pw: string) => {
  defaultAxios
    .post('/user/regist', { id: id, pw: pw })
    .then(res => {
      window.location.href = '/login';
    })
    .catch(err => {
      console.log(err);
      alert('회원가입 실패');
    });
};

// 상태메시지 지정 문구 가져오기
export const getProfileMsgAPI = async (id: string) => {
  let profileMsg = '';
  await defaultAxios
    .post(`/user/confirm/${id}`)
    .then(res => {
      console.log(res.data);
      profileMsg = res.data.msg;
    })
    .catch(err => {
      profileMsg = '-1';
      console.log(err);
      alert('getProfileMsg failed');
    });
  console.log(profileMsg);
  return profileMsg;
};

// 상태메시지 지정 문구 입력 확인
export const checkProfileMsgAPI = async (id: string) => {
  let checkMsg = '';
  await defaultAxios
    .get(`/user/confirm/${id}`)
    .then(res => {
      alert('checkProfileMsgAPI success');
      checkMsg = 'OK';
    })
    .catch(err => {
      console.log(err);
      alert('checkProfileMsgAPI failed');
      checkMsg = 'FAIL';
    });
  return checkMsg;
};

// 로그인
export const loginAPI = (id: string, pw: string) => {
  defaultAxios
    .post('/user/login', { id: id, pw: pw })
    .then(res => {
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      window.location.href = '/';
    })
    .catch(err => {
      console.log(err);
      alert('로그인 실패');
    });
};

// 비밀번호 재설정
export const resetPWAPI = (id: string, pw: string) => {
  defaultAxios
    .put('/user/pw', { id: id, pw: pw })
    .then(res => {
      console.log(res);
      alert('재설정 성공');
    })
    .catch(err => {
      console.log(err);
      alert('재설정 실패');
    });
};

// 토큰 재발급
export const refreshTokenAPI = () => {
  defaultAxios
    .post(
      '/user/auth',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('refresh_token'),
        },
      },
    )
    .then(res => {
      localStorage.setItem('access_token', res.data.access_token);
      alert('재발급 성공');
    })
    .catch(err => {
      alert('재발급 실패');
    });
};
