import axios, { AxiosInstance } from 'axios';

const SERVER_ADDRESS = '/api';

export const authAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('accessToken') || '',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

authAxios.defaults.withCredentials = true;

export const defaultAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
});
