import { defaultAxios } from './common';

// 회원가입
export const registerAPI = (id: string, pw: string) => {
  defaultAxios
    .post('/user/regist', { id: id, pw: pw })
    .then(res => {
      window.location.href = '/login';
    })
    .catch(err => {
      alert('이미 가입된 유저입니다. 로그인을 진행해주세요.');
      window.location.href = '/login';
    });
};

// 상태메시지 지정 문구 가져오기
export const getProfileMsgAPI = async (id: string) => {
  let profileMsg = { msg: '', detail: '' };
  await defaultAxios
    .post(`/user/confirm/${id}`)
    .then(res => {
      console.log(res);
      profileMsg.msg = res.data.msg;
      profileMsg.detail = res.data.detail;
    })
    .catch(err => {
      profileMsg.msg = '-1';
      console.log(err);
      // alert('getProfileMsg failed');
    });

  return profileMsg;
};

// 상태메시지 지정 문구 입력 확인
export const checkProfileMsgAPI = async (id: string) => {
  let checkMsg = '';
  await defaultAxios
    .get(`/user/confirm/${id}`)
    .then(res => {
      checkMsg = 'OK';
    })
    .catch(err => {
      console.log(err);
      alert('상태 메세지가 올바르지 않습니다.');
      checkMsg = 'FAIL';
    });
  return checkMsg;
};

// 로그인
export const loginAPI = async (id: string, pw: string) => {
  let loginError = '';
  await defaultAxios
    .post('/user/login', { id: id, pw: pw })
    .then(res => {
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      window.location.href = '/';
      localStorage.setItem('isLogin', 'true');
    })
    .catch(err => {
      let error = err.response.data.detail;
      if (error === '가입된 아이디가 없습니다') {
        loginError = error;
      } else {
        loginError = error;
      }
    });
  return loginError;
};

// 비밀번호 재설정
export const modifyPasswordAPI = (id: string, pw: string) => {
  defaultAxios
    .put('/user/pw', { id: id, pw: pw })
    .then(res => {
      window.location.href = '/login';
    })
    .catch(err => {
      console.log(err);
      alert('비밀번호 설정 실패');
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
