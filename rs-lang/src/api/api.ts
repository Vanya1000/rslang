import axios from 'axios';
import store from '../store/store';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axios.interceptors.request.use(function (config) {
  const token = store.getState().user.user?.token; // maybe we need to change it 
  config.headers!.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export default instance;