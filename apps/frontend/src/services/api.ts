import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import config from 'config';
import { getAuthToken } from 'helpers/auth';
import { AppDispatch } from 'store';
import { changeLoadingState, setError } from 'state/status';

export type Method =
  | 'get'
  | 'delete'
  | 'head'
  | 'options'
  | 'post'
  | 'put'
  | 'patch';

const api = axios.create({
  baseURL: config.BASE_URL,
  method: 'get',
});

api.interceptors.request.use(config => {
  const token = getAuthToken();
  config.headers['x-access-token'] = token;
  return config;
});

api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const formatedError = error.response ? error.response.data : error;
    throw formatedError;
  }
);

export interface Config extends AxiosRequestConfig {
  url: string;
  dispatch: AppDispatch;
}

export const callAPI = async ({
  url,
  method,
  data,
  dispatch,
}: Config): Promise<AxiosResponse | undefined> => {
  try {
    dispatch(changeLoadingState(true));
    const response = await api(url, {
      data,
      method: method || 'get',
    });
    return response;
  } catch (err) {
    dispatch(setError(err));
  } finally {
    dispatch(changeLoadingState(false));
  }
};
