import axios, { AxiosInstance } from 'axios';

const SERVER_ADDRESS = 'http://j7b205.p.ssafy.io/api';

export const authAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    access_token: localStorage.getItem('accessToken') || '',
  },
});

authAxios.defaults.withCredentials = true;

export const defaultAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
});
