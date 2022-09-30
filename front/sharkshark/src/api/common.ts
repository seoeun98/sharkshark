import axios, { AxiosInstance } from 'axios';

// const SERVER_ADDRESS = 'http://j7b205.p.ssafy.io/api';
const SERVER_ADDRESS = 'http://127.0.0.1:8000';

export const authAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('access_token') || '',
  },
});

authAxios.defaults.withCredentials = true;

export const defaultAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
});

//=================================

// token에서 유저 정보 파싱하기
export const getUserID = () => {
  const token = localStorage.getItem('access_token');
  if (token === null) return '';

  const decoded = JSON.parse(atob(token.split('.')[1]));
  return decoded.id;
};

// github: repo 이미지 url 가져오기
export const githubRepoImage = async (repo: string, token: string) => {
  let url = '';
  await axios
    .get(`https://api.github.com/repos/${repo}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then(({ data }) => {
      url = data.owner.avatar_url;
    })
    .catch(err => {
      alert('githubRepoImage failed');
    });
  return url;
};

// github: repo 목록 가져오기
export const githubRepoList = async (token: string) => {
  let list: Array<{ name: string; url: string }> = [];
  await axios
    .get('https://api.github.com/user/repos', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then(({ data }) => {
      let repos: Array<{ name: string; url: string }> = [];
      data.map((item: any) => {
        repos.push({ name: item.full_name, url: item.owner.avatar_url });
      });
      list = repos;
    })
    .catch(err => {
      alert('githubRepoList failed');
    });
  return list;
};

// github: 파일 업로드
export const githubUpload = (
  token: string,
  message: string,
  content: string,
  repo: string,
  dir: string,
  filename: string,
) => {
  axios
    .put(
      `https://api.github.com/repos/${repo}/contents/${dir}${filename}`,
      {
        message: message,
        content: content,
      },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
    .then(({ data }) => {
      console.log(data);
      alert('업로드 성공');
    })
    .catch(err => {
      console.log(err);
      alert('githubUpload failed');
    });
};
