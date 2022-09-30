import axios, { AxiosInstance } from 'axios';

// const SERVER_ADDRESS = 'http://j7b205.p.ssafy.io/api';
const SERVER_ADDRESS = 'http://127.0.0.1:8000';

export const authAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    access_token: 'Bearer ' + localStorage.getItem('access_token') || '',
  },
});

authAxios.defaults.withCredentials = true;

export const defaultAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
});

export const getUserID = () => {
  const token = localStorage.getItem('access_token');
  if (token === null) return '';

  const decoded = JSON.parse(atob(token.split('.')[1]));
  return decoded.id;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.setItem('isLogin', 'false');
  window.location.href = '/login';
};
